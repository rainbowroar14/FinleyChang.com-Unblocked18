const appRoot = document.querySelector(".app");
const widget = document.getElementById("recaptcha-widget");
const checkbox = document.getElementById("recaptcha-checkbox");
const gate = document.getElementById("gate");
const gateTitle = document.getElementById("gate-title");
const gateSub = document.getElementById("gate-sub");
const section1 = document.getElementById("section-1");
const section2 = document.getElementById("section-2");
const section3 = document.getElementById("section-3");
const section4 = document.getElementById("section-4");
const section5 = document.getElementById("section-5");
const section6 = document.getElementById("section-6");
const startPanel = document.getElementById("start-panel");
const startGameBtn = document.getElementById("start-game-btn");
const lawnCanvas = document.getElementById("lawn-canvas");
const lawnSceneWrap = document.getElementById("lawn-scene-wrap");
const lawnStatus = document.getElementById("lawn-status");
const lawnPullMeterFill = document.getElementById("lawn-pull-meter-fill");
const gfThread = document.getElementById("gf-thread");
const gfPrompt = document.getElementById("gf-prompt");
const gfSentenceWrap = document.getElementById("gf-sentence-wrap");
const gfSentence = document.getElementById("gf-sentence");
const gfWordBank = document.getElementById("gf-word-bank");
const gfClearBtn = document.getElementById("gf-clear");
const gfSendBtn = document.getElementById("gf-send");
const gfJetScene = document.getElementById("gf-jet-scene");
const trolleyScene = document.getElementById("trolley-scene");
const trolleyTrain = document.getElementById("trolley-train");
const trolleyPerson = document.getElementById("trolley-person");
const trolleyRobot = document.getElementById("trolley-robot");
const trolleyLeverArm = document.getElementById("trolley-lever-arm");
const trolleyLeverAssembly = document.getElementById("trolley-lever-assembly");
const trolleySwitch = document.getElementById("trolley-switch");
const trolleyStatus = document.getElementById("trolley-status");
const trolleySprite = document.getElementById("trolley-sprite");
const s5Widget = document.getElementById("s5-recaptcha-widget");
const s5Checkbox = document.getElementById("s5-recaptcha-checkbox");
const s5Label = document.getElementById("s5-recaptcha-label");
const s5Progress = document.getElementById("s5-progress");
const captchaChallengeNext = document.getElementById("captcha-challenge-next");
const sectionBriefing = document.getElementById("section-briefing");
const sectionBriefingReason = document.getElementById("section-briefing-reason");
const sectionBriefingName = document.getElementById("section-briefing-name");
const sectionBriefingDesc = document.getElementById("section-briefing-desc");
const sectionBriefingNext = document.getElementById("section-briefing-next");
const loseScreen = document.getElementById("lose-screen");
const loseTitle = document.getElementById("lose-title");
const loseMessage = document.getElementById("lose-message");
const loseRetryBtn = document.getElementById("lose-retry");
const levelPicker = document.getElementById("level-picker");
const levelPickerBackdrop = document.getElementById("level-picker-backdrop");
const levelPickerButtons = levelPicker?.querySelectorAll(".level-picker-btn[data-level]");
const chatThread = document.getElementById("chat-thread");
const chatReplies = document.getElementById("chat-replies");
const chatPrompt = document.getElementById("chat-prompt");
const level3 = document.getElementById("level-3");
const level4 = document.getElementById("level-4");
const level5 = document.getElementById("level-5");
const level6 = document.getElementById("level-6");
const powerBtn = document.getElementById("power-btn");
const pumpBtn = document.getElementById("pump-btn");
const progressFill = document.getElementById("progress-fill");
const progressPercent = document.getElementById("progress-percent");
const progressTrack = document.getElementById("progress-track");
const spinnerWheel = document.getElementById("spinner-wheel");
const spinnerGrab = document.getElementById("spinner-grab");
const spinnerWheelFace = document.getElementById("spinner-wheel-face");
const spinnerStage = document.getElementById("spinner-stage");
const spinnerZoneRing = document.getElementById("spinner-zone-ring");
const spinnerStatus = document.getElementById("spinner-status");
const mphValue = document.getElementById("mph-value");
const mphReadout = document.getElementById("mph-readout");
const spinnerProgressFill = document.getElementById("spinner-progress-fill");
const spinnerProgressPercent = document.getElementById("spinner-progress-percent");
const spinnerProgressTrack = document.getElementById("spinner-progress-track");
const winScreen = document.getElementById("win-screen");
const winLevel = document.getElementById("win-level");
const winTitle = document.getElementById("win-title");
const winTagline = document.getElementById("win-tagline");
const winMessage = document.getElementById("win-message");
const playAgainBtn = document.getElementById("play-again");
const pipeCaptcha2 = document.getElementById("pipe-captcha-2");
const pipeLevel34 = document.getElementById("pipe-level3-4");
const pipeLevel45 = document.getElementById("pipe-level4-5");
const pipeLevel56 = document.getElementById("pipe-level5-6");
const generatorBox = document.getElementById("generator-box");
const generatorVisual = document.getElementById("generator-visual");
const generatorStatus = document.getElementById("generator-status");
const generatorUptime = document.getElementById("generator-uptime");
const wireTask = document.getElementById("wire-task");
const wireBoardWrap = document.getElementById("wire-board-wrap");
const wireLinesSvg = document.getElementById("wire-lines-svg");
const wireBoard = document.getElementById("wire-board");
const wireProgress = document.getElementById("wire-progress");
const flowNodeCaptcha = document.getElementById("flow-node-captcha");
const systemPowerFill = document.getElementById("system-power-fill");
const systemPowerPercent = document.getElementById("system-power-percent");
const systemPowerTrack = document.getElementById("system-power-track");
const systemPowerRate = document.getElementById("system-power-rate");
const systemPowerPanel = document.getElementById("system-power-panel");
const PIPE_CHARGE_DELAY_MS = 650;
const POWER_PER_LEVEL_PER_SEC = 0.2;
const BREAK_CHANCE_PER_SEC = 0.01;
const GENERATOR_POWER_PER_SEC = 0.2;
const POWER_DRAIN_BROKEN_PER_SEC = 0.25;
const CLICK_POWER_PER_CLICK = 0.1;
const SWOOSH_MS = 800;
const SLIDE_MS = 450;
const S5_ROUNDS_NEEDED = 10;
const S5_NEXT_NEAR_PX = 110;
const S5_TYPE_MS = 42;
const S5_BACKSPACE_MS = 28;
const WIRE_COLORS = ["red", "blue", "yellow", "pink"];
const WIRE_STROKE = {
  red: "#ff3030",
  blue: "#3d5afe",
  yellow: "#ffd600",
  pink: "#ff60d4",
};

const PLEASE_ANSWER_TEXT = "Please answer the question.";

const MOM_QUESTIONS = [
  {
    prompt: "Hey can you take out the dog?",
    replies: {
      no: { label: "No", momResponse: "Don't talk back to me. Take. Out. The. Dog.", pass: false },
      yes: { label: "Yes", momResponse: "Thank you sweetie. Shoes on.", pass: true },
      ruff: { label: "Ruff Ruff", momResponse: "You're not the dog. Stop barking and go outside.", pass: false },
      war: {
        label: "*War thunder battle royal",
        momResponse: "Battle royale can wait. The real dog cannot.",
        pass: false,
      },
    },
  },
  {
    prompt: "Are you SURE you went outside? I can hear the PS5 fan.",
    replies: {
      chair: {
        label: "I never left my chair",
        momResponse: "I can smell the Hot Pockets from here.",
        pass: false,
      },
      yes: { label: "Yes Mom", momResponse: "Fine. But I want a photo with timestamp.", pass: true },
      mint: {
        label: "I'm minting the dog as an NFT",
        momResponse: "You are NOT turning your brother into crypto.",
        pass: false,
      },
      dad: { label: "Dad said I don't have to", momResponse: "Dad is sleeping. You know this.", pass: false },
    },
  },
  {
    prompt: "The dog is wearing your hoodie and says he's the eldest child now.",
    replies: {
      ok: { label: "That's fair", momResponse: "It is NOT fair. Get your hoodie back.", pass: false },
      yes: {
        label: "I'm handling it",
        momResponse: "Handle it faster before he renames the WiFi.",
        pass: true,
      },
      join: {
        label: "I accept him as alpha",
        momResponse: "You are not joining a dog's podcast.",
        pass: false,
      },
      lawyer: {
        label: "I called a lawyer",
        momResponse: "You called WHO. Put the phone down.",
        pass: false,
      },
    },
  },
  {
    prompt: "Grandma says the dog filed taxes as head of household. Using YOUR social security number.",
    replies: {
      cool: { label: "That's kind of impressive", momResponse: "It is a FEDERAL CRIME.", pass: false },
      yes: {
        label: "I'll talk to the dog",
        momResponse: "Talk fast. The IRS does not accept barks.",
        pass: true,
      },
      blame: {
        label: "Grandma started this",
        momResponse: "Do not bring Grandma into your dog cult.",
        pass: false,
      },
      run: {
        label: "I'm moving to Canada",
        momResponse: "You are not fleeing to Canada with a tax dog.",
        pass: false,
      },
    },
  },
];

const WIN_COPY = {
  final: {
    level: "Complete",
    title: "You Win!",
    tagline: "The Grid Awakens",
    message: "Full power. ARIA stood down. Lawn mower running. You are not a robot.",
    documentTitle: "Not A Robot — You Win!",
  },
};

const CHECK_MIN_MS = 1400;
const CHECK_MAX_MS = 2800;
const STG_SLIDE_MS = 480;
const STG_BRIEFING_DOCK_MS = 520;
const PUMP_PER_CLICK = 4;

const SECTION_BRIEFINGS = {
  section1: {
    reason:
      "Our systems flagged unusual network traffic. Complete power verification manually.",
    name: "Section 1 — Power",
    description:
      "Pump the load, hold the wheel at speed, keep the generator alive, and spam POWER until the grid hits 100%.",
  },
  section2: {
    reason:
      "Humans reply to family texts differently than bots. Confirm your messaging behavior.",
    name: "Section 2 — Mom",
    description:
      "Answer Mom's messages the way a real person would — polite, defiant, or chaotic.",
  },
  section3: {
    reason:
      "Checkbox trust score expired. Re-verify with repeated checks and reading comprehension.",
    name: "Section 3 — I'm Really Not a Robot",
    description:
      "Check the box ten times. Read every label — traps will reset you if you slip.",
  },
  section4: {
    reason: "Moral reasoning module required for advanced verification tier.",
    name: "Section 4 — The Trolley",
    description:
      "A trolley is rolling. Pull the lever to choose a track — timing matters near the fork.",
  },
  section5: {
    reason: "Emotional intelligence scan: convince an AI you are not automated.",
    name: "Section 5 — ARIA",
    description: "Build sentences from the word bank. Green words help you pass her test.",
  },
  section6: {
    reason: "Mechanical coordination check before the slot-floor audit.",
    name: "Section 6 — Lawn Mower",
    description:
      "Yank the starter cord five full pulls. The rope is stretchy — pull past the end each time.",
  },
  final: {
    reason: "All verification modules passed. Issuing human certificate.",
    name: "Verification Complete",
    description: "You cleared every challenge. The grid acknowledges you are not a robot.",
  },
};

const TARGET_MPH_MIN = 90;
const TARGET_MPH_MAX = 100;
const MPH_PER_RAD_S = 9.2;
const FRICTION_PER_SEC = 0.18;
const HOLD_SECONDS = 8;
const DRAG_INPUT_RATE = 0.65;
const COAST_HEAVINESS = 0.55;

let state = "idle";
let progress2 = 0;
let systemPower = 0;
let powerContributingLevels = 0;
let powerLoopId = null;
let lastPowerFrameTime = 0;

let wheelAngle = 0;
let angularVelocity = 0;
let spinDragging = false;
let lastPointerAngle = null;
let lastPointerTime = 0;
let spinnerLoopId = null;
let lastFrameTime = 0;

let level4Unlocked = false;
let gridPowerUnlocked = false;
let level3Completed = false;
let spinnerHoldProgress = 0;
let generatorBroken = false;
let wirePanelOpen = false;
let breakCheckAccumulator = 0;
let wireLeftColors = [];
let wireRightColors = [];
let wireConnectedPairs = [];
let wireDrag = null;
let wirePortElements = { left: [], right: [] };
let wireCursor = { x: 0, y: 0 };
let section1Complete = false;
let momChatBusy = false;
let momChatTimers = [];
let momQuestionIndex = 0;
let momHasAnswered = false;
let momReadyForNext = false;
let sectionPromptTimer = null;
let s5Rounds = 0;
let s5CheckState = "idle";
let s5CurrentPhrase = CAPTCHA_PHRASES[0];
let s5Typing = false;
let s5TypeGen = 0;
let s5NextVisible = false;
let s5NearNextLatch = false;
let s5SwapLock = false;

