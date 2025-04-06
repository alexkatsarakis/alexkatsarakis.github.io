export default {
  name: "Collisions",
  svgIcon:
    '<svg class="inventory-window-tabs-item-icon" height="512pt" viewBox="0 -25 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m497 215.5h-51.917969c-7.234375-49.589844-49.78125-87.785156-101.019531-87.785156-36.816406 0-69.140625 19.714844-87.109375 49.207031-17.964844-29.492187-50.292969-49.207031-87.105469-49.207031-51.238281 0-93.785156 38.195312-101.019531 87.785156h-53.828125c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h53.824219c7.234375 49.589844 49.78125 87.785156 101.023437 87.785156 36.8125 0 69.140625-19.714844 87.105469-49.207031 17.96875 29.492187 50.292969 49.207031 87.105469 49.207031 51.242187 0 93.789062-38.195312 101.023437-87.785156h51.917969c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm-327.152344 87.785156c-34.667968 0-63.699218-24.824218-70.566406-57.785156h56.9375l-9.546875 8.570312c-6.164063 5.535157-6.675781 15.019532-1.140625 21.183594 2.960938 3.296875 7.054688 4.976563 11.164062 4.976563 3.570313 0 7.152344-1.265625 10.019532-3.835938l34.660156-31.121093c4.136719-3.710938 6.53125-9.015626 6.585938-14.574219.003906-.066407.003906-.132813.003906-.199219s0-.132812-.003906-.199219c-.054688-5.558593-2.449219-10.863281-6.585938-14.574219l-34.660156-31.121093c-6.167969-5.53125-15.648438-5.019531-21.183594 1.140625-5.535156 6.164062-5.023438 15.648437 1.140625 21.183594l9.546875 8.570312h-56.9375c6.867188-32.960938 35.898438-57.785156 70.566406-57.785156 39.761719 0 72.105469 32.652344 72.105469 72.785156s-32.347656 72.785156-72.105469 72.785156zm174.214844 0c-39.761719 0-72.109375-32.652344-72.109375-72.785156s32.347656-72.785156 72.109375-72.785156c34.664062 0 63.695312 24.824218 70.566406 57.785156h-58.847656l9.546875-8.570312c6.164063-5.535157 6.675781-15.019532 1.140625-21.183594-5.535156-6.164063-15.019531-6.671875-21.183594-1.140625l-34.660156 31.121093c-4.136719 3.710938-6.527344 9.015626-6.585938 14.574219v.199219.199219c.054688 5.558593 2.449219 10.859375 6.585938 14.574219l34.660156 31.117187c2.867188 2.574219 6.449219 3.839844 10.019532 3.839844 4.109374 0 8.203124-1.679688 11.164062-4.980469 5.535156-6.164062 5.023438-15.648438-1.140625-21.183594l-9.546875-8.570312h58.847656c-6.871094 32.964844-35.902344 57.789062-70.566406 57.789062zm0 0"/><path d="m286.757812 402.988281h-83.5c-8.285156 0-15 6.714844-15 15 0 8.285157 6.714844 15 15 15h83.5c8.28125 0 15-6.714843 15-15 0-8.285156-6.71875-15-15-15zm0 0"/><path d="m153.53125 402.988281h-23.398438c-8.28125 0-15 6.714844-15 15 0 8.285157 6.71875 15 15 15h23.398438c8.285156 0 15-6.714843 15-15 0-8.285156-6.714844-15-15-15zm0 0"/><path d="m221.511719 382.972656c8.285156 0 15-6.71875 15-15 0-8.285156-6.714844-15-15-15h-206.511719c-8.285156 0-15 6.714844-15 15 0 8.28125 6.714844 15 15 15zm0 0"/><path d="m45.351562 432h-23.398437c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h23.398437c8.285157 0 15-6.714844 15-15s-6.714843-15-15-15zm0 0"/><path d="m224.941406 59.011719h163.5c8.285156 0 15-6.714844 15-15 0-8.285157-6.714844-15-15-15h-163.5c-8.285156 0-15 6.714843-15 15 0 8.285156 6.714844 15 15 15zm0 0"/><path d="m370.183594 79.027344c-8.28125 0-15 6.71875-15 15 0 8.285156 6.71875 15 15 15h126.515625c8.28125 0 15-6.714844 15-15 0-8.28125-6.71875-15-15-15zm0 0"/><path d="m297.0625 79.027344c-8.285156 0-15 6.71875-15 15 0 8.285156 6.714844 15 15 15h23.398438c8.285156 0 15-6.714844 15-15 0-8.28125-6.714844-15-15-15zm0 0"/><path d="m466.347656 30h23.398438c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-23.398438c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"/></svg>',
  callback: showCollisions,
};

import Engine from "../../../Engine.js";
import uiFactory from "../../../utils/UIFactory.js";

function checkAndAddEmpty(objWrapper, object) {
  const objKeys = Object.keys(object);
  if (objKeys.length === 0) {
    uiFactory.createElement({
      parent: objWrapper,
      id: "inventory-empty-text",
      innerHTML: "Nothing to be shown",
    });
    return true;
  }
  return false;
}

function showCollisions(objWrapper) {
  objWrapper.innerHTML = "";
  const items = Engine.CollisionManager.getAllCollisions();
  checkAndAddEmpty(objWrapper, items);

  for (let i in items) {
    const wrap = uiFactory.createElement({
      parent: objWrapper,
      classList: "inventory-window-itemWrapper",
    });

    uiFactory.createElement({
      parent: wrap,
      classList: "inventory-window-objName",
      innerHTML: i,
    });

    let str = "";
    for (let colWith in items[i]) {
      str += colWith + "\n";
    }

    uiFactory.createElement({
      parent: wrap,
      classList: "inventory-window-body",
      innerHTML: str,
    }).style.overflow = "auto";
  }
}
