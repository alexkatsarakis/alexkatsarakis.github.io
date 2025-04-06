import bb from "../utils/blackboard.js";

import Engine from "../Engine.js";

if (Engine.hasManager("SaveManager")) {
  bb.fastInstall("actions", "Save(Remote)", () =>
    Engine.SaveManager.saveGame()
  );
}

if (Engine.hasManager("SaveManager")) {
  bb.fastInstall("actions", "Save(locally)", () =>
    Engine.SaveManager.saveToLocal()
  );
}
