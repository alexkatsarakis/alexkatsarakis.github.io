import Engine from "../../Engine.js";

import uiFactory from "../../utils/UIFactory.js";

import bb from "../../utils/blackboard.js";

import tr from "../../utils/translator.js";

export default {
  name: "timewarp",
  link: "./src/UI/timewarp/timewarp.ahtml",
  cb: onTimewarpLoad,
  removable: true,
  loadOnInstall: Engine.hasManager("TimewarpManager"),
};

let firstTime;
let recordedTimes;

function getClosestFrame(array, number) {
  for (let i = 1; i < array.length; ++i) {
    if (number < array[i]) return i - 1;
  }
  return array.length - 1;
}

function getLowerNumber(array, number) {
  for (let i = 1; i < array.length; ++i) {
    if (number < array[i]) return array[i - 1];
  }
  return array[array.length - 1];
}

function changeTimewarpState(newState) {
  const idleState = document.getElementById("timewarp-idle");
  const recordingState = document.getElementById("timewarp-recording");
  const activeState = document.getElementById("timewarp-active");
  recordedTimes = undefined;
  clearPlaybackUI();
  if (newState === "recording") {
    idleState.style.display = "none";
    recordingState.style.display = "block";
    activeState.style.display = "none";
  } else if (newState === "idle") {
    idleState.style.display = "block";
    recordingState.style.display = "none";
    activeState.style.display = "none";
  } else if (newState === "active") {
    idleState.style.display = "none";
    recordingState.style.display = "none";
    activeState.style.display = "block";
  } else {
    throw Error("Timewarp: Tried to switch to unknown state");
  }
}

function getDiffsForObject(obj) {
  const diffs = Engine.TimewarpManager.getDiffs();
  const diffForObject = {};
  for (let timestamp in diffs) {
    diffs[timestamp].forEach((action) => {
      if (action.objectID !== obj.id) return;
      if (!diffForObject[timestamp]) diffForObject[timestamp] = [];

      diffForObject[timestamp].push(action);
    });
  }
  return diffForObject;
}

function translateAction(action) {
  let type = action.type;
  if (action.type === "setValue") {
    type = "Attribute";
  } else if (action.type === "setCurrentState") {
    type = "State change";
  }

  const extraType = action.data.type || "";
  let from = "";
  if (action.data.oldState?.tag !== undefined) from = action.data.oldState.tag;
  if (action.data.oldVal !== undefined) from = action.data.oldVal;
  let to = "";
  if (action.data.newState?.tag !== undefined) to = action.data.newState.tag;
  if (action.data.value !== undefined) to = action.data.value;

  let explanation = "";
  if (action.data.explanation) explanation = action.data.explanation;

  return {
    type,
    extraType,
    from,
    to,
    explanation,
  };

  // return {
  //     type: action.type,
  //     extraType: action.data.type || '',
  //     from: action.data.oldVal || action.data.oldState?.tag || '',
  //     to: action.data.value || action.data.newState?.tag || ''
  // }
}

function showFocusedObjectHistory() {
  const wrap = document.getElementById("timewarp-object-history");
  if (!wrap) return;
  wrap.innerHTML = "";

  const focusedObject = bb.fastGet("state", "focusedObject");
  if (!focusedObject) {
    bb.installWatch("state", "focusedObject", showFocusedObjectHistory);
    return;
  }

  const currTimeShowing = document.getElementById(
    "timewarp-current-timestamp"
  ).innerHTML;

  const diffs = getDiffsForObject(focusedObject);
  uiFactory.createElement({
    parent: wrap,
    id: "timewarp-object-history-head",
    innerHTML: focusedObject.name,
  });

  const keys = Object.keys(diffs).reverse();

  for (let i of keys) {
    diffs[i].forEach((action) => {
      const actionData = translateAction(action);
      const item = uiFactory.createElement({
        parent: wrap,
        classList: "timewarp-object-history-item",
        innerHTML: `[${i - firstTime}ms] ${actionData.type} ${
          actionData.extraType
        } ${actionData.from} → ${actionData.to}`,
      });
      if (actionData.explanation) item.title = actionData.explanation;

      item.onclick = () => {
        Engine.TimewarpManager.showSnapshot(i);
        bb.fastSet("state", "focusedObject", focusedObject);
      };
      if (currTimeShowing === i) {
        item.style.backgroundColor = "var(--secondary-color)";
      }
    });
  }

  bb.installWatch("state", "focusedObject", showFocusedObjectHistory);
}

function clearPlaybackUI() {
  document.getElementById("timewarp-showRecords").onchange = undefined;
  document.getElementById("timewarp-showBackward").onclick = undefined;
  document.getElementById("timewarp-showBackwardSingle").onclick = undefined;
  document.getElementById("timewarp-pause").onclick = undefined;
  document.getElementById("timewarp-resume").onclick = undefined;
  document.getElementById("timewarp-showForwardSingle").onclick = undefined;
  document.getElementById("timewarp-showForward").onclick = undefined;
  document.getElementById("timewarp-rerecord").onclick = undefined;
  document.getElementById("timewarp-timelines-wrapper").onchange = undefined;
}