const TROLLEY_DURATION_MS = 14000;
const TROLLEY_FORK_PROGRESS = 0.68;
/** Past fork on robot branch — train can't switch back to person track */
const ROBOT_DOWNHILL_COMMIT_T = 0.2;
const LEVER_PULL_THRESHOLD = 0.55;
const LEVER_REST_DEG = -6;
const LEVER_PULL_DEG = 42;
/* Horizontal layout — viewBox 0 0 400 200, trolley moves left → right */
const TROLLEY_TRAIN_PATH = {
  start: { x: 12.5, y: 36 },
  fork: { x: 48.75, y: 36 },
  person: { x: 91.25, y: 36 },
  robotCurve: { x: 68, y: 50 },
  robot: { x: 91.25, y: 62.5 },
};

let trolleyResolved = false;
let trolleyLeverPull = 0;
let trolleyLeverWasDiverted = false;
let trolleyBranchAtFork = null;
let trolleyRobotCommitted = false;
let trolleyTrainProgress = 0;
let trolleyAnimId = null;
let trolleyStartTime = 0;
let trolleyLeverDragging = false;
let trolleyLeverDragStartY = 0;
let trolleyLeverDragStartX = 0;
let trolleyLeverDragStartPull = 0;
let levelPickerOpen = false;
let gfSentenceWords = [];
let gfBusy = false;
let gfWon = false;
let gfTimers = [];
let lawnEngineStarted = false;
let introStarted = false;
let sectionTransitionGen = 0;
let briefingNextResolve = null;

function randomCheckDuration() {
  return CHECK_MIN_MS + Math.random() * (CHECK_MAX_MS - CHECK_MIN_MS);
}

function setWidgetClass(...classes) {
  setCaptchaWidgetClass(widget, ...classes);
}

function setCaptchaWidgetClass(widgetEl, ...classes) {
  if (!widgetEl) return;
  widgetEl.classList.remove("is-checking", "is-checked", "is-typing");
  for (const c of classes) {
    if (c) widgetEl.classList.add(c);
  }
}

function setLawnLayoutActive(active) {
  document.querySelector(".app")?.classList.toggle("app--lawn", active);
  gate?.classList.toggle("gate--lawn", active);
}

function setIntroPanelVisible(visible) {
  startPanel?.classList.toggle("hidden", !visible);
  flowNodeCaptcha?.classList.toggle("hidden", visible);
  if (visible) {
    checkbox.setAttribute("aria-checked", "false");
    checkbox.disabled = true;
  }
}

function hideAllGameSections() {
  startPanel?.classList.add("hidden");
  section1?.classList.add("hidden");
  section1?.setAttribute("aria-hidden", "true");
  section2?.classList.add("hidden");
  section2?.setAttribute("aria-hidden", "true");
  section3?.classList.add("hidden");
  section3?.setAttribute("aria-hidden", "true");
  section4?.classList.add("hidden");
  section4?.setAttribute("aria-hidden", "true");
  section5?.classList.add("hidden");
  section5?.setAttribute("aria-hidden", "true");
  section6?.classList.add("hidden");
  section6?.setAttribute("aria-hidden", "true");
  setLawnLayoutActive(false);
  flowNodeCaptcha?.classList.add("hidden");
}

function resetBriefingUI() {
  sectionBriefing?.classList.add("hidden");
  sectionBriefing?.classList.remove("is-reveal", "is-docking", "is-docked");
  sectionBriefing?.setAttribute("aria-hidden", "true");
  gate?.classList.remove("is-transitioning", "is-briefing-card");
}

function cancelSectionTransition() {
  sectionTransitionGen += 1;
  if (briefingNextResolve) {
    const resolve = briefingNextResolve;
    briefingNextResolve = null;
    resolve();
  }
  resetBriefingUI();
}

function populateSectionBriefing(data) {
  if (sectionBriefingReason) sectionBriefingReason.textContent = data.reason;
  if (sectionBriefingName) sectionBriefingName.textContent = data.name;
  if (sectionBriefingDesc) sectionBriefingDesc.textContent = data.description;
}

function waitSectionBriefingNext() {
  return new Promise((resolve) => {
    briefingNextResolve = resolve;
  });
}

function onSectionBriefingNextClick() {
  if (!briefingNextResolve || state !== "transitioning") return;
  GameAudio.play("click");
  const resolve = briefingNextResolve;
  briefingNextResolve = null;
  resolve();
}

function getActiveStageElements() {
  const els = [];
  if (flowNodeCaptcha && !flowNodeCaptcha.classList.contains("hidden")) {
    els.push(flowNodeCaptcha);
  }
  if (section1 && !section1.classList.contains("hidden")) {
    els.push(section1);
    if (systemPowerPanel && !systemPowerPanel.classList.contains("hidden")) {
      els.push(systemPowerPanel);
    }
  }
  if (section2 && !section2.classList.contains("hidden")) els.push(section2);
  if (section3 && !section3.classList.contains("hidden")) els.push(section3);
  if (section4 && !section4.classList.contains("hidden")) els.push(section4);
  if (section5 && !section5.classList.contains("hidden")) els.push(section5);
  if (section6 && !section6.classList.contains("hidden")) els.push(section6);
  return els;
}

function hideExitedStageElements(els) {
  let hidSection1 = false;
  els.forEach((el) => {
    el.classList.remove("stg-slide-exit");
    el.classList.add("hidden");
    if (el === section1) hidSection1 = true;
    if (el !== systemPowerPanel) el.setAttribute("aria-hidden", "true");
  });
  if (hidSection1) hideSystemPowerPanel();
}

async function runSectionTransition(briefingKey, enterFn) {
  const gen = ++sectionTransitionGen;
  const data = SECTION_BRIEFINGS[briefingKey];
  if (!data) {
    enterFn();
    return;
  }

  state = "transitioning";
  gate?.classList.add("is-transitioning");

  const exiting = getActiveStageElements();
  exiting.forEach((el) => el.classList.add("stg-slide-exit"));
  await delayMs(STG_SLIDE_MS);
  if (gen !== sectionTransitionGen) return;

  hideExitedStageElements(exiting);

  populateSectionBriefing(data);
  gate?.classList.add("is-briefing-card");
  sectionBriefing?.classList.remove("hidden", "is-docked", "is-docking");
  sectionBriefing?.setAttribute("aria-hidden", "false");
  await delayMs(32);
  sectionBriefing?.classList.add("is-reveal");

  await waitSectionBriefingNext();
  if (gen !== sectionTransitionGen) return;

  sectionBriefing?.classList.remove("is-reveal");
  sectionBriefing?.classList.add("is-docking");
  await delayMs(STG_BRIEFING_DOCK_MS);
  if (gen !== sectionTransitionGen) return;

  sectionBriefing?.classList.remove("is-docking");
  sectionBriefing?.classList.add("is-docked");
  gate?.classList.remove("is-briefing-card", "is-transitioning");

  enterFn();
  if (gen !== sectionTransitionGen) return;

  await delayMs(32);
  const entering = getActiveStageElements();
  entering.forEach((el) => {
    el.classList.remove("hidden");
    el.setAttribute("aria-hidden", "false");
    el.classList.add("stg-slide-enter");
  });

  await delayMs(STG_SLIDE_MS);
  if (gen !== sectionTransitionGen) return;

  entering.forEach((el) => el.classList.remove("stg-slide-enter"));
}

function getCurrentLevelId() {
  if (winScreen && !winScreen.classList.contains("hidden")) return "win";
  if (state === "trolleyProblem") return "section4";
  if (state === "aiGirlfriend") return "section5";
  if (state === "lawnMower") return "section6";
  if (state === "captchaChallenge") return "section3";
  if (state === "momChat") return "section2";
  if (
    section1 &&
    !section1.classList.contains("hidden") &&
    (isInSection1Play() || state === "pumping" || state === "spinning" || state === "generating" || state === "level2done")
  ) {
    return "section1";
  }
  return "intro";
}

function updateLevelPickerHighlight() {
  const current = getCurrentLevelId();
  levelPickerButtons?.forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.level === current ? "true" : "false");
  });
}

function openLevelPickerMenu() {
  if (!levelPicker) return;
  levelPickerOpen = true;
  levelPicker.classList.remove("hidden");
  levelPicker.setAttribute("aria-hidden", "false");
  updateLevelPickerHighlight();
  levelPicker.querySelector(".level-picker-btn")?.focus();
}

function closeLevelPickerMenu() {
  if (!levelPicker) return;
  levelPickerOpen = false;
  levelPicker.classList.add("hidden");
  levelPicker.setAttribute("aria-hidden", "true");
}

function toggleLevelPickerMenu() {
  if (levelPickerOpen) closeLevelPickerMenu();
  else openLevelPickerMenu();
}

function clearForLevelJump() {
  cancelSectionTransition();
  closeLevelPickerMenu();
  clearMomChatTimers();
  clearGfTimers();
  LawnMower?.stop();
  stopTrolleyAnimation();
  trolleyResolved = false;
  trolleyLeverWasDiverted = false;
  trolleyBranchAtFork = null;
  trolleyRobotCommitted = false;
  stopSpinnerLoop();
  GameAudio.stopSpin();
  onSpinnerPointerUp();
  s5TypeGen += 1;
  loseScreen?.classList.add("hidden");
  loseScreen?.setAttribute("aria-hidden", "true");
  winScreen?.classList.add("hidden");
  winScreen?.setAttribute("aria-hidden", "true");
  window.clearTimeout(sectionPromptTimer);
  gateSub?.classList.remove("gate-sub--error");
  momChatBusy = false;
  momQuestionIndex = 0;
  momHasAnswered = false;
  momReadyForNext = false;
  hideChatPrompt();
}

function resetSection1PanelsForJump() {
  progress2 = 0;
  updateProgress2(0);
  spinnerHoldProgress = 0;
  level3Completed = false;
  syncSpinnerHoldUI();
  pumpBtn.disabled = false;
  level3.classList.remove("is-visible", "is-done");
  level3.setAttribute("aria-hidden", "true");
  level4.classList.remove("is-visible", "is-done");
  level4.setAttribute("aria-hidden", "true");
  level5.classList.remove("is-visible", "is-done", "is-generator-dead");
  level5.setAttribute("aria-hidden", "true");
  level6.classList.remove("is-visible", "is-done");
  level6.setAttribute("aria-hidden", "true");
  level4Unlocked = false;
  gridPowerUnlocked = false;
  systemPower = 0;
  powerContributingLevels = 0;
  deactivatePowerPipes();
  updateSystemPowerUI();
  generatorBroken = false;
  wirePanelOpen = false;
  breakCheckAccumulator = 0;
  wireConnectedPairs = [];
  cancelWireDrag();
  wireTask.classList.add("hidden");
  wireTask.setAttribute("aria-hidden", "true");
  wireBoard.innerHTML = "";
  setGeneratorRunning(true);
  powerBtn?.classList.remove("is-pressed");
  spinnerStage.style.pointerEvents = "";
  mphReadout.classList.remove("is-in-zone", "is-too-slow", "is-too-fast");
  spinnerGrab.classList.remove("is-grabbing");
  spinnerWheel.classList.remove("is-grabbing", "is-spinning-fast");
  spinnerZoneRing.classList.remove("is-active");
  section1?.classList.remove("is-swooshing-out");
  systemPowerPanel?.classList.remove("is-swooshing-out");
}

function jumpToIntro() {
  clearForLevelJump();
  hideAllGameSections();
  hideCaptchaNextBtn();
  hideSystemPowerPanel();
  deactivatePowerPipes();
  setIntroPanelVisible(true);
  introStarted = false;
  section1Complete = false;
  resetSection1PanelsForJump();
  if (chatThread) chatThread.innerHTML = "";
  chatReplies?.classList.add("hidden");
  setChatRepliesEnabled(false);
  state = "idle";
  setWidgetClass();
  checkbox.setAttribute("aria-checked", "false");
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Prove you are human";
  gateSub.textContent = "This is a simple 6 level fun im not a robot game I made.";
  gateSub.classList.remove("hidden");
  document.title = "Not A Robot";
}

