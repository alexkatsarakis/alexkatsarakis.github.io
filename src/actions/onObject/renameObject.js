import bb from "../../utils/blackboard.js";

function renameObject(obj, newName) {
  if (!obj) console.log("Didn't provided object on name change");
  obj.setName(newName);
}

bb.fastInstall("actions", "renameObject", renameObject);