function renderPlaybackUI() {
  recordedTimes = Engine.TimewarpManager.getRecordedTimestamps();
  if (!recordedTimes) throw Error("No recorded times on stop");

  firstTime = Number.parseInt(recordedTimes[0]);
  recordedTimes = recordedTimes.map((time) => time - firstTime);
  Engine.TimewarpManager.showSnapshot(
    firstTime + recordedTimes[recordedTimes.length - 1],
    recordedTimes.length - 1
  );

  document.getElementById("timewarp-current-timestamp").innerHTML =
    firstTime + recordedTimes[recordedTimes.length - 1];
  showFocusedObjectHistory();

  const range = document.getElementById("timewarp-showRecords");
  range.min = recordedTimes[0];
  range.max = recordedTimes[recordedTimes.length - 1];
  range.value = recordedTimes[recordedTimes.length - 1];
  range.onchange = (ev) => {
    const number = Number.parseInt(ev.target.value);
    const realNumber = getLowerNumber(recordedTimes, number);
    const frameIndex = recordedTimes.indexOf(realNumber);
    if (frameIndex === -1) throw Error("Error translating range to frame");
    Engine.TimewarpManager.showSnapshot(firstTime + realNumber, frameIndex);
  };

  const showBackward = document.getElementById("timewarp-showBackward");
  showBackward.style.width = "10%";
  showBackward.onclick = () => {
    const number = Number.parseInt(range.value);
    const realNumber = getLowerNumber(recordedTimes, number);
    Engine.TimewarpManager.playBackward(
      firstTime + realNumber,
      factor.value / 100
    );
  };

  const showBackwardSingle = document.getElementById(
    "timewarp-showBackwardSingle"
  );
  showBackwardSingle.style.width = "10%";
  showBackwardSingle.onclick = () => {
    const number = Number.parseInt(range.value);
    const currFrame = getClosestFrame(recordedTimes, number);
    if (currFrame !== 0)
      Engine.TimewarpManager.showSnapshot(
        firstTime + recordedTimes[currFrame - 1],
        currFrame - 1
      );
  };

  const pausePlayBut = document.getElementById("timewarp-pause");
  pausePlayBut.style.width = "20%";
  pausePlayBut.onclick = () => {
    Engine.TimewarpManager.stopPlayback();
  };

  const resumeBut = document.getElementById("timewarp-resume");
  resumeBut.style.width = "20%";
  resumeBut.onclick = () => {
    // if(bb.fastGet('settings','Show Prompt On Actions')){
    //     bb.fastSet('events','openPrompt',{
    //         title: tr.get('Continue From Recording'),
    //         description: `${tr.get('If you accept')} ${tr.get('you will lose')} ${tr.get('every')} ${tr.get('recording')} ${tr.get('and')} ${tr.get('continue from stop point')}`,
    //         onAccept: ()=>{
    //             const number = Number.parseInt(range.value);
    //             const realNumber = getLowerNumber(recordedTimes,number);
    //             Engine.TimewarpManager.resumeFromRecording(firstTime+realNumber);
    //             if(Engine.TimewarpManager.isReoccuring()){
    //                 Engine.TimewarpManager.clearTimelines();
    //             }
    //             changeTimewarpState('idle');
    //         }
    //     });
    // }else{
    const number = Number.parseInt(range.value);
    const realNumber = getLowerNumber(recordedTimes, number);
    Engine.TimewarpManager.resumeFromRecording(firstTime + realNumber);
    if (Engine.TimewarpManager.isReoccuring()) {
      Engine.TimewarpManager.clearTimelines();
    }
    changeTimewarpState("idle");
    // }
  };

  const showForwardSingle = document.getElementById(
    "timewarp-showForwardSingle"
  );
  showForwardSingle.style.width = "10%";
  showForwardSingle.onclick = () => {
    const number = Number.parseInt(range.value);
    const currFrame = getClosestFrame(recordedTimes, number);
    if (currFrame !== recordedTimes.length - 1)
      Engine.TimewarpManager.showSnapshot(
        firstTime + recordedTimes[currFrame + 1],
        currFrame + 1
      );
  };

  const showForward = document.getElementById("timewarp-showForward");
  showForward.style.width = "10%";
  showForward.onclick = () => {
    const number = Number.parseInt(range.value);
    const realNumber = getLowerNumber(recordedTimes, number);
    Engine.TimewarpManager.playForward(
      firstTime + realNumber,
      factor.value / 100
    );
  };

  const factor = document.getElementById("timewarp-playback-speed");
  factor.value = 100;

  const currFrame = document.getElementById("timewarp-current-frame");
  currFrame.innerHTML = `${tr.get("Frame")}: ${recordedTimes.length - 1}`;
  currFrame.style.textAlign = "left";
  const maxFrame = document.getElementById("timewarp-max-frame");
  maxFrame.innerHTML = "/" + (recordedTimes.length - 1);
  maxFrame.style.textAlign = "left";

  const currFrameTime = document.getElementById("timewarp-current-frame-time");
  currFrameTime.innerHTML = `${tr.get("Time")}: ${
    (recordedTimes[recordedTimes.length - 1] - recordedTimes[0]) / 1000
  }s`;
  currFrameTime.style.textAlign = "left";
  const maxFrameTime = document.getElementById("timewarp-max-frame-time");
  maxFrameTime.innerHTML =
    "/" +
    (recordedTimes[recordedTimes.length - 1] - recordedTimes[0]) / 1000 +
    "s";
  maxFrameTime.style.textAlign = "left";

  if (Engine.TimewarpManager.isReoccuring()) {
    document.getElementById("timewarp-timelines").style.display = "block";
  } else {
    document.getElementById("timewarp-timelines").style.display = "none";
  }
  const timelines = Engine.TimewarpManager.getTimelines();

  const timelinesWrapper = document.getElementById(
    "timewarp-timelines-wrapper"
  );
  timelinesWrapper.innerHTML = "";

  for (let i in timelines) {
    uiFactory.createElement({
      parent: timelinesWrapper,
      type: "option",
      value: i,
      innerHTML: "#" + (Number.parseInt(i) + 1),
    });
  }

  timelinesWrapper.value = Engine.TimewarpManager.getCurrentTimeline();

  document.getElementById("timewarp-current-recording").innerHTML = `${tr.get(
    "Current Recording"
  )}: (#${Number.parseInt(timelinesWrapper.value) + 1})`;

  timelinesWrapper.onchange = (ev) => {
    Engine.TimewarpManager.setTimeline(timelinesWrapper.value);
    renderPlaybackUI();
  };
  const reRecord = document.getElementById("timewarp-rerecord");
  reRecord.onclick = () => {
    // const currTimeline = (Number.parseInt(timelinesWrapper.value)+1);
    // if(currTimeline < timelines.length && bb.fastGet('settings','Show Prompt On Actions')){
    //     bb.fastSet('events','openPrompt',{
    //         title: tr.get('New Recording'),
    //         description: `${tr.get('If you accept')} ${tr.get('you will lose')} ${tr.get('all the recordings')} ${tr.get("after timeline")} #${currTimeline}`,
    //         onAccept: ()=>{
    //             Engine.TimewarpManager.clearTimelines(timelinesWrapper.value);
    //             Engine.PauseManager.resume();
    //             changeTimewarpState('recording');
    //             Engine.TimewarpManager.startRecording(0);
    //             renderRecordingUI();
    //         }
    //     });
    // } else {
    Engine.TimewarpManager.clearTimelines(timelinesWrapper.value);
    Engine.PauseManager.resume();
    changeTimewarpState("recording");
    Engine.TimewarpManager.startRecording(0);
    renderRecordingUI();
    // }
  };
}