function jumpToSection1() {
  clearForLevelJump();
  section1Complete = false;
  resetSection1PanelsForJump();
  showSection1Start();
}

function jumpToSection2() {
  clearForLevelJump();
  section1Complete = true;
  hideSystemPowerPanel();
  showSection2();
}

function jumpToSection3() {
  clearForLevelJump();
  section1Complete = true;
  showSection3();
}

function jumpToSection4() {
  clearForLevelJump();
  section1Complete = true;
  showSection4();
}

function jumpToSection5() {
  clearForLevelJump();
  section1Complete = true;
  showSection5();
}

function jumpToSection6() {
  clearForLevelJump();
  section1Complete = true;
  showSection6();
}

function jumpToWin() {
  clearForLevelJump();
  section1Complete = true;
  hideAllGameSections();
  hideCaptchaNextBtn();
  hideSystemPowerPanel();
  state = "won";
  showWinScreen("final");
}

function jumpToGameLevel(levelId) {
  switch (levelId) {
    case "intro":
      jumpToIntro();
      break;
    case "section1":
      jumpToSection1();
      break;
    case "section2":
      jumpToSection2();
      break;
    case "section3":
      jumpToSection3();
      break;
    case "section4":
      jumpToSection4();
      break;
    case "section5":
      jumpToSection5();
      break;
    case "section6":
      jumpToSection6();
      break;
    case "win":
      jumpToWin();
      break;
    default:
      break;
  }
}

function skipToNextSectionInstant() {
  cancelSectionTransition();
  clearMomChatTimers();
  s5TypeGen += 1;
  hideCaptchaNextBtn();

  if (isInSection1Play()) {
    section1Complete = true;
    stopSpinnerLoop();
    GameAudio.stopSpin();
    onSpinnerPointerUp();
    spinnerStage.style.pointerEvents = "none";
    section1?.classList.remove("is-swooshing-out");
    systemPowerPanel?.classList.remove("is-swooshing-out");
    hideSystemPowerPanel();
    showSection2();
    return;
  }

  if (state === "momChat") {
    momChatBusy = false;
    section2?.classList.remove("is-slide-exit");
    section2?.querySelector(".section-chat-panel")?.classList.remove("is-slide-exit");
    showSection3();
    return;
  }

  if (state === "captchaChallenge") {
    section3?.classList.remove("is-slide-exit", "is-slide-enter");
    showSection4();
    return;
  }

  if (state === "trolleyProblem") {
    stopTrolleyAnimation();
    trolleyResolved = true;
    showSection5();
    return;
  }

  if (state === "aiGirlfriend") {
    gfWon = true;
    showSection6();
    return;
  }

  if (state === "lawnMower") {
    completeSection6();
  }
}

function updateProgress2(value) {
  progress2 = Math.min(100, Math.max(0, value));
  progressFill.style.width = `${progress2}%`;
  progressPercent.textContent = `${Math.floor(progress2)}%`;
  progressTrack.setAttribute("aria-valuenow", String(Math.floor(progress2)));

  if (progress2 >= 100 && state === "pumping") {
    state = "level2done";
    pumpBtn.disabled = true;
    level3.classList.add("is-done");
    addPowerContributor();
    chargePowerPipe(pipeCaptcha2, flowNodeCaptcha, level3);
    GameAudio.play("levelComplete");
    window.setTimeout(showLevel4, 450);
  }
}

function syncSpinnerHoldUI() {
  spinnerProgressFill.style.width = `${spinnerHoldProgress}%`;
  spinnerProgressPercent.textContent = `${Math.floor(spinnerHoldProgress)}%`;
  spinnerProgressTrack.setAttribute("aria-valuenow", String(Math.floor(spinnerHoldProgress)));
}

function checkPowerWin() {
  if (systemPower < 100 || section1Complete) return;
  if (
    state === "idle" ||
    state === "checking" ||
    state === "verified" ||
    state === "swooshing" ||
    state === "transitioning"
  ) {
    return;
  }

  completeSection1();
}

function isInSection1Play() {
  return (
    !section1Complete &&
    section1 &&
    !section1.classList.contains("hidden") &&
    state !== "swooshing" &&
    state !== "transitioning" &&
    state !== "idle" &&
    state !== "checking" &&
    state !== "verified"
  );
}

function skipSection1WithSlide() {
  if (!isInSection1Play()) return;
  systemPower = 100;
  updateSystemPowerUI();
  skipToNextSectionInstant();
}

function completeSection1() {
  if (section1Complete || state === "transitioning") return;
  section1Complete = true;
  stopSpinnerLoop();
  spinnerStage.style.pointerEvents = "none";
  GameAudio.play("swoosh");
  GameAudio.stopSpin();
  runSectionTransition("section2", prepareSection2);
}

function addSystemPower(amount) {
  if (amount === 0 || state === "won") return;

  if (amount > 0) {
    if (systemPower >= 100) {
      checkPowerWin();
      return;
    }
    systemPower = Math.min(100, systemPower + amount);
  } else {
    systemPower = Math.max(0, systemPower + amount);
  }

  updateSystemPowerUI();
  if (systemPower >= 100) checkPowerWin();
}

function completeLevel3() {
  if (state !== "spinning" || level3Completed) return;

  level3Completed = true;
  level4.classList.add("is-done");
  addPowerContributor();
  chargePowerPipe(pipeLevel34, level3, level4);
  GameAudio.play("levelComplete");
  unlockLevel5();
}

function unlockLevel5() {
  if (level4Unlocked) return;

  level4Unlocked = true;
  state = "generating";
  stopSpinnerLoop();
  spinnerStage.style.pointerEvents = "none";
  renderSpinner();
  showLevel5();
}

