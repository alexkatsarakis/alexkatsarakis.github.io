import Engine from "../../Engine.js";

import bb from "../../utils/blackboard.js";

export default {
  name: "gridView",
  link: "./src/UI/gridView/gridView.ahtml",
  cb: onGridViewLoaded,
  removable: true,
  loadOnInstall: false,
};

function drawGrid(stage, grid) {
  const wrapper = document.getElementById("gridView-wrap");
  if (!wrapper) return;
  wrapper.innerHTML = "";
  const offsetX = stage.getValue("x");
  const offsetY = stage.getValue("y");
  grid.forEach((element) => {
    const item = document.createElement("div");
    item.classList = "gridView-v";
    item.style.top = element.y - offsetY + "px";
    item.style.left = element.x - offsetX + "px";
    item.style.width = element.width + "px";
    item.style.height = element.height + "px";
    wrapper.appendChild(item);
  });
  console.log("grid!");
  bb.installWatch("events", "gridUpdated", (grid) => {
    drawGrid(stage, grid);
  });
}

function onGridViewLoaded() {
  const stage = Engine.ObjectManager.getObjectByName("Stage");
  const grid = Engine.GridManager.getGrid();
  drawGrid(stage, grid);

  bb.installWatch("events", "gridUpdated", (grid) => {
    drawGrid(stage, grid);
  });
}
