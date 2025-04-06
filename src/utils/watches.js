import bb from "./blackboard.js";

import Engine from "../Engine.js";

export default function installWatches() {
  bb.installWatch("state", "mode", triggerStateModeChange);
}

function triggerStateModeChange(e) {
  const aliveItems = Engine.ObjectManager.objects;
  if (e === "play") {
    for (let i in aliveItems) aliveItems[i].triggerEvent("onGameStart");
  }
  bb.installWatch("state", "mode", triggerStateModeChange);
}