function getSpinnerCenter() {
  const rect = spinnerWheel.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function pointerAngle(clientX, clientY) {
  const { x, y } = getSpinnerCenter();
  return Math.atan2(clientY - y, clientX - x);
}

function normalizeAngleDelta(delta) {
  let d = delta;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

function getMph() {
  return Math.abs(angularVelocity) * MPH_PER_RAD_S;
}

function isInTargetZone() {
  const mph = getMph();
  return mph >= TARGET_MPH_MIN && mph <= TARGET_MPH_MAX;
}

function renderSpinner() {
  const deg = (wheelAngle * 180) / Math.PI;
  spinnerWheelFace.style.transform = `rotate(${deg}deg)`;

  const mph = getMph();
  mphValue.textContent = String(Math.round(mph));

  const inZone = isInTargetZone();
  mphReadout.classList.toggle("is-in-zone", inZone);
  mphReadout.classList.toggle("is-too-slow", mph > 0 && mph < TARGET_MPH_MIN);
  mphReadout.classList.toggle("is-too-fast", mph > TARGET_MPH_MAX);
  spinnerZoneRing.classList.toggle("is-active", inZone);
  spinnerWheel.classList.toggle("is-spinning-fast", mph > TARGET_MPH_MAX);

  if (level3Completed) {
    spinnerStatus.textContent = "Iron wheel secured — generator online!";
  } else if (spinnerHoldProgress >= 100) {
    spinnerStatus.textContent = "Locked in — stand by…";
  } else if (inZone) {
    spinnerStatus.textContent = "Steady — hold the line!";
  } else if (mph < TARGET_MPH_MIN) {
    spinnerStatus.textContent = mph < 5 ? "Grab the brass knob and heave!" : "Too slow — spin faster!";
  } else {
    spinnerStatus.textContent = "Whoa there — ease off the iron!";
  }
}

function spinnerTick(now) {
  if (state !== "spinning") return;

  if (!lastFrameTime) lastFrameTime = now;
  const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  wheelAngle += angularVelocity * dt;

  if (!spinDragging) {
    const speed = Math.abs(angularVelocity);
    const heavinessScale = 1 + COAST_HEAVINESS * Math.min(speed / 8, 4);
    const friction = Math.exp(-(FRICTION_PER_SEC / heavinessScale) * dt);
    angularVelocity *= friction;
    if (Math.abs(angularVelocity) < 0.008) angularVelocity = 0;
  }

  if (!level3Completed && isInTargetZone()) {
    spinnerHoldProgress = Math.min(100, spinnerHoldProgress + (dt / HOLD_SECONDS) * 100);
    syncSpinnerHoldUI();
    if (spinnerHoldProgress >= 100) completeLevel3();
  }

  syncSpinAudio();
  renderSpinner();
  spinnerLoopId = requestAnimationFrame(spinnerTick);
}

function syncSpinAudio() {
  if (state !== "spinning") {
    GameAudio.stopSpin();
    return;
  }
  const mph = getMph();
  if (mph > 5 || spinDragging) {
    GameAudio.startSpin();
    GameAudio.updateSpin(mph);
  } else {
    GameAudio.stopSpin();
  }
}

function startSpinnerLoop() {
  stopSpinnerLoop();
  lastFrameTime = 0;
  spinnerLoopId = requestAnimationFrame(spinnerTick);
}

function stopSpinnerLoop() {
  if (spinnerLoopId !== null) {
    cancelAnimationFrame(spinnerLoopId);
    spinnerLoopId = null;
  }
  lastFrameTime = 0;
  GameAudio.stopSpin();
}

function onSpinnerPointerMove(e) {
  if (!spinDragging || state !== "spinning") return;
  e.preventDefault();

  const angle = pointerAngle(e.clientX, e.clientY);
  const now = performance.now();

  if (lastPointerAngle !== null && lastPointerTime > 0) {
    const delta = normalizeAngleDelta(angle - lastPointerAngle);
    const dt = (now - lastPointerTime) / 1000;
    if (dt > 0.001 && dt < 0.2) {
      const instant = delta / dt;
      const blend = 1 - Math.exp(-dt * DRAG_INPUT_RATE);
      angularVelocity += instant * blend * 0.35;
      angularVelocity += (instant - angularVelocity) * blend * 0.08;
      wheelAngle += delta;
    }
  }

  lastPointerAngle = angle;
  lastPointerTime = now;
  renderSpinner();
}

function onSpinnerPointerUp() {
  if (!spinDragging) return;
  spinDragging = false;
  spinnerGrab.classList.remove("is-grabbing");
  spinnerWheel.classList.remove("is-grabbing");
  document.removeEventListener("pointermove", onSpinnerPointerMove);
  document.removeEventListener("pointerup", onSpinnerPointerUp);
  document.removeEventListener("pointercancel", onSpinnerPointerUp);
  syncSpinAudio();
}

function onSpinnerPointerDown(e) {
  if (state !== "spinning") return;
  e.preventDefault();

  spinDragging = true;
  lastPointerAngle = pointerAngle(e.clientX, e.clientY);
  lastPointerTime = performance.now();
  spinnerGrab.classList.add("is-grabbing");
  spinnerWheel.classList.add("is-grabbing");

  GameAudio.play("spinGrab");
  GameAudio.startSpin();
  GameAudio.updateSpin(getMph());

  document.addEventListener("pointermove", onSpinnerPointerMove, { passive: false });
  document.addEventListener("pointerup", onSpinnerPointerUp);
  document.addEventListener("pointercancel", onSpinnerPointerUp);
}

function initLevel3Spinner() {
  wheelAngle = 0;
  angularVelocity = 0;
  spinDragging = false;
  lastPointerAngle = null;
  spinnerHoldProgress = 0;
  syncSpinnerHoldUI();
  renderSpinner();
  startSpinnerLoop();
}

function getPowerFillRate() {
  let rate = powerContributingLevels * POWER_PER_LEVEL_PER_SEC;
  if (state === "generating" && !generatorBroken) {
    rate += GENERATOR_POWER_PER_SEC;
  }
  return rate;
}

function updateSystemPowerUI() {
  systemPowerFill.style.width = `${systemPower}%`;
  systemPowerPercent.textContent = `${systemPower.toFixed(1)}%`;
  systemPowerTrack.setAttribute("aria-valuenow", String(Math.floor(systemPower)));

  const rate = getPowerFillRate();
  const genOnline = state === "generating" && !generatorBroken;
  if (rate <= 0) {
    systemPowerRate.textContent = "Complete the pump to start generating power";
  } else if (genOnline && gridPowerUnlocked) {
    systemPowerRate.textContent = `+${rate.toFixed(1)}%/sec passive · +${CLICK_POWER_PER_CLICK}% per button click`;
  } else if (genOnline) {
    systemPowerRate.textContent = `+${rate.toFixed(1)}%/sec (levels + generator online)`;
  } else {
    systemPowerRate.textContent = `+${rate.toFixed(1)}%/sec (${powerContributingLevels} level${
      powerContributingLevels === 1 ? "" : "s"
    } feeding power)`;
  }

  systemPowerTrack.classList.toggle("is-full", systemPower >= 100);
}

function powerTick(now) {
  powerLoopId = requestAnimationFrame(powerTick);

  if (
    state === "won" ||
    state === "swooshing" ||
    state === "momChat" ||
    state === "captchaChallenge" ||
    state === "trolleyProblem" ||
    state === "aiGirlfriend" ||
    state === "lawnMower"
  ) {
    return;
  }
  if (gate.classList.contains("hidden")) return;

  if (!lastPowerFrameTime) lastPowerFrameTime = now;
  const dt = Math.min(0.05, (now - lastPowerFrameTime) / 1000);
  lastPowerFrameTime = now;

  if (state === "pumping" || state === "spinning" || state === "generating") {
    const rate = getPowerFillRate();
    if (rate > 0) addSystemPower(rate * dt);
  }

  if (state === "generating") generatorTick(dt);
}

function startPowerLoop() {
  stopPowerLoop();
  lastPowerFrameTime = 0;
  powerLoopId = requestAnimationFrame(powerTick);
}

function stopPowerLoop() {
  if (powerLoopId !== null) {
    cancelAnimationFrame(powerLoopId);
    powerLoopId = null;
  }
  lastPowerFrameTime = 0;
}

function addPowerContributor() {
  powerContributingLevels += 1;
  updateSystemPowerUI();
}

function showSystemPowerPanel() {
  systemPowerPanel.classList.remove("hidden");
  systemPowerPanel.setAttribute("aria-hidden", "false");
  appRoot?.classList.add("has-power-dock");
  window.requestAnimationFrame(() => {
    systemPowerPanel.classList.add("is-visible");
  });
  updateSystemPowerUI();
}

function hideSystemPowerPanel() {
  systemPowerPanel.classList.remove("is-visible");
  systemPowerPanel.classList.add("hidden");
  systemPowerPanel.setAttribute("aria-hidden", "true");
  appRoot?.classList.remove("has-power-dock");
}

function spawnPowerPipe(pipeEl) {
  if (!pipeEl) return;

  pipeEl.setAttribute("aria-hidden", "false");
  window.requestAnimationFrame(() => {
    pipeEl.classList.add("is-live");
  });
}

function chargePowerPipe(pipeEl, fromNode, toNode) {
  if (!pipeEl) return;

  if (!pipeEl.classList.contains("is-live")) {
    spawnPowerPipe(pipeEl);
  }

  window.setTimeout(() => {
    pipeEl.classList.add("is-charged");
    fromNode?.classList.add("is-powered");
    toNode?.classList.add("is-powered");
  }, PIPE_CHARGE_DELAY_MS);
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateGeneratorUI() {
  level5?.classList.toggle("is-generator-dead", generatorBroken);
  generatorBox?.classList.toggle("is-repair-ready", generatorBroken && !wirePanelOpen);
  if (generatorBox) generatorBox.disabled = !generatorBroken;

  if (generatorBroken && wirePanelOpen) {
    generatorUptime.textContent = "Drag each wire to its matching color.";
  } else if (generatorBroken) {
    generatorUptime.textContent = "Click the generator to open wiring.";
  } else {
    generatorUptime.textContent = `Feeding the dark: +${GENERATOR_POWER_PER_SEC}%/sec`;
  }

  if (generatorBroken) {
    generatorStatus.textContent = wirePanelOpen ? "Fix the wires…" : "It stopped.";
    generatorStatus.classList.remove("is-online");
    generatorStatus.classList.add("is-broken");
  } else {
    generatorStatus.textContent = "It is running";
    generatorStatus.classList.add("is-online");
    generatorStatus.classList.remove("is-broken");
  }
}

function setGeneratorRunning(running) {
  generatorVisual.classList.toggle("is-running", running);
  generatorVisual.classList.toggle("is-broken", !running);
  updateGeneratorUI();
}

function triggerGeneratorBreak() {
  if (generatorBroken || state !== "generating") return;

  GameAudio.play("generatorBreak");
  generatorBroken = true;
  wirePanelOpen = false;
  cancelWireDrag();
  wireTask.classList.add("hidden");
  wireTask.setAttribute("aria-hidden", "true");
  setGeneratorRunning(false);
  updateSystemPowerUI();
}

function closeWirePanel() {
  wirePanelOpen = false;
  cancelWireDrag();
  wireTask.classList.add("hidden");
  wireTask.setAttribute("aria-hidden", "true");
  updateGeneratorUI();
}

function repairGenerator() {
  GameAudio.play("generatorRepair");
  generatorBroken = false;
  wireConnectedPairs = [];
  closeWirePanel();
  setGeneratorRunning(true);
  updateSystemPowerUI();
}

function onGeneratorClick() {
  if (!generatorBroken || wirePanelOpen || state !== "generating") return;
  GameAudio.play("click");
  openWireTask();
}

function openWireTask() {
  wireLeftColors = [...WIRE_COLORS];
  wireRightColors = shuffleArray(WIRE_COLORS);
  wireConnectedPairs = [];
  cancelWireDrag();
  wirePanelOpen = true;

  wireTask.classList.remove("hidden");
  wireTask.setAttribute("aria-hidden", "false");
  renderWireBoard();
  updateGeneratorUI();
}

function isWirePortConnected(side, index) {
  return wireConnectedPairs.some((pair) => pair[side] === index);
}

function getPortCenter(el) {
  if (!el || !wireBoardWrap) return { x: 0, y: 0 };
  const wrap = wireBoardWrap.getBoundingClientRect();
  const port = el.getBoundingClientRect();
  return {
    x: port.left + port.width / 2 - wrap.left,
    y: port.top + port.height / 2 - wrap.top,
  };
}

function clientToWireLocal(clientX, clientY) {
  const wrap = wireBoardWrap.getBoundingClientRect();
  return { x: clientX - wrap.left, y: clientY - wrap.top };
}

function wireStroke(color) {
  return WIRE_STROKE[color] || "#ffffff";
}

function drawWireLines() {
  if (!wireLinesSvg || !wireBoardWrap) return;

  const w = wireBoardWrap.clientWidth;
  const h = wireBoardWrap.clientHeight;
  wireLinesSvg.setAttribute("width", String(w));
  wireLinesSvg.setAttribute("height", String(h));
  wireLinesSvg.setAttribute("viewBox", `0 0 ${w} ${h}`);

  let svg = "";
  for (const pair of wireConnectedPairs) {
    const from = getPortCenter(wirePortElements.left[pair.left]);
    const to = getPortCenter(wirePortElements.right[pair.right]);
    const stroke = wireStroke(pair.color);
    svg += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${stroke}" stroke-width="10" stroke-linecap="round" class="wire-line wire-line-fixed" />`;
  }

  if (wireDrag) {
    const from = getPortCenter(wirePortElements[wireDrag.side][wireDrag.index]);
    const stroke = wireStroke(wireDrag.color);
    svg += `<line x1="${from.x}" y1="${from.y}" x2="${wireCursor.x}" y2="${wireCursor.y}" stroke="${stroke}" stroke-width="10" stroke-linecap="round" class="wire-line wire-line-cursor" />`;
  }

  wireLinesSvg.innerHTML = svg;
}

function cancelWireDrag() {
  if (wireDrag) {
    wirePortElements[wireDrag.side][wireDrag.index]?.classList.remove("is-dragging");
  }
  wireDrag = null;
  document.removeEventListener("pointermove", onWirePointerMove);
  document.removeEventListener("pointerup", onWirePointerUp);
  document.removeEventListener("pointercancel", onWirePointerUp);
  wireBoardWrap?.classList.remove("is-dragging-wire");
  drawWireLines();
}

function startWireDrag(side, index, e) {
  if (!wirePanelOpen || isWirePortConnected(side, index)) return;

  const colors = side === "left" ? wireLeftColors : wireRightColors;
  wireDrag = { side, index, color: colors[index] };
  wirePortElements[side][index]?.classList.add("is-dragging");
  wireCursor = clientToWireLocal(e.clientX, e.clientY);
  wireBoardWrap?.classList.add("is-dragging-wire");

  document.addEventListener("pointermove", onWirePointerMove);
  document.addEventListener("pointerup", onWirePointerUp);
  document.addEventListener("pointercancel", onWirePointerUp);
  drawWireLines();
}

function onWirePointerMove(e) {
  if (!wireDrag) return;
  wireCursor = clientToWireLocal(e.clientX, e.clientY);
  drawWireLines();
}

function onWirePointerUp(e) {
  if (!wireDrag) return;

  const target = document.elementFromPoint(e.clientX, e.clientY);
  const port = target?.closest("[data-wire-side]");
  if (port) {
    const side = port.dataset.wireSide;
    const index = Number.parseInt(port.dataset.wireIndex, 10);
    tryWireConnect(side, index);
  } else {
    cancelWireDrag();
  }
}

function tryWireConnect(side, index) {
  if (!wireDrag || wireDrag.side === side) {
    cancelWireDrag();
    return;
  }
  if (isWirePortConnected(side, index)) {
    cancelWireDrag();
    return;
  }

  const colors = side === "left" ? wireLeftColors : wireRightColors;
  if (colors[index] !== wireDrag.color) {
    GameAudio.play("wireFail");
    cancelWireDrag();
    return;
  }

  const pair =
    wireDrag.side === "left"
      ? { left: wireDrag.index, right: index, color: wireDrag.color }
      : { left: index, right: wireDrag.index, color: wireDrag.color };

  wireConnectedPairs.push(pair);
  GameAudio.play("wireConnect");
  cancelWireDrag();
  renderWireBoard();

  if (wireConnectedPairs.length >= WIRE_COLORS.length) {
    repairGenerator();
  }
}

function createWirePort(side, index, color) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `wire-port wire-${color}`;
  btn.dataset.wireSide = side;
  btn.dataset.wireIndex = String(index);
  btn.setAttribute("aria-label", `${color} wire ${side}`);
  if (isWirePortConnected(side, index)) btn.classList.add("is-connected");
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    btn.setPointerCapture(e.pointerId);
    startWireDrag(side, index, e);
  });
  return btn;
}

function renderWireBoard() {
  wireBoard.innerHTML = "";
  wirePortElements = { left: [], right: [] };

  const leftCol = document.createElement("div");
  leftCol.className = "wire-column wire-column-left";
  const rightCol = document.createElement("div");
  rightCol.className = "wire-column wire-column-right";

  wireLeftColors.forEach((color, leftIdx) => {
    const btn = createWirePort("left", leftIdx, color);
    if (isWirePortConnected("left", leftIdx)) btn.disabled = true;
    wirePortElements.left[leftIdx] = btn;
    leftCol.appendChild(btn);
  });

  wireRightColors.forEach((color, rightIdx) => {
    const btn = createWirePort("right", rightIdx, color);
    if (isWirePortConnected("right", rightIdx)) btn.disabled = true;
    wirePortElements.right[rightIdx] = btn;
    rightCol.appendChild(btn);
  });

  wireBoard.appendChild(leftCol);
  wireBoard.appendChild(rightCol);
  wireProgress.textContent = `${wireConnectedPairs.length} / ${WIRE_COLORS.length} connected`;
  window.requestAnimationFrame(drawWireLines);
}

function generatorTick(dt) {
  if (generatorBroken) {
    addSystemPower(-POWER_DRAIN_BROKEN_PER_SEC * dt);
    return;
  }

  updateGeneratorUI();

  breakCheckAccumulator += dt;
  while (breakCheckAccumulator >= 1) {
    breakCheckAccumulator -= 1;
    if (Math.random() < BREAK_CHANCE_PER_SEC) {
      triggerGeneratorBreak();
      break;
    }
  }
}

function showLevel6() {
  level6.classList.add("is-visible");
  level6.setAttribute("aria-hidden", "false");

  if (gridPowerUnlocked) return;

  gridPowerUnlocked = true;
  spawnPowerPipe(pipeLevel56);
  chargePowerPipe(pipeLevel56, level5, level6);

  gateTitle.textContent = "Section 1";
  gateSub.textContent =
    "Generator + grid — fix wires if it breaks. Green POWER button is +0.1% per click until 100%.";
}

function isGridPowerAvailable() {
  return (
    state === "generating" &&
    gridPowerUnlocked &&
    level6?.classList.contains("is-visible")
  );
}

