/**
 * Game audio — Mixkit MP3 samples (sounds/) + procedural SFX where noted.
 */
const GameAudio = (() => {
  let ctx = null;
  let master = null;
  let spinNodes = null;
  let unlocked = false;
  let muted = false;
  const buffers = new Map();
  let loadPromise = null;
  const MANIFEST = {
    click: { file: "sounds/click.mp3", volume: 0.55 },
    clickHeavy: { file: "sounds/clickHeavy.mp3", volume: 0.7 },
    checkbox: { file: "sounds/checkbox.mp3", volume: 0.5 },
    type: { file: "sounds/click.mp3", volume: 0.2, rate: 1.65 },
    backspace: { file: "sounds/click.mp3", volume: 0.24, rate: 0.75 },
    shapeRotate: { file: "sounds/shapeRotate.mp3", volume: 0.35, rate: 1.4 },
    wireConnect: { file: "sounds/wireConnect.mp3", volume: 0.55 },
    wireFail: { file: "sounds/wireFail.mp3", volume: 0.5 },
    generatorBreak: { file: "sounds/generatorBreak.mp3", volume: 0.6 },
    generatorRepair: { file: "sounds/generatorRepair.mp3", volume: 0.55 },
    verifySuccess: { file: "sounds/success.mp3", volume: 0.55 },
    verifyFail: { file: "sounds/fail.mp3", volume: 0.5 },
    levelComplete: { file: "sounds/level.mp3", volume: 0.5 },
    powerBlip: { file: "sounds/powerBlip.mp3", volume: 0.35 },
    swoosh: { file: "sounds/swoosh.mp3", volume: 0.5 },
    win: { file: "sounds/win.mp3", volume: 0.6 },
    spinGrab: { file: "sounds/spinGrab.mp3", volume: 0.5 },
  };

  function ensureContext() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.58;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function unlock() {
    if (unlocked) return;
    const c = ensureContext();
    if (!c) return;
    unlocked = true;
    if (!loadPromise) loadPromise = loadAllSounds();
    const o = c.createOscillator();
    const g = c.createGain();
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(master);
    o.start();
    o.stop(c.currentTime + 0.01);
  }

  async function loadAllSounds() {
    const c = ensureContext();
    if (!c) return;
    const entries = Object.entries(MANIFEST);
    await Promise.all(
      entries.map(async ([name, cfg]) => {
        try {
          const res = await fetch(cfg.file);
          if (!res.ok) return;
          const ab = await res.arrayBuffer();
          const buf = await c.decodeAudioData(ab);
          buffers.set(name, { buffer: buf, ...cfg });
        } catch {
          /* offline / missing file */
        }
      })
    );
  }

  function playBuffer(name, volumeScale = 1) {
    const c = ensureContext();
    const entry = buffers.get(name);
    if (!c || !entry || muted) return false;

    const src = c.createBufferSource();
    src.buffer = entry.buffer;
    if (entry.rate) src.playbackRate.value = entry.rate;

    const g = c.createGain();
    g.gain.value = (entry.volume ?? 0.5) * volumeScale;
    src.connect(g);
    g.connect(master);
    src.start();
    return true;
  }

  function makeNoiseBuffer(durationSec, taper = true) {
    const c = ensureContext();
    const len = Math.ceil(c.sampleRate * durationSec);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const env = taper ? 1 - i / len : 1;
      data[i] = (Math.random() * 2 - 1) * env;
    }
    return buf;
  }

  /** Hand pump: press stroke, air hiss, metal clunk. */
  function playAirPump(volumeScale = 1) {
    const c = ensureContext();
    if (!c || muted) return;
    const t = c.currentTime;
    const out = c.createGain();
    out.gain.value = Math.min(2.5, 0.9 * volumeScale);
    out.connect(master);

    const body = c.createOscillator();
    body.type = "triangle";
    body.frequency.setValueAtTime(155, t);
    body.frequency.exponentialRampToValueAtTime(48, t + 0.1);
    const bodyGain = c.createGain();
    bodyGain.gain.setValueAtTime(0.001, t);
    bodyGain.gain.linearRampToValueAtTime(0.38, t + 0.015);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    body.connect(bodyGain);
    bodyGain.connect(out);

    const hiss = c.createBufferSource();
    hiss.buffer = makeNoiseBuffer(0.17);
    const hissFilter = c.createBiquadFilter();
    hissFilter.type = "bandpass";
    hissFilter.frequency.setValueAtTime(2200, t);
    hissFilter.frequency.exponentialRampToValueAtTime(650, t + 0.14);
    hissFilter.Q.value = 0.7;
    const hissGain = c.createGain();
    hissGain.gain.setValueAtTime(0.001, t);
    hissGain.gain.linearRampToValueAtTime(0.5, t + 0.018);
    hissGain.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
    hiss.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(out);

    const clunk = c.createOscillator();
    clunk.type = "square";
    clunk.frequency.setValueAtTime(88, t);
    clunk.frequency.exponentialRampToValueAtTime(36, t + 0.055);
    const clunkGain = c.createGain();
    clunkGain.gain.setValueAtTime(0.14, t);
    clunkGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    clunk.connect(clunkGain);
    clunkGain.connect(out);

    body.start(t);
    body.stop(t + 0.15);
    hiss.start(t);
    hiss.stop(t + 0.19);
    clunk.start(t);
    clunk.stop(t + 0.09);
  }

  /** Starter cord yank: whip + sputtering two-stroke cough. */
  function playLawnMowerPull(volumeScale = 1) {
    const c = ensureContext();
    if (!c || muted) return;
    const t = c.currentTime;
    const out = c.createGain();
    out.gain.value = Math.min(2.8, 0.62 * volumeScale);
    out.connect(master);

    const zip = c.createBufferSource();
    zip.buffer = makeNoiseBuffer(0.11, false);
    const zipFilter = c.createBiquadFilter();
    zipFilter.type = "bandpass";
    zipFilter.frequency.setValueAtTime(3200, t);
    zipFilter.frequency.exponentialRampToValueAtTime(420, t + 0.09);
    zipFilter.Q.value = 1.1;
    const zipGain = c.createGain();
    zipGain.gain.setValueAtTime(0.001, t);
    zipGain.gain.linearRampToValueAtTime(0.55, t + 0.008);
    zipGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    zip.connect(zipFilter);
    zipFilter.connect(zipGain);
    zipGain.connect(out);

    const motor = c.createOscillator();
    motor.type = "sawtooth";
    motor.frequency.setValueAtTime(118, t + 0.025);
    motor.frequency.exponentialRampToValueAtTime(62, t + 0.14);
    const motorGain = c.createGain();
    motorGain.gain.setValueAtTime(0.001, t + 0.02);
    motorGain.gain.linearRampToValueAtTime(0.32, t + 0.04);
    motorGain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    motor.connect(motorGain);
    motorGain.connect(out);

    const sputter = c.createOscillator();
    sputter.type = "square";
    sputter.frequency.setValueAtTime(200, t + 0.05);
    sputter.frequency.setValueAtTime(145, t + 0.08);
    sputter.frequency.exponentialRampToValueAtTime(70, t + 0.2);
    const sputGain = c.createGain();
    sputGain.gain.setValueAtTime(0.001, t + 0.045);
    sputGain.gain.linearRampToValueAtTime(0.18, t + 0.06);
    sputGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    sputter.connect(sputGain);
    sputGain.connect(out);

    const ring = c.createOscillator();
    ring.type = "sine";
    ring.frequency.setValueAtTime(920, t + 0.03);
    ring.frequency.exponentialRampToValueAtTime(280, t + 0.12);
    const ringGain = c.createGain();
    ringGain.gain.setValueAtTime(0.08, t + 0.03);
    ringGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    ring.connect(ringGain);
    ringGain.connect(out);

    zip.start(t);
    zip.stop(t + 0.12);
    motor.start(t + 0.02);
    motor.stop(t + 0.18);
    sputter.start(t + 0.04);
    sputter.stop(t + 0.24);
    ring.start(t + 0.03);
    ring.stop(t + 0.16);
  }

  function playTone(freq, duration, type = "square", volume = 0.2, attack = 0.005, decay = 0.08) {
    const c = ensureContext();
    if (!c || muted) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(volume, t + attack);
    g.gain.exponentialRampToValueAtTime(0.001, t + attack + decay);
    osc.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + attack + decay + 0.02);
  }

  function play(name, volumeScale = 1) {
    unlock();

    const run = () => {
      if (name === "pump") {
        playAirPump(volumeScale);
        return;
      }
      if (name === "lawnMowerFart") {
        playLawnMowerPull(volumeScale);
        return;
      }
      if (playBuffer(name, volumeScale)) return;

      const fallbacks = {
      click: () => playTone(880, 0.04, "square", 0.12, 0.001, 0.035),
      clickHeavy: () => {
        playTone(220, 0.06, "square", 0.22, 0.002, 0.05);
        playTone(110, 0.08, "sine", 0.15, 0.002, 0.06);
      },
      checkbox: () => {
        playTone(520, 0.05, "sine", 0.1, 0.002, 0.04);
        window.setTimeout(() => playTone(780, 0.06, "sine", 0.12, 0.002, 0.05), 60);
      },
      type: () => playTone(620, 0.025, "square", 0.08, 0.001, 0.02),
      backspace: () => playTone(280, 0.03, "square", 0.1, 0.001, 0.025),
      pump: () => playAirPump(volumeScale),
      lawnMowerFart: () => playLawnMowerPull(volumeScale),
      shapeRotate: () => playTone(340, 0.04, "triangle", 0.1, 0.001, 0.03),
      wireConnect: () => {
        playTone(660, 0.05, "sine", 0.14, 0.002, 0.04);
        playTone(990, 0.07, "sine", 0.1, 0.01, 0.05);
      },
      wireFail: () => playTone(180, 0.1, "sawtooth", 0.12, 0.002, 0.08),
      generatorBreak: () => {
        playTone(120, 0.2, "sawtooth", 0.2, 0.01, 0.15);
        playTone(80, 0.25, "square", 0.15, 0.02, 0.2);
      },
      generatorRepair: () => {
        playTone(200, 0.08, "sine", 0.15, 0.01, 0.06);
        playTone(400, 0.1, "sine", 0.18, 0.02, 0.08);
      },
      verifySuccess: () => {
        playTone(523, 0.08, "sine", 0.15, 0.01, 0.06);
        window.setTimeout(() => playTone(659, 0.08, "sine", 0.15, 0.01, 0.06), 70);
      },
      verifyFail: () => playTone(200, 0.12, "square", 0.14, 0.005, 0.1),
      levelComplete: () => {
        playTone(440, 0.06, "sine", 0.12, 0.005, 0.05);
        playTone(554, 0.08, "sine", 0.14, 0.01, 0.06);
      },
      powerBlip: () => playTone(1200, 0.03, "sine", 0.06, 0.001, 0.025),
      swoosh: () => playTone(400, 0.2, "sine", 0.1, 0.02, 0.15),
      win: () => {
        [523, 659, 784, 1047].forEach((f, i) => {
          window.setTimeout(() => playTone(f, 0.15, "sine", 0.16, 0.01, 0.12), i * 90);
        });
      },
      spinGrab: () => playTone(180, 0.05, "triangle", 0.14, 0.002, 0.04),
    };

      const fb = fallbacks[name];
      if (fb) fb();
    };

    if (buffers.has(name)) run();
    else if (loadPromise) loadPromise.then(run);
    else run();
  }

  function startSpin() {
    const c = ensureContext();
    if (!c || muted || spinNodes) return;
    const t = c.currentTime;

    const noiseLen = Math.ceil(c.sampleRate * 2);
    const buf = c.createBuffer(1, noiseLen, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) data[i] = Math.random() * 2 - 1;

    const noise = c.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;

    const noiseFilter = c.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 280;
    noiseFilter.Q.value = 1.2;

    const noiseGain = c.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.08, t + 0.05);

    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(42, t);

    const oscGain = c.createGain();
    oscGain.gain.setValueAtTime(0.001, t);
    oscGain.gain.linearRampToValueAtTime(0.06, t + 0.05);

    const spinGain = c.createGain();
    spinGain.gain.value = 1;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(spinGain);
    osc.connect(oscGain);
    oscGain.connect(spinGain);
    spinGain.connect(master);

    noise.start(t);
    osc.start(t);
    spinNodes = { noise, osc, noiseGain, oscGain, spinGain, noiseFilter };
  }

  function stopSpin() {
    if (!spinNodes || !ctx) return;
    const t = ctx.currentTime;
    const { noise, osc, noiseGain, oscGain } = spinNodes;
    noiseGain.gain.cancelScheduledValues(t);
    noiseGain.gain.setValueAtTime(noiseGain.gain.value, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    oscGain.gain.cancelScheduledValues(t);
    oscGain.gain.setValueAtTime(oscGain.gain.value, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    window.setTimeout(() => {
      try {
        noise.stop();
        osc.stop();
      } catch {
        /* already stopped */
      }
      spinNodes = null;
    }, 150);
  }

  function updateSpin(mph) {
    if (!spinNodes || !ctx || muted) return;
    const t = ctx.currentTime;
    const norm = Math.min(1, mph / 100);
    spinNodes.osc.frequency.setTargetAtTime(35 + norm * 85, t, 0.08);
    spinNodes.noiseFilter.frequency.setTargetAtTime(200 + norm * 500, t, 0.08);
    spinNodes.noiseGain.gain.setTargetAtTime(0.03 + norm * 0.14, t, 0.08);
    spinNodes.oscGain.gain.setTargetAtTime((0.03 + norm * 0.14) * 0.7, t, 0.08);
  }

  function bindUnlock() {
    const once = () => {
      unlock();
      document.removeEventListener("pointerdown", once);
      document.removeEventListener("keydown", once);
    };
    document.addEventListener("pointerdown", once, { passive: true });
    document.addEventListener("keydown", once, { passive: true });
  }

  bindUnlock();

  return {
    play,
    unlock,
    startSpin,
    stopSpin,
    updateSpin,
    setMuted(v) {
      muted = v;
      if (muted) stopSpin();
    },
  };
})();
