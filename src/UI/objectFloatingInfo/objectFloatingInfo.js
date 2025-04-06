import bb from "../../utils/blackboard.js";

import Engine from "../../Engine.js";

export default {
  name: "objectFloatingInfo",
  link: "./src/UI/objectFloatingInfo/objectFloatingInfo.ahtml",
  cb: onObjectInfoLoaded,
  removable: true,
  loadOnInstall: false,
};

function updateInfo(obj) {
  if (!document.getElementById("objectFloatingInfo_box")) return;
  const dom = document.getElementById("objectFloatingInfo_box");
  const info = document.getElementById("objectFloatingInfo_info");
  dom.style.display = "block";
  info.style.display = "block";
  if (!obj) {
    dom.style.display = "none";
    info.style.display = "none";
    bb.installWatch("state", "focusedObject", updateInfo);
    return;
  }

  const positional = obj.getPositional();
  const stage = Engine.ObjectManager.getObjectByName("Stage");
  const offsetX = stage.getValue("x");
  const offsetY = stage.getValue("y");

  const scripts = Object.keys(obj.getEvents());
  const fields = Object.keys(obj.getValues());

  info.innerText = `  Name: ${obj.name}
                        Category: ${obj.getCategory()}
                        x: ${positional.x}px
                        y: ${positional.y}px
                        ${scripts.length} scripts
                        ${fields.length} fields`;

  dom.style.top = positional.y - offsetY + "px";
  dom.style.left = positional.x - offsetX + "px";
  dom.style.width = positional.width + "px";
  dom.style.height = positional.height + "px";

  info.style.left = positional.width + "px";
  info.style.width = "200px";

  bb.installWatch("state", "focusedObject", updateInfo);
}

function onObjectInfoLoaded() {
  const focObj = bb.fastGet("state", "focusedObject");
  updateInfo(focObj ? focObj : undefined);
}