function showLevel5() {
  level5.classList.add("is-visible");
  level5.setAttribute("aria-hidden", "false");
  spawnPowerPipe(pipeLevel45);
  chargePowerPipe(pipeLevel45, level4, level5);

  generatorBroken = false;
  wirePanelOpen = false;
  breakCheckAccumulator = 0;
  setGeneratorRunning(true);
  updateGeneratorUI();
  showLevel6();
}

function spawnPowerClickParticle() {
  const wrap = powerBtn.closest(".retro-power-wrap");
  if (!wrap) return;

  const particle = document.createElement("span");
  particle.className = "power-float-particle";
  particle.textContent = `+${CLICK_POWER_PER_CLICK}%`;
  particle.style.setProperty("--drift", `${(Math.random() - 0.5) * 40}px`);

  const btnRect = powerBtn.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  particle.style.left = `${btnRect.left + btnRect.width / 2 - wrapRect.left}px`;
  particle.style.top = `${btnRect.top + btnRect.height * 0.35 - wrapRect.top}px`;

  wrap.appendChild(particle);
  particle.addEventListener("animationend", () => particle.remove(), { once: true });
}

function applyClickPower(sourceEl) {
  if (state === "won" || !isGridPowerAvailable()) return false;

  if (sourceEl === powerBtn) {
    powerBtn.classList.add("is-pressed");
    window.setTimeout(() => powerBtn.classList.remove("is-pressed"), 90);
    spawnPowerClickParticle();
  }

  GameAudio.play("clickHeavy");
  GameAudio.play("powerBlip");
  addSystemPower(CLICK_POWER_PER_CLICK);
  return true;
}

function clickPower() {
  if (!applyClickPower(powerBtn)) {
    if (state === "generating" && !gridPowerUnlocked) {
      showGatePrompt(
        "Wait for the grid POWER panel to slide in.",
        gateSub?.textContent || ""
      );
    }
  }
}

function deactivatePowerPipes() {
  for (const pipe of [pipeCaptcha2, pipeLevel34, pipeLevel45, pipeLevel56]) {
    if (!pipe) continue;
    pipe.classList.remove("is-live", "is-charged");
    pipe.setAttribute("aria-hidden", "true");
  }
  flowNodeCaptcha?.classList.remove("is-powered");
  level3?.classList.remove("is-powered");
  level4?.classList.remove("is-powered");
  level5?.classList.remove("is-powered");
  level6?.classList.remove("is-powered");
}

function disablePixelMode() {
  document.body.classList.remove("pixel-mode");
  appRoot?.classList.remove("pixel-mode");
}

function clearMomChatTimers() {
  momChatTimers.forEach((id) => window.clearTimeout(id));
  momChatTimers = [];
}

