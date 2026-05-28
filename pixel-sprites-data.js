/**
 * 32×32 pixel matrices — top-left light, value ramps, silhouette outline pass in engine.
 */
const PixelSprites = (() => {
  const RED = {
    O: "#4a1814",
    1: "#6a2218",
    2: "#882c20",
    3: "#a83828",
    4: "#c84838",
    5: "#e8604c",
    6: "#f88068",
    7: "#ffb0a0",
    8: "#ffd4c8",
  };

  const SUN_PAL = {
    O: "#6a4208",
    1: "#8a5408",
    2: "#aa6808",
    3: "#ca800c",
    4: "#e89814",
    5: "#f8b020",
    6: "#ffd050",
    7: "#fff0a0",
    8: "#fffde8",
    r: "#d89010",
    R: "#5a3806",
  };

  const BTN = {
    O: "#143414",
    1: "#1a4418",
    2: "#20541c",
    3: "#286422",
    4: "#307428",
    5: "#3a8430",
    6: "#46983a",
    7: "#58b048",
    8: "#72c85c",
    9: "#0c2c0c",
  };

  const { createMatrix, set, get } = PixelArt;

  function fillDiamondTop(m, cx, cy, s) {
    for (let r = 0; r < s; r++) {
      const y = cy - s + 1 + r;
      for (let x = cx - r; x <= cx + r; x++) {
        const rel = x - cx;
        let c = "5";
        if (rel < 0) c = rel <= -Math.ceil(s / 3) ? "7" : "6";
        else if (rel > 0) c = rel >= Math.ceil(s / 3) ? "4" : "5";
        if (r <= 1 && rel <= 0) c = "8";
        if (r === 0 && rel === 0) c = "8";
        set(m, x, y, c);
      }
    }
  }

  function fillLeftFace(m, cx, cy, s, depth) {
    for (let d = 0; d < depth; d++) {
      const y = cy + 1 + d;
      for (let i = 0; i < s - d; i++) {
        const x = cx - s + 1 + i;
        const c = d < depth * 0.45 ? "4" : d < depth * 0.75 ? "3" : "2";
        set(m, x, y, c);
      }
    }
  }

  function fillRightFace(m, cx, cy, s, depth) {
    for (let d = 0; d < depth; d++) {
      const y = cy + 1 + d;
      for (let i = 0; i < s - d; i++) {
        const x = cx + 1 + i;
        const c = d < depth * 0.35 ? "3" : d < depth * 0.7 ? "2" : "1";
        set(m, x, y, c);
      }
    }
  }

  function addRivet(m, x, y, hi = "8", lo = "1") {
    set(m, x, y, hi);
    set(m, x + 1, y, lo);
    set(m, x, y + 1, lo);
    set(m, x + 1, y + 1, "2");
  }

  function buildCube() {
    const m = createMatrix(32, 32);
    const cx = 16;
    const cy = 12;
    const s = 9;
    const d = 8;
    fillDiamondTop(m, cx, cy, s);
    fillLeftFace(m, cx, cy, s, d);
    fillRightFace(m, cx, cy, s, d);
    addRivet(m, cx - 4, cy + 2);
    addRivet(m, cx + 5, cy + 4);
    return m;
  }

  function buildTriangle() {
    const m = createMatrix(32, 32);
    const cx = 16;
    const cy = 11;
    const h = 9;
    for (let r = 0; r < h; r++) {
      const y = cy + r;
      const half = h - 1 - r;
      for (let x = cx - half; x <= cx + half; x++) {
        const rel = x - cx;
        let c = "5";
        if (rel < 0) c = "7";
        if (rel > 0) c = "4";
        if (r < 2 && rel <= 0) c = "8";
        set(m, x, y, c);
      }
    }
    fillLeftFace(m, cx, cy + h - 2, 7, 6);
    fillRightFace(m, cx, cy + h - 2, 7, 6);
    set(m, cx, cy + 1, "8");
    return m;
  }

  function buildPill() {
    const m = createMatrix(32, 32);
    const x0 = 9;
    const x1 = 22;
    const y0 = 10;
    const y1 = 22;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        let c = "5";
        const edgeL = x <= x0 + 1;
        const edgeR = x >= x1 - 1;
        const edgeT = y <= y0 + 1;
        const edgeB = y >= y1 - 1;
        if (edgeT && x < 14) c = "8";
        else if (edgeT && x < 17) c = "7";
        else if (edgeT) c = "6";
        else if (edgeL) c = "4";
        else if (edgeR) c = "2";
        else if (edgeB) c = "1";
        else if (x < 13) c = "6";
        else if (x > 18) c = "3";
        set(m, x, y, c);
      }
    }
    for (let y = y0; y <= y0 + 2; y++) {
      for (let x = x0 + 2; x <= x1 - 2; x++) {
        if (get(m, x, y) !== ".") set(m, x, y, y === y0 ? "8" : "7");
      }
    }
    for (let x = x1 + 1; x <= x1 + 3; x++) {
      for (let y = y0 + 3; y <= y1; y++) {
        const c = y < y0 + 8 ? "3" : "2";
        set(m, x, y, c);
      }
    }
    for (let y = y0 + 4; y < y1; y++) {
      if (y % 3 === 0) {
        set(m, 12, y, "2");
        set(m, 13, y, "1");
      }
    }
    return m;
  }

  function buildArch() {
    const m = createMatrix(32, 32);
    const yBase = 22;
    for (let y = 12; y <= yBase; y++) {
      for (let x = 9; x <= 12; x++) set(m, x, y, y < 15 ? "6" : x === 9 ? "4" : "5");
      for (let x = 19; x <= 22; x++) set(m, x, y, y < 15 ? "6" : x === 22 ? "2" : "3");
      for (let x = 13; x <= 18; x++) set(m, x, y, "1");
    }
    for (let r = 0; r < 6; r++) {
      const y = 12 - r;
      for (let x = 10 + r; x <= 21 - r; x++) {
        let c = "5";
        if (x < 14) c = "7";
        if (x > 18) c = "4";
        if (r < 2 && x < 15) c = "8";
        set(m, x, y, c);
      }
    }
    set(m, 10, 13, "8");
    set(m, 21, 13, "6");
    return m;
  }

  function buildSun() {
    const m = createMatrix(32, 32);
    const cx = 16;
    const cy = 16;
    const rays = [
      [16, 2],
      [16, 28],
      [2, 16],
      [28, 16],
      [6, 6],
      [26, 6],
      [6, 26],
      [26, 26],
      [10, 4],
      [22, 4],
      [10, 27],
      [22, 27],
      [4, 10],
      [27, 10],
      [4, 22],
      [27, 22],
    ];
    for (const [rx, ry] of rays) {
      set(m, rx, ry, "R");
      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        if (get(m, rx + dx, ry + dy) === ".") set(m, rx + dx, ry + dy, "r");
      }
    }
    const rad = 10;
    const radSq = rad * rad;
    const innerSq = (rad - 1) * (rad - 1);
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 > (rad + 1) * (rad + 1)) continue;
        if (d2 > innerSq && d2 <= radSq) {
          set(m, x, y, "O");
          continue;
        }
        if (d2 > innerSq) continue;
        let c = "5";
        if (dx < -3 && dy < -3) c = "8";
        else if (dx < -1 && dy < -1) c = "7";
        else if (dx > 3 && dy > 3) c = "2";
        else if (dx > 1 && dy > 1) c = "3";
        else if (dy < -2) c = "6";
        else if (dy > 2) c = "3";
        else if (dx < 0) c = "6";
        else c = "4";
        set(m, x, y, c);
      }
    }
    set(m, 13, 14, "O");
    set(m, 18, 14, "O");
    set(m, 14, 15, "1");
    set(m, 17, 15, "1");
    return m;
  }

  function buildButton(pressed) {
    const m = createMatrix(32, 32);
    const x0 = 6;
    const x1 = 25;
    const y0 = pressed ? 11 : 8;
    const y1 = pressed ? 22 : 19;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        let c = "5";
        const t = (y - y0) / (y1 - y0);
        const l = (x - x0) / (x1 - x0);
        if (!pressed) {
          if (y === y0 && x < x0 + 10) c = "8";
          else if (y === y0) c = "7";
          else if (x === x0) c = "4";
          else if (x === x1) c = "2";
          else if (y === y1) c = "1";
          else if (l < 0.35 && t < 0.4) c = "7";
          else if (l > 0.65 && t > 0.5) c = "2";
          else c = "5";
        } else {
          if (y === y0) c = "3";
          else if (x === x0) c = "2";
          else if (y === y1 || x === x1) c = "9";
          else c = "4";
        }
        set(m, x, y, c);
      }
    }
    if (!pressed) {
      for (let x = x0 + 3; x <= x1 - 3; x++) set(m, x, y0 + 1, x < 14 ? "8" : "7");
      addRivet(m, 10, y0 + 4, "8", "2");
      addRivet(m, 20, y0 + 4, "8", "2");
    }
    return m;
  }

  return {
    sun: { matrix: buildSun(), palette: SUN_PAL },
    cube: { matrix: buildCube(), palette: RED },
    triangle: { matrix: buildTriangle(), palette: RED },
    pill: { matrix: buildPill(), palette: RED },
    arch: { matrix: buildArch(), palette: RED },
    buttonUp: { matrix: buildButton(false), palette: BTN },
    buttonDown: { matrix: buildButton(true), palette: BTN },
  };
})();

/** Mount helper used by app */
PixelArt.mountSprite = function mountSprite(el, spriteId, scale) {
  const def = PixelSprites[spriteId];
  if (!def || !el) return;
  PixelArt.mount(el, def.matrix, def.palette, scale || PixelArt.DEFAULT_SCALE);
};

PixelArt.renderSprite = function renderSprite(spriteId, scale) {
  const def = PixelSprites[spriteId];
  if (!def) return "";
  return PixelArt.render(def.matrix, def.palette, scale || PixelArt.DEFAULT_SCALE);
};