function renderRecordingUI() {
  const recNumber = document.getElementById("timewarp-stop-numofrec");

  const currTimeline = Engine.TimewarpManager.getCurrentTimeline();
  recNumber.innerHTML = `${tr.get("Recording")} #${currTimeline + 2}`;
}

function onTimewarpLoad() {
  if (!Engine.hasManager("TimewarpManager"))
    throw Error(
      "Trying to install UI that requires Timewarp Manager but it's not installed"
    );
  changeTimewarpState("idle");
  document.getElementById("timewarp-record-prompt-ds").innerHTML =
    tr.get("Delta State") + ":";
  document.getElementById("timewarp-record-prompt-snap").innerHTML =
    tr.get("Snapshot") + ":";
  document.getElementById("timewarp-stop-prompt").innerHTML = tr.get(
    "Click to Stop Recording"
  );
  document.getElementById("timewarp-playback-speed-prompt").innerHTML =
    tr.get("Playback Speed");
  document.getElementById("timewarp-timelines-wrapper-label").innerHTML =
    tr.get("Jump to recording");
  document.getElementById("timewarp-rerecord").innerHTML = tr.get(
    "Continue with new recording"
  );

  const recBut = document.getElementById("timewarp-record");

  const recBut2 = document.getElementById("timewarp-record2");

  recBut2.onclick = () => {
    Engine.TimewarpManager.setTimewarpMechanism("Snapshot");
    changeTimewarpState("recording");
    Engine.TimewarpManager.startRecording(0);
    renderRecordingUI();
  };

  recBut.onclick = () => {
    Engine.TimewarpManager.setTimewarpMechanism("DS");
    changeTimewarpState("recording");
    Engine.TimewarpManager.startRecording(0);
    renderRecordingUI();
  };

  const stopRecBut = document.getElementById("timewarp-stop-record");

  stopRecBut.style.backgroundColor = "red";
  stopRecBut.onclick = () => {
    changeTimewarpState("active");
    Engine.TimewarpManager.stopRecording();
    renderPlaybackUI();
    stopRecBut.onkeypress = null;
  };
}