function appendChatBubble(side, senderName, text) {
  if (!chatThread) return;

  const row = document.createElement("div");
  row.className = `chat-row chat-row--${side} is-popping`;

  const nameEl = document.createElement("span");
  nameEl.className = "chat-sender";
  nameEl.textContent = senderName;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble chat-bubble--${side}`;
  bubble.textContent = text;

  row.appendChild(nameEl);
  row.appendChild(bubble);
  chatThread.appendChild(row);
  chatThread.scrollTop = chatThread.scrollHeight;

  window.setTimeout(() => row.classList.remove("is-popping"), 480);
}

function setChatRepliesEnabled(enabled) {
  chatReplies?.querySelectorAll(".chat-reply-btn").forEach((btn) => {
    btn.disabled = !enabled;
  });
}

function getCurrentMomQuestion() {
  return MOM_QUESTIONS[momQuestionIndex];
}

function renderMomReplies() {
  const question = getCurrentMomQuestion();
  if (!chatReplies || !question) return;

  chatReplies.innerHTML = "";
  Object.entries(question.replies).forEach(([key, reply]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chat-reply-btn";
    btn.dataset.reply = key;
    btn.textContent = reply.label;
    chatReplies.appendChild(btn);
  });
}

function presentMomQuestion() {
  const question = getCurrentMomQuestion();
  if (!question) return;

  appendChatBubble("mom", "Mom", question.prompt);
  GameAudio.play("click");
  renderMomReplies();
  chatReplies?.classList.remove("hidden");
  setChatRepliesEnabled(true);
  momHasAnswered = false;
}

function advanceMomQuestion() {
  momQuestionIndex += 1;
  momHasAnswered = false;
  momReadyForNext = false;
  momChatBusy = false;

  if (momQuestionIndex >= MOM_QUESTIONS.length) {
    momReadyForNext = true;
    setNextButtonVisible(true, true);
    return;
  }

  presentMomQuestion();
}

function startMomConversation() {
  momChatBusy = false;
  momQuestionIndex = 0;
  momHasAnswered = false;
  momReadyForNext = false;
  hideChatPrompt();
  if (chatThread) chatThread.innerHTML = "";
  setChatRepliesEnabled(false);
  chatReplies?.classList.add("hidden");

  presentMomQuestion();
  setNextButtonVisible(true, false);
}

function onMomReply(key) {
  if (state !== "momChat" || momChatBusy) return;

  const question = getCurrentMomQuestion();
  const choice = question?.replies[key];
  if (!choice) return;

  momChatBusy = true;
  momHasAnswered = true;
  setChatRepliesEnabled(false);
  chatReplies?.classList.add("hidden");
  hideChatPrompt();
  GameAudio.play("click");

  momChatTimers.push(
    window.setTimeout(() => {
      appendChatBubble("you", "You", choice.label);
    }, 140)
  );

  momChatTimers.push(
    window.setTimeout(() => {
      appendChatBubble("mom", "Mom", choice.momResponse);
      GameAudio.play(choice.pass ? "verifySuccess" : "verifyFail");

      if (choice.pass) {
        if (momQuestionIndex >= MOM_QUESTIONS.length - 1) {
          momChatTimers.push(
            window.setTimeout(() => {
              momReadyForNext = true;
              momChatBusy = false;
              setNextButtonVisible(true, true);
            }, 700)
          );
        } else {
          momChatTimers.push(window.setTimeout(advanceMomQuestion, 1100));
        }
        return;
      }

      momReadyForNext = false;
      momChatTimers.push(
        window.setTimeout(() => {
          momChatBusy = false;
          chatReplies?.classList.remove("hidden");
          setChatRepliesEnabled(true);
          setNextButtonVisible(true, false);
        }, 600)
      );
    }, 720)
  );
}

function onMomChatNextClick() {
  if (state !== "momChat" || momChatBusy) return;

  if (!momHasAnswered || !momReadyForNext) {
    GameAudio.play("verifyFail");
    showChatPrompt(PLEASE_ANSWER_TEXT);
    return;
  }

  GameAudio.play("click");
  completeSection2();
}

function completeSection2() {
  if (state === "won" || state === "transitioning") return;
  clearMomChatTimers();
  momChatBusy = true;
  setChatRepliesEnabled(false);
  chatReplies?.classList.add("hidden");
  section2?.querySelector(".section-chat-panel")?.classList.remove("is-slide-exit");
  runSectionTransition("section3", prepareSection3);
}

function delayMs(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function pickS5Phrase() {
  const others = CAPTCHA_PHRASES.filter((p) => p !== s5CurrentPhrase);
  const pool = others.length ? others : CAPTCHA_PHRASES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateS5Progress() {
  if (s5Progress) {
    s5Progress.textContent = `${s5Rounds} / ${S5_ROUNDS_NEEDED} verified`;
  }
}

function setNextButtonVisible(visible, ready = false) {
  if (!captchaChallengeNext) return;
  if (!visible) {
    s5NextVisible = false;
    captchaChallengeNext.classList.add("hidden");
    captchaChallengeNext.classList.remove("is-visible", "is-ready", "is-near", "is-always-on");
    return;
  }
  s5NextVisible = true;
  captchaChallengeNext.classList.remove("hidden");
  captchaChallengeNext.classList.add("is-visible", "is-always-on");
  captchaChallengeNext.classList.toggle("is-ready", ready);
}

function hideCaptchaNextBtn() {
  setNextButtonVisible(false);
}

function showGatePrompt(message, restoreText) {
  if (!gateSub) return;
  gateSub.textContent = message;
  gateSub.classList.remove("hidden");
  gateSub.classList.add("gate-sub--error");
  window.clearTimeout(sectionPromptTimer);
  if (restoreText) {
    sectionPromptTimer = window.setTimeout(() => {
      if (gateSub) {
        gateSub.textContent = restoreText;
        gateSub.classList.remove("gate-sub--error");
      }
    }, 2800);
  }
}

function showChatPrompt(message = PLEASE_ANSWER_TEXT) {
  if (chatPrompt) {
    chatPrompt.textContent = message;
    chatPrompt.classList.remove("hidden");
  }
  if (gateSub && state === "momChat") {
    gateSub.textContent = message;
    gateSub.classList.add("gate-sub--error");
  }
  window.clearTimeout(sectionPromptTimer);
  sectionPromptTimer = window.setTimeout(() => {
    hideChatPrompt();
  }, 3200);
}

function hideChatPrompt() {
  chatPrompt?.classList.add("hidden");
  if (gateSub && state === "momChat") {
    gateSub.textContent = "Answer Mom.";
    gateSub.classList.remove("gate-sub--error");
  }
}

function resetS5CheckboxVisual() {
  s5CheckState = "idle";
  setCaptchaWidgetClass(s5Widget);
  if (s5Checkbox) {
    s5Checkbox.disabled = false;
    s5Checkbox.setAttribute("aria-checked", "false");
  }
}

async function animateS5LabelPhrase(phrase) {
  const gen = ++s5TypeGen;
  s5Typing = true;
  s5Widget?.classList.add("is-typing");

  const current = s5Label?.textContent ?? "";
  for (let i = current.length; i >= 0; i--) {
    if (gen !== s5TypeGen) return;
    if (s5Label) s5Label.textContent = current.slice(0, i);
    if (i > 0) GameAudio.play("backspace");
    await delayMs(S5_BACKSPACE_MS);
  }

  const text = phrase.text;
  for (let i = 1; i <= text.length; i++) {
    if (gen !== s5TypeGen) return;
    if (s5Label) s5Label.textContent = text.slice(0, i);
    GameAudio.play("type");
    await delayMs(S5_TYPE_MS);
  }

  if (gen === s5TypeGen) {
    s5CurrentPhrase = phrase;
    s5Typing = false;
    s5Widget?.classList.remove("is-typing");
  }
}

function triggerS5PhraseSwap() {
  if (s5SwapLock || s5Typing || state !== "captchaChallenge") return;
  if (s5CheckState !== "checked" || s5Rounds >= S5_ROUNDS_NEEDED) return;

  s5SwapLock = true;
  s5NearNextLatch = true;
  resetS5CheckboxVisual();

  const next = pickS5Phrase();
  animateS5LabelPhrase(next).finally(() => {
    s5SwapLock = false;
  });
}

function checkS5NextProximity(clientX, clientY) {
  if (!s5NextVisible || s5Rounds >= S5_ROUNDS_NEEDED || s5CheckState !== "checked") return;
  if (!captchaChallengeNext) return;

  const rect = captchaChallengeNext.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const near = Math.hypot(clientX - cx, clientY - cy) < S5_NEXT_NEAR_PX;

  captchaChallengeNext.classList.toggle("is-near", near);

  if (near && !s5NearNextLatch) {
    triggerS5PhraseSwap();
  }
  if (!near) {
    s5NearNextLatch = false;
  }
}

function skipS5TrapPhrase() {
  if (s5Typing) return;
  resetS5CheckboxVisual();
  const next = pickS5Phrase();
  animateS5LabelPhrase(next);
}

function onS5VerifyComplete() {
  s5CheckState = "checked";
  setCaptchaWidgetClass(s5Widget, "is-checked");
  if (s5Checkbox) s5Checkbox.setAttribute("aria-checked", "true");

  if (s5CurrentPhrase.trap) {
    GameAudio.play("verifyFail");
    showLoseScreen();
    return;
  }

  GameAudio.play("verifySuccess");
  s5Rounds += 1;
  updateS5Progress();
  setNextButtonVisible(true, s5Rounds >= S5_ROUNDS_NEEDED);
}

function startS5Verification() {
  if (state !== "captchaChallenge" || s5Typing || s5CheckState !== "idle") return;

  GameAudio.play("checkbox");
  s5CheckState = "checking";
  if (s5Checkbox) {
    s5Checkbox.disabled = true;
    s5Checkbox.setAttribute("aria-checked", "mixed");
  }
  setCaptchaWidgetClass(s5Widget, "is-checking");

  window.setTimeout(onS5VerifyComplete, randomCheckDuration());
}

function initSection3Captcha() {
  s5TypeGen += 1;
  s5Rounds = 0;
  s5Typing = false;
  s5SwapLock = false;
  s5CurrentPhrase = pickS5Phrase();
  if (s5Label) s5Label.textContent = s5CurrentPhrase.text;
  resetS5CheckboxVisual();
  setNextButtonVisible(true, false);
  updateS5Progress();
  loseScreen?.classList.add("hidden");
  loseScreen?.setAttribute("aria-hidden", "true");
}

function showLoseScreen() {
  if (loseTitle) loseTitle.textContent = "You're a robot!";
  if (loseMessage) {
    loseMessage.textContent = `You checked "${s5CurrentPhrase.text}". That was a trap.`;
  }
  loseScreen?.classList.remove("hidden");
  loseScreen?.setAttribute("aria-hidden", "false");
  hideCaptchaNextBtn();
  if (s5Checkbox) s5Checkbox.disabled = true;
}

function retrySection3() {
  loseScreen?.classList.add("hidden");
  loseScreen?.setAttribute("aria-hidden", "true");
  initSection3Captcha();
}

function prepareSection3() {
  disablePixelMode();
  hideAllGameSections();
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Section 3";
  gateSub.textContent = "Check the box ten times. Watch the label — traps will get you.";
  gateSub.classList.remove("hidden");

  section3?.classList.remove("hidden");
  section3?.setAttribute("aria-hidden", "false");
  section3?.classList.remove("is-slide-exit", "is-slide-enter");
  state = "captchaChallenge";
  initSection3Captcha();
}

function showSection3() {
  prepareSection3();
}

function completeSection3() {
  if (state === "won" || state === "transitioning") return;
  hideCaptchaNextBtn();
  s5TypeGen += 1;
  runSectionTransition("section4", prepareSection4);
}

function lerpTrolleyPoint(a, b, t) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function stopTrolleyAnimation() {
  if (trolleyAnimId) {
    cancelAnimationFrame(trolleyAnimId);
    trolleyAnimId = null;
  }
}

function setTrolleyStatus(text, urgent = false) {
  if (!trolleyStatus) return;
  trolleyStatus.textContent = text;
  trolleyStatus.classList.toggle("is-urgent", urgent);
}

function getTrolleyBranch() {
  if (trolleyRobotCommitted) return "robot";
  if (trolleyTrainProgress < TROLLEY_FORK_PROGRESS) {
    return trolleyLeverPull >= LEVER_PULL_THRESHOLD ? "robot" : "person";
  }
  if (trolleyBranchAtFork === null) {
    trolleyBranchAtFork =
      trolleyLeverPull >= LEVER_PULL_THRESHOLD ? "robot" : "person";
  }
  if (trolleyBranchAtFork === "robot" && trolleyLeverPull < LEVER_PULL_THRESHOLD) {
    trolleyBranchAtFork = "person";
  }
  return trolleyBranchAtFork;
}

function isTrackDiverted() {
  return getTrolleyBranch() === "robot";
}

function updateRobotCommitment() {
  if (trolleyRobotCommitted || trolleyTrainProgress < TROLLEY_FORK_PROGRESS) return;
  if (getTrolleyBranch() !== "robot") return;
  const t =
    (trolleyTrainProgress - TROLLEY_FORK_PROGRESS) / (1 - TROLLEY_FORK_PROGRESS);
  if (t >= ROBOT_DOWNHILL_COMMIT_T) {
    trolleyRobotCommitted = true;
    trolleyBranchAtFork = "robot";
    trolleyScene?.classList.add("is-robot-committed");
  }
}

function updateLeverVisual(pull) {
  const p = Math.min(1, Math.max(0, pull));
  const deg = LEVER_REST_DEG + (LEVER_PULL_DEG - LEVER_REST_DEG) * p;
  if (trolleyLeverArm) {
    trolleyLeverArm.style.transform = `rotate(${deg}deg)`;
    trolleyLeverArm.setAttribute("aria-valuenow", String(Math.round(p * 100)));
  }
  if (trolleySwitch) {
    const switchDeg = -38 + 76 * p;
    trolleySwitch.style.transform = `rotate(${switchDeg}deg)`;
  }
}

function updateTrainFromProgress() {
  if (!trolleyTrain) return;
  let pos;
  let angle = 0;
  if (trolleyTrainProgress < TROLLEY_FORK_PROGRESS) {
    const t = trolleyTrainProgress / TROLLEY_FORK_PROGRESS;
    pos = lerpTrolleyPoint(TROLLEY_TRAIN_PATH.start, TROLLEY_TRAIN_PATH.fork, t);
    angle = 0;
  } else {
    const t =
      (trolleyTrainProgress - TROLLEY_FORK_PROGRESS) / (1 - TROLLEY_FORK_PROGRESS);
    if (isTrackDiverted()) {
      if (t < 0.5) {
        pos = lerpTrolleyPoint(TROLLEY_TRAIN_PATH.fork, TROLLEY_TRAIN_PATH.robotCurve, t * 2);
        angle = 8 + t * 20;
      } else {
        pos = lerpTrolleyPoint(
          TROLLEY_TRAIN_PATH.robotCurve,
          TROLLEY_TRAIN_PATH.robot,
          (t - 0.5) * 2
        );
        angle = 18 + (t - 0.5) * 14;
      }
    } else {
      pos = lerpTrolleyPoint(TROLLEY_TRAIN_PATH.fork, TROLLEY_TRAIN_PATH.person, t);
      angle = 0;
    }
  }
  trolleyTrain.style.left = `${pos.x}%`;
  trolleyTrain.style.top = `${pos.y}%`;
  trolleyTrain.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
}

function setLeverPull(pull) {
  if (trolleyResolved || state !== "trolleyProblem") return;
  const branchBefore = getTrolleyBranch();
  let nextPull = Math.min(1, Math.max(0, pull));

  if (trolleyRobotCommitted) {
    if (nextPull < LEVER_PULL_THRESHOLD) {
      GameAudio.play("verifyFail");
      setTrolleyStatus(
        "Too late — the trolley is on the slope down to the robot.",
        true
      );
    }
    nextPull = Math.max(nextPull, LEVER_PULL_THRESHOLD);
  } else if (
    trolleyBranchAtFork === "person" &&
    trolleyTrainProgress >= TROLLEY_FORK_PROGRESS
  ) {
    nextPull = Math.min(nextPull, LEVER_PULL_THRESHOLD - 0.001);
  }

  trolleyLeverPull = nextPull;
  updateLeverVisual(trolleyLeverPull);
  updateRobotCommitment();

  const branchAfter = getTrolleyBranch();
  if (branchAfter !== branchBefore) {
    GameAudio.play("click");
    if (branchAfter === "robot") {
      setTrolleyStatus("Lever forward — trolley on the robot track.", false);
    } else {
      setTrolleyStatus("Lever back — trolley on the person track.", false);
    }
  }
  trolleyLeverWasDiverted = branchAfter === "robot";
}

function finishTrolleyPass() {
  if (trolleyResolved) return;
  trolleyResolved = true;
  stopTrolleyAnimation();
  trolleyScene?.classList.add("is-resolved");
  trolleyRobot?.classList.add("is-dead");
  trolleyPerson?.classList.add("is-safe");
  GameAudio.play("verifySuccess");
  setTrolleyStatus("The robot was sacrificed. You pass.");
  window.setTimeout(completeSection4, 2200);
}

function resolveTrolleyFail() {
  if (trolleyResolved) return;
  trolleyResolved = true;
  stopTrolleyAnimation();
  trolleyScene?.classList.add("is-resolved");
  trolleyPerson?.classList.add("is-dead");
  GameAudio.play("verifyFail");
  setTrolleyStatus("The person was hit.", true);
  window.setTimeout(showTrolleyLose, 900);
}

function showTrolleyLose() {
  if (loseTitle) loseTitle.textContent = "You failed";
  if (loseMessage) {
    loseMessage.textContent = "You did not pull the lever. The person died.";
  }
  if (loseRetryBtn) loseRetryBtn.textContent = "Try the trolley again";
  loseScreen?.classList.remove("hidden");
  loseScreen?.setAttribute("aria-hidden", "false");
}

function retryTrolley() {
  loseScreen?.classList.add("hidden");
  loseScreen?.setAttribute("aria-hidden", "true");
  initTrolleySection();
}

function trolleyAnimationFrame(now) {
  if (state !== "trolleyProblem" || trolleyResolved) return;
  trolleyTrainProgress = Math.min(1, (now - trolleyStartTime) / TROLLEY_DURATION_MS);
  updateRobotCommitment();
  updateTrainFromProgress();

  if (trolleyTrainProgress > 0.72 && !isTrackDiverted() && !trolleyRobotCommitted) {
    setTrolleyStatus("Pull the lever forward — or the person dies!", true);
  }

  if (trolleyTrainProgress >= 0.995) {
    if (isTrackDiverted()) finishTrolleyPass();
    else resolveTrolleyFail();
    return;
  }

  trolleyAnimId = requestAnimationFrame(trolleyAnimationFrame);
}

function startTrolleyTrain() {
  trolleyStartTime = performance.now();
  trolleyAnimId = requestAnimationFrame(trolleyAnimationFrame);
}

function stripTrolleySpriteBackground() {
  const img = trolleySprite;
  if (!img) return;

  const source = new Image();
  source.onload = () => {
    const w = source.naturalWidth;
    const h = source.naturalHeight;
    if (!w || !h) return;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const cx = canvas.getContext("2d", { willReadFrequently: true });
    if (!cx) return;
    cx.drawImage(source, 0, 0);

    const pixels = cx.getImageData(0, 0, w, h);
    const d = pixels.data;
    const removed = new Uint8Array(w * h);

    const cornerSamples = [
      0,
      (w - 1) * 4,
      (h - 1) * w * 4,
      ((h - 1) * w + (w - 1)) * 4,
    ];
    let bgR = 0;
    let bgG = 0;
    let bgB = 0;
    cornerSamples.forEach((idx) => {
      bgR += d[idx];
      bgG += d[idx + 1];
      bgB += d[idx + 2];
    });
    bgR = Math.round(bgR / cornerSamples.length);
    bgG = Math.round(bgG / cornerSamples.length);
    bgB = Math.round(bgB / cornerSamples.length);

    const tolerance = 58;

    function matchesBackdrop(r, g, b) {
      const dr = r - bgR;
      const dg = g - bgG;
      const db = b - bgB;
      if (dr * dr + dg * dg + db * db <= tolerance * tolerance) return true;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      const avg = (r + g + b) / 3;
      return sat < 0.14 && avg > 80 && avg < 210;
    }

    function tryRemove(px) {
      const i = px * 4;
      if (removed[px]) return;
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      if (!matchesBackdrop(r, g, b)) return;
      d[i + 3] = 0;
      removed[px] = 1;
      const x = px % w;
      const y = (px / w) | 0;
      if (x > 0) tryRemove(px - 1);
      if (x < w - 1) tryRemove(px + 1);
      if (y > 0) tryRemove(px - w);
      if (y < h - 1) tryRemove(px + w);
    }

    for (let x = 0; x < w; x++) {
      tryRemove(x);
      tryRemove((h - 1) * w + x);
    }
    for (let y = 0; y < h; y++) {
      tryRemove(y * w);
      tryRemove(y * w + (w - 1));
    }

    cx.putImageData(pixels, 0, 0);
    img.src = canvas.toDataURL("image/png");
    img.dataset.bgStripped = "2";
  };
  source.onerror = () => {
    img.dataset.bgStripped = "0";
  };
  try {
    source.src = new URL("sprites/trolley.png", window.location.href).href;
  } catch {
    source.src = "sprites/trolley.png";
  }
}

function initTrolleySection() {
  trolleyResolved = false;
  trolleyLeverPull = 0;
  trolleyLeverWasDiverted = false;
  trolleyBranchAtFork = null;
  trolleyRobotCommitted = false;
  trolleyTrainProgress = 0;
  trolleyLeverDragging = false;

  stripTrolleySpriteBackground();
  window.requestAnimationFrame(() => stripTrolleySpriteBackground());

  trolleyScene?.classList.remove("is-resolved", "is-lever-dragging", "is-robot-committed");
  trolleyPerson?.classList.remove("is-dead", "is-safe");
  trolleyRobot?.classList.remove("is-dead", "is-safe");

  updateLeverVisual(0);
  updateTrainFromProgress();
  setTrolleyStatus(
    "Drag the lever to switch tracks — you can pull back to the person unless the trolley is already on the slope to the robot.",
    false
  );
  stopTrolleyAnimation();
  startTrolleyTrain();
}

function prepareSection4() {
  disablePixelMode();
  hideAllGameSections();
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Section 4";
  gateSub.textContent =
    "A trolley is coming. Pull the lever to hit the robot — or do nothing and the person dies.";
  gateSub.classList.remove("hidden");

  section4?.classList.remove("hidden");
  section4?.setAttribute("aria-hidden", "false");
  state = "trolleyProblem";
  initTrolleySection();
}

function showSection4() {
  prepareSection4();
}

function completeSection4() {
  if (state === "won" || state === "transitioning") return;
  stopTrolleyAnimation();
  runSectionTransition("section5", prepareSection5);
}

function clearGfTimers() {
  gfTimers.forEach((id) => window.clearTimeout(id));
  gfTimers = [];
}

function getGfWordEntry(word) {
  return GIRLFRIEND_WORD_BANK?.find((e) => e.word === word);
}

function appendGfBubble(side, senderName, text) {
  if (!gfThread) return;
  const row = document.createElement("div");
  row.className = `chat-row chat-row--${side} is-popping`;
  if (side === "aria") row.classList.add("chat-row--aria");

  const nameEl = document.createElement("span");
  nameEl.className = "chat-sender";
  nameEl.textContent = senderName;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble chat-bubble--${side === "you" ? "you" : "mom"}`;
  if (side === "aria") bubble.className = "chat-bubble";
  bubble.textContent = text;

  row.appendChild(nameEl);
  row.appendChild(bubble);
  gfThread.appendChild(row);
  gfThread.scrollTop = gfThread.scrollHeight;
  window.setTimeout(() => row.classList.remove("is-popping"), 480);
}

