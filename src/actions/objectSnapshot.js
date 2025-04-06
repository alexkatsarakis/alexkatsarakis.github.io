import bb from "../utils/blackboard.js";

import Engine from "../Engine.js";

if (Engine.hasManager("SnapshotManager")) {
  bb.fastInstall("actions", "Snapshot Object", () =>
    Engine.SnapshotManager.snapshotObject()
  );
  bb.fastInstall("actions", "Snapshot Scene", () =>
    Engine.SnapshotManager.snapshotScene()
  );
}
