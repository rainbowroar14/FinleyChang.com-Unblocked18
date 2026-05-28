/**
 * Section 6 — pixel lawn mower on grass, ultra-stretchy pull cord.
 */
const LawnMower = (() => {
  const SEGMENTS = 19;
  const INNER_COIL_SEGMENTS = 4;
  const PULLS_NEEDED = 5;
  const MOWER_SRC = "sprites/lawn-mower.png";
  const GRAVITY = 340;
  const DAMPING = 0.84;
  const CONSTRAINT_ITERS = 7;
  const CONSTRAINT_ITERS_DRAG = 5;
  const SEGMENT_STIFFNESS = 0.09;
  const STRETCH_MAX = 3.8;
  const STRETCH_SOFT = 0.004;
  const PULL_EXTRA_RATIO = 0.1;
  const STRETCH_ALLOWANCE = 9;
  const HANDLE_RADIUS = 20;
  const SNAP_MS = 400;
  const MAX_POINT_SPEED = 9;

  let canvas = null;
  let ctx = null;
  let wrap = null;
  let statusEl = null;
  let meterFill = null;
  let onComplete = null;
  let onPull = null;
  let onPullShort = null;

  let mowerImg = null;
  let mowerImgReady = false;
  let grassPattern = null;
  let mowerLayout = { x: 0, y: 0, w: 0, h: 0 };

  let points = [];
  let prevPoints = [];
  let coilTargets = [];
  let segLen = 20;
  let coilSegLen = 7;
  let anchor = { x: 0, y: 0 };
  let width = 560;
  let height = 480;
  let animId = null;
  let dragging = false;
  let snapping = false;
  let snapStart = 0;
  let snapFrom = [];
  let pointerId = null;
  let dragPos = { x: 0, y: 0 };
  let pullCount = 0;
  let pullPeak = 0;
  let restCoilLen = 0;
  let maxExtendLen = 0;
  let fullExtendDelta = 0;
  let minPullExtend = 0;
  let completed = false;

  function numPoints() {
    return SEGMENTS + 1;
  }

  function dist(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  function mowerImageUrl() {
    try {
      return new URL(MOWER_SRC, window.location.href).href;
    } catch {
      return MOWER_SRC;
    }
  }

  function loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  function loadMowerImage() {
    if (mowerImgReady && mowerImg) return Promise.resolve();
    return loadImage(mowerImageUrl()).then((img) => {
      mowerImg = img;
      mowerImgReady = Boolean(img);
    });
  }

  function buildProceduralGrassTile(size = 128) {
    const tile = document.createElement("canvas");
    tile.width = size;
    tile.height = size;
    const t = tile.getContext("2d");
    if (!t) return tile;

    t.fillStyle = "#357a35";
    t.fillRect(0, 0, size, size);

    for (let i = 0; i < 55; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const w = 10 + Math.random() * 28;
      const h = 6 + Math.random() * 18;
      t.fillStyle = Math.random() > 0.5 ? "rgba(76, 175, 80, 0.22)" : "rgba(46, 125, 50, 0.28)";
      t.fillRect(x, y, w, h);
    }

    const bladeColors = ["#1b5e20", "#2e7d32", "#43a047", "#66bb6a", "#81c784"];
    for (let n = 0; n < 220; n++) {
      const x = Math.random() * size;
      const baseY = size * (0.55 + Math.random() * 0.45);
      const bladeH = 5 + Math.random() * 14;
      t.strokeStyle = bladeColors[(Math.random() * bladeColors.length) | 0];
      t.globalAlpha = 0.35 + Math.random() * 0.45;
      t.lineWidth = 1;
      t.beginPath();
      t.moveTo(x, baseY);
      t.lineTo(x + (Math.random() - 0.5) * 3, baseY - bladeH);
      t.stroke();
    }
    t.globalAlpha = 1;

    for (let i = 0; i < 90; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      t.fillStyle = Math.random() > 0.5 ? "rgba(129, 199, 132, 0.35)" : "rgba(27, 94, 32, 0.25)";
      t.fillRect(x, y, 1.5, 1.5);
    }

    return tile;
  }

  function ensureGrassPattern() {
    if (!ctx) return Promise.resolve();
    const tile = buildProceduralGrassTile(128);
    grassPattern = ctx.createPattern(tile, "repeat");
    return Promise.resolve();
  }

  function getGrassTop() {
    return height * 0.82;
  }

  function computeMowerLayout() {
    const grassTop = getGrassTop();
    const mowerW = width * 0.52;
    const aspect = mowerImgReady && mowerImg.naturalWidth
      ? mowerImg.naturalHeight / mowerImg.naturalWidth
      : 0.52;
    const mowerH = mowerW * aspect;
    mowerLayout = {
      x: (width - mowerW) * 0.5,
      y: grassTop - mowerH + height * 0.04,
      w: mowerW,
      h: mowerH,
    };
    anchor = {
      x: mowerLayout.x + mowerLayout.w * 0.27,
      y: mowerLayout.y + mowerLayout.h * 0.34,
    };
  }

  function getCoilPosition(i) {
    if (i === 0) return { x: anchor.x, y: anchor.y };
    const step = coilSegLen * 0.88;
    return {
      x: anchor.x - step * i * 0.34,
      y: anchor.y - step * i * 0.94,
    };
  }

  function rebuildCoilTargets() {
    coilTargets = [];
    for (let i = 0; i < numPoints(); i++) {
      coilTargets.push(getCoilPosition(i));
    }
    restCoilLen = dist(coilTargets[0], coilTargets[numPoints() - 1]);
    maxExtendLen = segLen * SEGMENTS;
    fullExtendDelta = maxExtendLen - restCoilLen;
    minPullExtend = fullExtendDelta * (1 + PULL_EXTRA_RATIO);
  }

  function qualifiesPull(peak) {
    return peak >= minPullExtend;
  }

  function syncVelocitiesToRest() {
    const n = numPoints();
    for (let i = 0; i < n; i++) {
      prevPoints[i].x = points[i].x;
      prevPoints[i].y = points[i].y;
    }
  }

  function initRestPose() {
    const n = numPoints();
    points = [];
    prevPoints = [];
    rebuildCoilTargets();
    for (let i = 0; i < n; i++) {
      const c = coilTargets[i];
      points.push({ x: c.x, y: c.y, pinned: i === 0 });
      prevPoints.push({ x: c.x, y: c.y });
    }
    snapping = false;
  }

  function ropeLength() {
    let len = 0;
    for (let i = 0; i < SEGMENTS; i++) {
      len += dist(points[i], points[i + 1]);
    }
    return len;
  }

  function extendBeyondRest() {
    return ropeLength() - restCoilLen;
  }

  function isRopeExtended() {
    return extendBeyondRest() > 10;
  }

  function restLengthForSegment(i) {
    if (i < INNER_COIL_SEGMENTS && !isRopeExtended() && !dragging) {
      return coilSegLen;
    }
    return segLen;
  }

  function satisfyConstraints(iters, coiledMode) {
    const n = numPoints();
    const last = n - 1;

    for (let iter = 0; iter < iters; iter++) {
      for (let i = 0; i < SEGMENTS; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const d = Math.hypot(dx, dy) || 0.001;
        let rest = restLengthForSegment(i);
        let stiff = coiledMode ? 0.22 : SEGMENT_STIFFNESS;

        if (!coiledMode && d > rest) {
          if (d < rest * STRETCH_MAX) {
            stiff *= STRETCH_SOFT;
            rest = d * 0.992;
          } else {
            rest *= STRETCH_MAX;
            stiff *= 0.12;
          }
        }

        const diff = (d - rest) / d;
        const ox = dx * diff * stiff;
        const oy = dy * diff * stiff;

        if (!p1.pinned) {
          p1.x += ox;
          p1.y += oy;
        }
        if (!p2.pinned && !(dragging && i + 1 === last)) {
          p2.x -= ox;
          p2.y -= oy;
        }
      }
    }

    points[0].x = anchor.x;
    points[0].y = anchor.y;
    if (dragging) {
      points[last].x = dragPos.x;
      points[last].y = dragPos.y;
    }
  }

  function clampVelocities() {
    const n = numPoints();
    for (let i = 1; i < n; i++) {
      if (dragging && i === n - 1) continue;
      let vx = points[i].x - prevPoints[i].x;
      let vy = points[i].y - prevPoints[i].y;
      const speed = Math.hypot(vx, vy);
      if (speed > MAX_POINT_SPEED) {
        const s = MAX_POINT_SPEED / speed;
        vx *= s;
        vy *= s;
        prevPoints[i].x = points[i].x - vx;
        prevPoints[i].y = points[i].y - vy;
      }
    }
  }

  function settleCoiled(dt) {
    const n = numPoints();
    const k = Math.min(1, dt * 14);
    for (let i = 1; i < n; i++) {
      const c = coilTargets[i];
      points[i].x += (c.x - points[i].x) * k;
      points[i].y += (c.y - points[i].y) * k;
      prevPoints[i].x = points[i].x;
      prevPoints[i].y = points[i].y;
    }
    satisfyConstraints(2, true);
  }

  function simulate(dt) {
    if (!isRopeExtended()) {
      settleCoiled(dt);
      return;
    }

    const n = numPoints();
    const last = n - 1;
    const sub = Math.max(1, Math.ceil(dt / 0.008));

    for (let s = 0; s < sub; s++) {
      const subDt = dt / sub;
      for (let i = 1; i < n; i++) {
        if (i === last && dragging) continue;

        const vx = (points[i].x - prevPoints[i].x) * DAMPING;
        const vy = (points[i].y - prevPoints[i].y) * DAMPING;
        prevPoints[i].x = points[i].x;
        prevPoints[i].y = points[i].y;
        points[i].x += vx;
        points[i].y += vy + GRAVITY * subDt * subDt;
      }
      satisfyConstraints(CONSTRAINT_ITERS, false);
      clampVelocities();
    }
  }

  function stepWhileDragging(dt) {
    const n = numPoints();
    const last = n - 1;
    points[last].x = dragPos.x;
    points[last].y = dragPos.y;

    for (let i = 1; i < last; i++) {
      const vx = (points[i].x - prevPoints[i].x) * DAMPING;
      const vy = (points[i].y - prevPoints[i].y) * DAMPING;
      prevPoints[i].x = points[i].x;
      prevPoints[i].y = points[i].y;
      points[i].x += vx;
      points[i].y += vy + GRAVITY * dt * dt * 0.3;
    }

    satisfyConstraints(CONSTRAINT_ITERS_DRAG, false);
    clampVelocities();
  }

  function startSnapBack() {
    snapFrom = points.map((p) => ({ x: p.x, y: p.y }));
    snapStart = performance.now();
    snapping = true;
    dragging = false;
    syncVelocitiesToRest();
  }

  function updateSnapBack() {
    if (!snapping) return;
    const t = Math.min(1, (performance.now() - snapStart) / SNAP_MS);
    const ease = 1 - (1 - t) ** 3;
    const n = numPoints();

    for (let i = 1; i < n; i++) {
      const c = coilTargets[i];
      const s = snapFrom[i] || c;
      points[i].x = s.x + (c.x - s.x) * ease;
      points[i].y = s.y + (c.y - s.y) * ease;
      prevPoints[i].x = points[i].x;
      prevPoints[i].y = points[i].y;
    }
    satisfyConstraints(2, true);

    if (t >= 1) {
      snapping = false;
      initRestPose();
    }
  }

  function clientToCanvas(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  function hitHandle(x, y) {
    const h = points[numPoints() - 1];
    if (dist({ x, y }, h) <= HANDLE_RADIUS + 12) return true;
    return dist({ x, y }, anchor) <= HANDLE_RADIUS + 28;
  }

  function clampHandle(x, y) {
    const dx = x - anchor.x;
    const dy = y - anchor.y;
    const d = Math.hypot(dx, dy);
    const maxReach = maxExtendLen * (1 + STRETCH_ALLOWANCE);
    if (d > maxReach) {
      const s = maxReach / d;
      return { x: anchor.x + dx * s, y: anchor.y + dy * s };
    }
    return { x, y };
  }

  function registerPullStroke() {
    if (completed) return;
    pullCount += 1;
    wrap?.classList.add("is-running");
    window.setTimeout(() => wrap?.classList.remove("is-running"), 380);
    if (onPull) onPull(pullCount, PULLS_NEEDED);
    updateStatus();
    if (pullCount >= PULLS_NEEDED) {
      completed = true;
      if (onComplete) onComplete();
    }
  }

  function snapBack() {
    const extend = pullPeak;
    pullPeak = 0;
    pointerId = null;
    canvas?.classList.remove("is-grabbing");
    if (qualifiesPull(extend)) {
      registerPullStroke();
    } else if (extend > fullExtendDelta * 0.45 && onPullShort) {
      onPullShort();
    }
    startSnapBack();
  }

  function onPointerDown(e) {
    if (completed || snapping) return;
    const p = clientToCanvas(e.clientX, e.clientY);
    if (!hitHandle(p.x, p.y)) return;
    dragging = true;
    snapping = false;
    pointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add("is-grabbing");
    pullPeak = 0;
    syncVelocitiesToRest();
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging || e.pointerId !== pointerId) return;
    const p = clientToCanvas(e.clientX, e.clientY);
    const c = clampHandle(p.x, p.y);
    dragPos.x = c.x;
    dragPos.y = c.y;
    pullPeak = Math.max(pullPeak, extendBeyondRest());
    e.preventDefault();
  }

  function onPointerUp(e) {
    if (!dragging || e.pointerId !== pointerId) return;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    snapBack();
    e.preventDefault();
  }

  function drawGrassBladeLayer(grassTop) {
    const stripH = height - grassTop;
    const count = Math.floor((width * stripH) / 2200);
    ctx.lineCap = "round";
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = grassTop + Math.random() * stripH;
      const h = 4 + Math.random() * 12;
      const hue = Math.random();
      ctx.strokeStyle =
        hue > 0.66 ? "#66bb6a" : hue > 0.33 ? "#388e3c" : "#1b5e20";
      ctx.globalAlpha = 0.2 + Math.random() * 0.35;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 2, y - h);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawSkyAndGrass() {
    const grassTop = getGrassTop();

    const sky = ctx.createLinearGradient(0, 0, 0, grassTop);
    sky.addColorStop(0, "#6eb5d8");
    sky.addColorStop(1, "#b4dce8");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, grassTop);

    const baseGrass = ctx.createLinearGradient(0, grassTop, 0, height);
    baseGrass.addColorStop(0, "#3d8b3d");
    baseGrass.addColorStop(0.5, "#429a42");
    baseGrass.addColorStop(1, "#2e6b2e");
    ctx.fillStyle = baseGrass;
    ctx.fillRect(0, grassTop, width, height - grassTop);

    if (grassPattern) {
      ctx.fillStyle = grassPattern;
      ctx.fillRect(0, grassTop, width, height - grassTop);
    }

    drawGrassBladeLayer(grassTop);
  }

  function drawMowerFallback() {
    const { x, y, w, h } = mowerLayout;
    if (w < 8 || h < 8) return;

    ctx.fillStyle = "#c62828";
    ctx.fillRect(x + w * 0.12, y + h * 0.42, w * 0.76, h * 0.38);
    ctx.fillStyle = "#212121";
    ctx.fillRect(x + w * 0.2, y + h * 0.48, w * 0.5, h * 0.18);
    ctx.beginPath();
    ctx.arc(x + w * 0.22, y + h * 0.82, h * 0.14, 0, Math.PI * 2);
    ctx.arc(x + w * 0.72, y + h * 0.82, h * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#9e9e9e";
    ctx.lineWidth = Math.max(3, w * 0.02);
    ctx.beginPath();
    ctx.moveTo(x + w * 0.55, y + h * 0.42);
    ctx.lineTo(x + w * 0.78, y + h * 0.05);
    ctx.stroke();
  }

  function drawMowerSprite() {
    if (mowerLayout.w < 8 || mowerLayout.h < 8) return;
    if (mowerImgReady && mowerImg) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(mowerImg, mowerLayout.x, mowerLayout.y, mowerLayout.w, mowerLayout.h);
      ctx.imageSmoothingEnabled = true;
      return;
    }
    drawMowerFallback();
  }

  function drawCordAnchor() {
    ctx.fillStyle = "#212121";
    ctx.beginPath();
    ctx.arc(anchor.x, anchor.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRope() {
    if (points.length < numPoints()) return;

    const n = numPoints();
    const extended = isRopeExtended();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = extended ? "#424242" : "#616161";
    ctx.lineWidth = extended ? 3.5 : 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < n - 2; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    const last = n - 1;
    ctx.quadraticCurveTo(points[last - 1].x, points[last - 1].y, points[last].x, points[last].y);
    ctx.stroke();

    ctx.strokeStyle = extended ? "#9e9e9e" : "#bdbdbd";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    for (let i = 1; i < n - 1; i++) {
      const t = i / (n - 1);
      ctx.fillStyle = `rgba(66, 66, 66, ${0.15 + t * 0.25})`;
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, extended ? 2.5 : 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const h = points[last];
    drawPullHandle(h.x, h.y, extended);
  }

  function drawPullHandle(x, y, extended) {
    const arm = HANDLE_RADIUS * 0.55;
    ctx.strokeStyle = "#1a1a1a";
    ctx.fillStyle = "#212121";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x - arm, y);
    ctx.lineTo(x + arm, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y - arm * 0.65);
    ctx.lineTo(x, y + arm * 0.35);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y + arm * 0.35, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (!extended) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "bold 10px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PULL", x, y - arm - 6);
    }
  }

  function frame(now) {
    if (!canvas || !ctx) return;
    if (!frame.last) frame.last = now;
    const dt = Math.min(0.028, (now - frame.last) / 1000);
    frame.last = now;

    if (points.length < numPoints()) {
      resize();
    }

    if (snapping) updateSnapBack();
    else if (dragging) stepWhileDragging(dt);
    else simulate(dt);

    ctx.clearRect(0, 0, width, height);
    drawSkyAndGrass();
    drawMowerSprite();
    drawCordAnchor();
    drawRope();
    animId = requestAnimationFrame(frame);
  }

  function updateStatus() {
    if (!statusEl) return;
    if (completed) {
      statusEl.textContent = "Engine started! Lawn mower is running.";
      statusEl.classList.add("is-done");
    } else {
      statusEl.textContent = `Pull the cord out — ${pullCount} / ${PULLS_NEEDED}`;
      statusEl.classList.remove("is-done");
    }
    if (meterFill) {
      meterFill.style.width = `${Math.min(100, (pullCount / PULLS_NEEDED) * 100)}%`;
    }
  }

  function resize() {
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    width = Math.max(320, Math.floor(rect.width || window.innerWidth));
    height = Math.max(320, Math.floor(rect.height || window.innerHeight));
    canvas.width = width;
    canvas.height = height;
    computeMowerLayout();
    segLen = (height * 0.62) / SEGMENTS;
    coilSegLen = segLen * 0.34;
    if (points.length === numPoints()) {
      rebuildCoilTargets();
      if (!dragging && !snapping) initRestPose();
    } else {
      initRestPose();
    }
  }

  function start({
    canvasEl,
    wrapEl,
    statusElement,
    meterElement,
    onPullCb,
    onPullShortCb,
    onCompleteCb,
  }) {
    stop();
    canvas = canvasEl;
    wrap = wrapEl;
    statusEl = statusElement;
    meterFill = meterElement;
    onPull = onPullCb;
    onPullShort = onPullShortCb;
    onComplete = onCompleteCb;
    completed = false;
    pullCount = 0;
    pullPeak = 0;
    dragging = false;
    snapping = false;
    ctx = canvas.getContext("2d");
    resize();
    updateStatus();

    Promise.all([loadMowerImage(), ensureGrassPattern()]).then(() => {
      resize();
      updateStatus();
    });

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize", resize);
    frame.last = 0;
    animId = requestAnimationFrame(frame);
  }

  function stop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    if (canvas) {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.classList.remove("is-grabbing");
    }
    window.removeEventListener("resize", resize);
    canvas = null;
    ctx = null;
    wrap = null;
  }

  function reset() {
    completed = false;
    pullCount = 0;
    pullPeak = 0;
    dragging = false;
    snapping = false;
    resize();
    updateStatus();
  }

  return { start, stop, reset, resize, PULLS_NEEDED };
})();