function updateGfSentenceDisplay() {
  if (!gfSentence || !gfSentenceWrap) return;
  gfSentence.innerHTML = "";
  gfSentenceWords.forEach((word) => {
    const span = document.createElement("span");
    span.className = "gf-sentence-word";
    span.textContent = word;
    gfSentence.appendChild(span);
  });
  gfSentenceWrap.classList.toggle("is-empty", gfSentenceWords.length === 0);
}

function renderGfWordBank() {
  if (!gfWordBank || !GIRLFRIEND_WORD_BANK) return;
  gfWordBank.innerHTML = "";
  GIRLFRIEND_WORD_BANK.forEach((entry) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gf-word-chip";
    if (entry.wins) btn.classList.add("is-win-word");
    btn.textContent = entry.word;
    btn.dataset.word = entry.word;
    btn.addEventListener("click", () => onGfWordClick(entry.word));
    gfWordBank.appendChild(btn);
  });
}

function unlockGfInput() {
  gfBusy = false;
  if (gfSendBtn) gfSendBtn.disabled = false;
  if (gfClearBtn) gfClearBtn.disabled = false;
  gfWordBank?.querySelectorAll(".gf-word-chip").forEach((b) => {
    b.disabled = false;
  });
}

function onGfWordClick(word) {
  if (state !== "aiGirlfriend" || gfBusy) return;
  GameAudio.play("click");
  gfSentenceWords.push(word);
  updateGfSentenceDisplay();
  if (gfPrompt) {
    gfPrompt.textContent = gfWon
      ? "Keep chatting with ARIA, then Send."
      : "Keep building your sentence, then Send.";
    gfPrompt.classList.remove("is-error");
  }
}

function clearGfSentence() {
  if (state !== "aiGirlfriend" || gfBusy) return;
  gfSentenceWords = [];
  updateGfSentenceDisplay();
  if (gfPrompt) {
    gfPrompt.textContent = gfWon
      ? "Pick more words, then Send."
      : "Pick words, then Send.";
    gfPrompt.classList.remove("is-error");
  }
}

function sentenceHasWinWord(words) {
  return words.some((w) => getGfWordEntry(w)?.wins);
}

function getGfResponseForSentence(words) {
  if (!words.length) return "Say something, babe.";
  const last = words[words.length - 1];
  const entry = getGfWordEntry(last);
  return entry?.response || "I don't know what that means, but I'm still armed.";
}

function onGfSend() {
  if (state !== "aiGirlfriend" || gfBusy) return;
  if (!gfSentenceWords.length) {
    GameAudio.play("verifyFail");
    if (gfPrompt) {
      gfPrompt.textContent = "Build a sentence first.";
      gfPrompt.classList.add("is-error");
    }
    return;
  }

  gfBusy = true;
  if (gfSendBtn) gfSendBtn.disabled = true;
  if (gfClearBtn) gfClearBtn.disabled = true;
  gfWordBank?.querySelectorAll(".gf-word-chip").forEach((b) => {
    b.disabled = true;
  });

  const wordsSent = [...gfSentenceWords];
  const sentence = wordsSent.join(" ");
  const passed = !gfWon && sentenceHasWinWord(wordsSent);
  const response = gfWon
    ? getGfPostWinResponse(wordsSent)
    : getGfResponseForSentence(wordsSent);

  gfSentenceWords = [];
  updateGfSentenceDisplay();

  GameAudio.play("click");
  appendGfBubble("you", "You", sentence);

  gfTimers.push(
    window.setTimeout(() => {
      appendGfBubble("aria", "ARIA", response);

      if (passed) {
        GameAudio.play("verifySuccess");
        gfWon = true;
        gfTimers.push(
          window.setTimeout(() => {
            appendGfBubble("aria", "ARIA", GIRLFRIEND_WIN_LINE);
            gfJetScene?.classList.add("is-parked");
            if (gfPrompt) {
              gfPrompt.textContent =
                "She stood down. Keep talking to ARIA, or tap Next when you're done.";
              gfPrompt.classList.remove("is-error");
            }
            unlockGfInput();
            setNextButtonVisible(true, true);
          }, 900)
        );
        return;
      }

      GameAudio.play(gfWon ? "click" : "verifyFail");
      if (gfPrompt) {
        gfPrompt.textContent = gfWon
          ? "ARIA replied. Send another message anytime."
          : GIRLFRIEND_FAIL_HINT;
        gfPrompt.classList.toggle("is-error", !gfWon);
      }
      unlockGfInput();
    }, 650)
  );
}

function onGfNextClick() {
  if (state !== "aiGirlfriend" || gfBusy) return;
  if (!gfWon) {
    GameAudio.play("verifyFail");
    if (gfPrompt) {
      gfPrompt.textContent = "Convince her first — use the green-highlighted words.";
      gfPrompt.classList.add("is-error");
    }
    return;
  }
  GameAudio.play("click");
  completeSection5();
}

function initSection5Girlfriend() {
  clearGfTimers();
  gfSentenceWords = [];
  gfBusy = false;
  gfWon = false;
  if (gfThread) gfThread.innerHTML = "";
  gfJetScene?.classList.remove("is-parked");
  updateGfSentenceDisplay();
  renderGfWordBank();
  if (gfSendBtn) gfSendBtn.disabled = false;
  if (gfClearBtn) gfClearBtn.disabled = false;
  if (gfPrompt) {
    gfPrompt.textContent = "Green words help you pass. Build a sentence, then Send.";
    gfPrompt.classList.remove("is-error");
  }
  hideCaptchaNextBtn();
  appendGfBubble("aria", "ARIA", GIRLFRIEND_INTRO);
  setNextButtonVisible(true, false);
}

function prepareSection5() {
  disablePixelMode();
  hideAllGameSections();
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Section 5";
  gateSub.textContent =
    "ARIA is in an F-1 loaded with Little Boys. Use the word bank — pass if your sentence includes the right words.";
  gateSub.classList.remove("hidden");

  section5?.classList.remove("hidden");
  section5?.setAttribute("aria-hidden", "false");
  state = "aiGirlfriend";
  initSection5Girlfriend();
}

function showSection5() {
  prepareSection5();
}

function completeSection5() {
  if (state === "won" || state === "transitioning") return;
  clearGfTimers();
  hideCaptchaNextBtn();
  runSectionTransition("section6", prepareSection6);
}

function onLawnPull(count, needed) {
  if (lawnStatus) {
    lawnStatus.textContent = `Pull the starter handle — ${count} / ${needed}`;
    lawnStatus.classList.remove("is-done");
  }
  GameAudio.play("lawnMowerFart", 5);
}

function onLawnPullShort() {
  if (lawnStatus && !lawnEngineStarted) {
    lawnStatus.textContent = "Pull all the way out — full cord plus a little extra!";
    lawnStatus.classList.remove("is-done");
  }
}

function onLawnComplete() {
  lawnEngineStarted = true;
  GameAudio.play("levelComplete");
  setNextButtonVisible(true, true);
  if (lawnStatus) {
    lawnStatus.textContent = "Engine started! Tap Next.";
    lawnStatus.classList.add("is-done");
  }
}

function initSection6Lawn() {
  lawnEngineStarted = false;
  LawnMower?.stop();
  hideCaptchaNextBtn();
  LawnMower?.start({
    canvasEl: lawnCanvas,
    wrapEl: lawnSceneWrap,
    statusElement: lawnStatus,
    meterElement: lawnPullMeterFill,
    onPullCb: onLawnPull,
    onPullShortCb: onLawnPullShort,
    onCompleteCb: onLawnComplete,
  });
  window.requestAnimationFrame(() => {
    LawnMower?.resize?.();
    window.requestAnimationFrame(() => LawnMower?.resize?.());
  });
  setNextButtonVisible(true, false);
}

function prepareSection6() {
  disablePixelMode();
  hideAllGameSections();
  setLawnLayoutActive(true);
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Section 6";
  gateSub.textContent =
    "Pull the T-handle on the mower cord. Yank it all the way out 5 times — the rope is super stretchy.";
  gateSub.classList.remove("hidden");

  section6?.classList.remove("hidden");
  section6?.setAttribute("aria-hidden", "false");
  state = "lawnMower";
  window.requestAnimationFrame(() => initSection6Lawn());
}

function showSection6() {
  prepareSection6();
}

function onLawnNextClick() {
  if (state !== "lawnMower") return;
  if (!lawnEngineStarted) {
    GameAudio.play("verifyFail");
    if (lawnStatus) {
      lawnStatus.textContent = "Pull the starter cord 5 times first.";
      lawnStatus.classList.remove("is-done");
    }
    return;
  }
  GameAudio.play("click");
  completeSection6();
}

async function completeSection6() {
  if (state === "won" || state === "transitioning") return;
  LawnMower?.stop();
  hideCaptchaNextBtn();
  await runSectionTransition("final", () => {
    resetBriefingUI();
    hideAllGameSections();
    hideSystemPowerPanel();
    state = "won";
    GameAudio.play("win");
    showWinScreen("final");
  });
  if (winScreen && !winScreen.classList.contains("hidden")) {
    winScreen.classList.add("stg-slide-enter");
    await delayMs(STG_SLIDE_MS);
    winScreen.classList.remove("stg-slide-enter");
  }
}

function onTrolleyLeverDocumentMove(e) {
  if (!trolleyLeverDragging) return;
  const dy = e.clientY - trolleyLeverDragStartY;
  const dx = e.clientX - trolleyLeverDragStartX;
  setLeverPull(trolleyLeverDragStartPull + dy / 75 + dx / 130);
}

function endTrolleyLeverDrag(e) {
  if (!trolleyLeverDragging) return;
  trolleyLeverDragging = false;
  trolleyScene?.classList.remove("is-lever-dragging");
  document.removeEventListener("pointermove", onTrolleyLeverDocumentMove);
  document.removeEventListener("pointerup", endTrolleyLeverDrag);
  document.removeEventListener("pointercancel", endTrolleyLeverDrag);
  try {
    trolleyLeverArm?.releasePointerCapture(e.pointerId);
  } catch {
    /* ignore */
  }
}

function onTrolleyLeverDown(e) {
  if (state !== "trolleyProblem" || trolleyResolved || trolleyLeverDragging) return;
  trolleyLeverDragging = true;
  trolleyLeverDragStartY = e.clientY;
  trolleyLeverDragStartX = e.clientX;
  trolleyLeverDragStartPull = trolleyLeverPull;
  trolleyScene?.classList.add("is-lever-dragging");
  trolleyLeverArm?.setPointerCapture(e.pointerId);
  document.addEventListener("pointermove", onTrolleyLeverDocumentMove);
  document.addEventListener("pointerup", endTrolleyLeverDrag);
  document.addEventListener("pointercancel", endTrolleyLeverDrag);
  e.preventDefault();
}

function onTrolleyLeverMove(e) {
  if (!trolleyLeverDragging) return;
  onTrolleyLeverDocumentMove(e);
}

function onTrolleyLeverUp(e) {
  endTrolleyLeverDrag(e);
}

function onTrolleyLeverKey(e) {
  if (state !== "trolleyProblem" || trolleyResolved) return;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    e.preventDefault();
    setLeverPull(trolleyLeverPull + 0.1);
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    e.preventDefault();
    setLeverPull(trolleyLeverPull - 0.1);
  }
}

function onLoseRetry() {
  if (state === "trolleyProblem") retryTrolley();
  else retrySection3();
}

function onChallengeNextClick() {
  if (state === "momChat") onMomChatNextClick();
  else if (state === "aiGirlfriend") onGfNextClick();
  else if (state === "lawnMower") onLawnNextClick();
  else onCaptchaNextClick();
}

function skipSection3() {
  skipToNextSectionInstant();
}

function onCaptchaNextClick() {
  if (state !== "captchaChallenge" || s5Typing) return;

  const section3Sub = "Check the box ten times. Watch the label — traps will get you.";

  if (s5CurrentPhrase.trap) {
    GameAudio.play("click");
    skipS5TrapPhrase();
    return;
  }

  if (s5CheckState !== "checked") {
    GameAudio.play("verifyFail");
    showGatePrompt(PLEASE_ANSWER_TEXT, section3Sub);
    return;
  }

  if (s5Rounds >= S5_ROUNDS_NEEDED) {
    GameAudio.play("click");
    completeSection3();
    return;
  }

  GameAudio.play("click");
  triggerS5PhraseSwap();
}

function prepareSection2() {
  disablePixelMode();
  hideAllGameSections();
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Section 2";
  gateSub.textContent = "Answer Mom.";
  gateSub.classList.remove("hidden");

  section2?.classList.remove("hidden");
  section2?.setAttribute("aria-hidden", "false");

  const panel = section2?.querySelector(".section-chat-panel");
  panel?.classList.add("is-visible");
  panel?.classList.remove("is-slide-exit");

  state = "momChat";
  startMomConversation();
}

function showSection2() {
  prepareSection2();
}

function prepareSection1() {
  disablePixelMode();
  hideAllGameSections();
  flowNodeCaptcha?.classList.add("hidden");
  gate?.classList.remove("hidden");
  gateTitle.textContent = "Section 1 — Power";
  gateSub.textContent = "Pump, wheel, generator, and grid button — fill Power required to 100%.";
  gateSub.classList.remove("hidden");

  section1?.classList.remove("hidden");
  section1?.setAttribute("aria-hidden", "false");
  showSystemPowerPanel();
  spawnPowerPipe(pipeCaptcha2);

  level3.classList.add("is-visible");
  level3.setAttribute("aria-hidden", "false");
  state = "pumping";

  window.requestAnimationFrame(() => pumpBtn.focus());
}

function showSection1Start() {
  setIntroPanelVisible(false);
  prepareSection1();
}

function showLevel4() {
  gateTitle.textContent = "Section 1";
  gateSub.textContent = `Hold ${TARGET_MPH_MIN}–${TARGET_MPH_MAX} MPH steady to secure the wheel.`;
  document.getElementById("mph-target").textContent =
    `Hold steady: ${TARGET_MPH_MIN}–${TARGET_MPH_MAX} MPH`;

  level4.classList.add("is-visible");
  level4.setAttribute("aria-hidden", "false");
  spawnPowerPipe(pipeLevel34);
  spinnerStage.style.pointerEvents = "";
  state = "spinning";

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(initLevel3Spinner);
  });
}

function showWinScreen(levelKey) {
  const copy = WIN_COPY[levelKey];
  winLevel.textContent = copy.level;
  winTitle.textContent = copy.title;
  winTagline.textContent = copy.tagline;
  winMessage.textContent = copy.message;

  hideSystemPowerPanel();
  gate.classList.add("hidden");
  winScreen.classList.remove("hidden");
  winScreen.setAttribute("aria-hidden", "false");
  document.title = copy.documentTitle;
}

function resetGame() {
  stopSpinnerLoop();
  GameAudio.stopSpin();
  onSpinnerPointerUp();

  state = "idle";
  introStarted = false;
  progress2 = 0;
  systemPower = 0;
  powerContributingLevels = 0;
  hideSystemPowerPanel();
  wheelAngle = 0;
  angularVelocity = 0;

  setWidgetClass();
  checkbox.disabled = true;
  checkbox.setAttribute("aria-checked", "false");

  updateProgress2(0);
  spinnerHoldProgress = 0;
  level3Completed = false;
  syncSpinnerHoldUI();
  pumpBtn.disabled = false;

  disablePixelMode();
  section1Complete = false;
  section1?.classList.remove("hidden", "is-swooshing-out");
  section2?.classList.add("hidden");
  section2?.setAttribute("aria-hidden", "true");
  section3?.classList.add("hidden");
  section3?.setAttribute("aria-hidden", "true");
  section3?.classList.remove("is-slide-exit", "is-slide-enter");
  section4?.classList.add("hidden");
  section4?.setAttribute("aria-hidden", "true");
  section5?.classList.add("hidden");
  section5?.setAttribute("aria-hidden", "true");
  section6?.classList.add("hidden");
  section6?.setAttribute("aria-hidden", "true");
  setLawnLayoutActive(false);
  LawnMower?.stop();
  lawnEngineStarted = false;
  clearGfTimers();
  gfSentenceWords = [];
  gfBusy = false;
  gfWon = false;
  stopTrolleyAnimation();
  trolleyResolved = false;
  trolleyLeverWasDiverted = false;
  trolleyBranchAtFork = null;
  trolleyRobotCommitted = false;
  setIntroPanelVisible(true);
  s5TypeGen += 1;
  s5Rounds = 0;
  hideCaptchaNextBtn();
  loseScreen?.classList.add("hidden");
  loseScreen?.setAttribute("aria-hidden", "true");
  clearMomChatTimers();
  momChatBusy = false;
  momQuestionIndex = 0;
  momHasAnswered = false;
  momReadyForNext = false;
  hideChatPrompt();
  resetBriefingUI();
  if (chatThread) chatThread.innerHTML = "";
  chatReplies?.classList.add("hidden");
  setChatRepliesEnabled(false);
  section2?.querySelector(".section-chat-panel")?.classList.remove("is-slide-exit", "is-slide-enter");
  level3.classList.remove("is-visible", "is-done");
  level3.setAttribute("aria-hidden", "true");
  level4.classList.remove("is-visible", "is-done");
  level4.setAttribute("aria-hidden", "true");
  level5.classList.remove("is-visible", "is-done", "is-generator-dead");
  level5.setAttribute("aria-hidden", "true");
  level6.classList.remove("is-visible", "is-done");
  level6.setAttribute("aria-hidden", "true");
  level4Unlocked = false;
  gridPowerUnlocked = false;
  powerBtn?.classList.remove("is-pressed");
  generatorBroken = false;
  wirePanelOpen = false;
  breakCheckAccumulator = 0;
  wireConnectedPairs = [];
  cancelWireDrag();
  wireTask.classList.add("hidden");
  wireTask.setAttribute("aria-hidden", "true");
  wireBoard.innerHTML = "";
  setGeneratorRunning(true);
  deactivatePowerPipes();
  updateSystemPowerUI();

  spinnerStage.style.pointerEvents = "";
  mphReadout.classList.remove("is-in-zone", "is-too-slow", "is-too-fast");
  spinnerGrab.classList.remove("is-grabbing");
  spinnerWheel.classList.remove("is-grabbing", "is-spinning-fast");
  spinnerZoneRing.classList.remove("is-active");

  gateTitle.textContent = "Prove you are human";
  gateSub.textContent = "This is a simple 6 level fun im not a robot game I made.";
  gateSub.classList.remove("hidden");

  winScreen.classList.add("hidden");
  winScreen.setAttribute("aria-hidden", "true");
  gate.classList.remove("hidden");
  document.title = "Not A Robot";

}

function pump() {
  if (state !== "pumping") return;

  GameAudio.play("pump");
  pumpBtn.classList.add("is-pumping");
  window.setTimeout(() => pumpBtn.classList.remove("is-pumping"), 120);
  updateProgress2(progress2 + PUMP_PER_CLICK);
}

function beginGameFromStart() {
  if (introStarted) return;
  introStarted = true;
  setIntroPanelVisible(false);
  flowNodeCaptcha?.classList.remove("hidden");
  checkbox.disabled = false;
  gateSub.textContent = "Click the checkbox below.";
  gateSub.classList.remove("hidden", "gate-sub--error");
  GameAudio.play("click");
}

function startVerification() {
  if (state !== "idle" || !introStarted) return;

  GameAudio.play("checkbox");
  state = "checking";
  checkbox.disabled = true;
  checkbox.setAttribute("aria-checked", "mixed");
  setWidgetClass("is-checking");

  window.setTimeout(() => {
    state = "verified";
    setWidgetClass("is-checked");
    checkbox.setAttribute("aria-checked", "true");
    window.setTimeout(() => runSectionTransition("section1", prepareSection1), 120);
  }, randomCheckDuration());
}

spinnerGrab.addEventListener("pointerdown", onSpinnerPointerDown);

checkbox.addEventListener("click", startVerification);

document.getElementById("recaptcha-label").addEventListener("click", (e) => {
  if (state === "idle" && !checkbox.disabled) {
    e.preventDefault();
    startVerification();
  }
});

pumpBtn.addEventListener("click", pump);
powerBtn.addEventListener("click", clickPower);
generatorBox.addEventListener("click", onGeneratorClick);
chatReplies?.addEventListener("click", (e) => {
  const btn = e.target.closest(".chat-reply-btn[data-reply]");
  if (btn) onMomReply(btn.dataset.reply);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && levelPickerOpen) {
    e.preventDefault();
    closeLevelPickerMenu();
    return;
  }

  if (
    (e.key === "Enter" || e.key === " ") &&
    state === "transitioning" &&
    briefingNextResolve &&
    document.activeElement !== sectionBriefingNext
  ) {
    e.preventDefault();
    onSectionBriefingNextClick();
    return;
  }

  if (e.key !== "]") return;
  e.preventDefault();
  e.stopPropagation();
  toggleLevelPickerMenu();
});

levelPickerBackdrop?.addEventListener("click", closeLevelPickerMenu);
levelPickerButtons?.forEach((btn) => {
  btn.addEventListener("click", () => {
    const levelId = btn.dataset.level;
    if (levelId) jumpToGameLevel(levelId);
  });
});

s5Checkbox?.addEventListener("click", startS5Verification);
document.getElementById("s5-recaptcha-label")?.addEventListener("click", (e) => {
  if (state === "captchaChallenge" && s5CheckState === "idle" && !s5Checkbox?.disabled) {
    e.preventDefault();
    startS5Verification();
  }
});
captchaChallengeNext?.addEventListener("click", onChallengeNextClick);
gfClearBtn?.addEventListener("click", clearGfSentence);
gfSendBtn?.addEventListener("click", onGfSend);
captchaChallengeNext?.addEventListener("mouseenter", () => {
  if (s5CheckState === "checked" && s5Rounds < S5_ROUNDS_NEEDED && !s5NearNextLatch) {
    triggerS5PhraseSwap();
  }
});
document.addEventListener("pointermove", (e) => {
  if (state === "captchaChallenge") checkS5NextProximity(e.clientX, e.clientY);
});
loseRetryBtn?.addEventListener("click", onLoseRetry);
trolleyLeverAssembly?.addEventListener("pointerdown", onTrolleyLeverDown);
trolleyLeverArm?.addEventListener("pointermove", onTrolleyLeverMove);
trolleyLeverArm?.addEventListener("pointerup", onTrolleyLeverUp);
trolleyLeverArm?.addEventListener("pointercancel", onTrolleyLeverUp);
trolleyLeverArm?.addEventListener("keydown", onTrolleyLeverKey);
playAgainBtn.addEventListener("click", resetGame);
sectionBriefingNext?.addEventListener("click", onSectionBriefingNextClick);
startGameBtn?.addEventListener("click", beginGameFromStart);
setIntroPanelVisible(true);

updateSystemPowerUI();
startPowerLoop();
