import Engine from "../../../Engine.js";
import uiFactory from "../../../utils/UIFactory.js";
import tr from "../../../utils/translator.js";
import bb from "../../../utils/blackboard.js";

export default {
  name: "Clipboard",
  svgIcon:
    '<svg class="inventory-window-tabs-item-icon" height="512pt" viewBox="-40 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0"/></svg>',
  callback: showClipboard,
  restriction: Engine.hasManager("ClipboardManager"),
};

function previewObject(parent, item) {
  if (item.extra?.div) {
    const temp = document.createElement("div");
    temp.innerHTML = item.extra.div;
    const newItem = temp.firstChild;
    newItem.id =
      Number.parseInt(Math.random() * 100000) + "_objectMenu_inventory";
    newItem.style.color = item.values.color.val;
    newItem.classList = "";
    newItem.style.top = "";
    newItem.style.left = "";
    newItem.style.position = "";
    newItem.style.transform = "rotate(0)";
    parent.appendChild(newItem);
  } else if (item._film) {
    const pos = {
      width: item.values.width.val,
      height: item.values.height.val,
    };
    const info = Engine.AnimationManager.getFilm(item._film);
    const box = info.getFrameBox(item._frame);
    const img = info.bitmap;
    const canv = uiFactory.createElement({
      type: "canvas",
      id: Number.parseInt(Math.random() * 100000) + "_objectMenu_inventory",
      parent: parent,
    });
    canv.style.width = "100%";
    canv.style.height = "100%";
    const ctx = canv.getContext("2d");
    const x = canv.offsetWidth / 2 - pos.width / 2;
    const y = canv.offsetHeight / 2 - pos.height / 2;
    ctx.canvas.width = canv.offsetWidth;
    ctx.canvas.height = canv.offsetHeight;
    ctx.drawImage(
      bb.fastGet("assets", img),
      box.x,
      box.y,
      box.width,
      box.height,
      x,
      y,
      pos.width,
      pos.height
    );
  } else {
    parent.innerHTML = "Preview for " + item.name + " isn't possible";
  }
}

function checkAndAddEmpty(objWrapper, object) {
  const objKeys = Object.keys(object);
  if (objKeys.length === 0) {
    uiFactory.createElement({
      parent: objWrapper,
      id: "inventory-empty-text",
      innerHTML: tr.get("Nothing to be shown"),
    });
    return true;
  }
  return false;
}

function showClipboard(objWrapper) {
  objWrapper.innerHTML = "";
  const clipboardObjs = Engine.ClipboardManager.getCollection();

  const isEmpty = checkAndAddEmpty(objWrapper, clipboardObjs);
  const buttonWrapper = uiFactory.createElement({
    parent: objWrapper,
    classList: "inventory-window-body-page-button-wrapper",
  });
  if (!isEmpty) {
    uiFactory.createElement({
      parent: buttonWrapper,
      classList: "inventory-window-body-page-item-button",
      innerHTML: tr.get("Clear All"),
    }).onclick = () => {
      if (bb.fastGet("settings", "Show Prompt On Actions")) {
        bb.fastSet("events", "openPrompt", {
          title: tr.get("Clear Clipboard"),
          description: `${tr.get("If you accept")} *${tr.get("ALL")}* ${tr.get(
            "clipboard"
          )} ${tr.get("will get cleared")}`,
          onAccept: () => {
            Engine.ClipboardManager.clearClipboard();
            showClipboard(objWrapper);
            bb.fastSet("events", "showFeedback", `Cleared Clipboard`);
          },
        });
      } else {
        Engine.ClipboardManager.clearClipboard();
        showClipboard(objWrapper);
        bb.fastSet("events", "showFeedback", `Cleared Clipboard`);
      }
    };
  }

  clipboardObjs.reverse();

  clipboardObjs.forEach((item, index) => {
    const wrap = uiFactory.createElement({
      classList: "inventory-window-itemWrapper",
      parent: objWrapper,
    });

    uiFactory.createElement({
      classList: "inventory-window-objName",
      innerHTML: `${item._name} (${item._time})`,
      parent: wrap,
    });

    wrap.insertAdjacentHTML(
      "beforeend",
      `<svg id="inventory-delete-item-${index}" class="inventory-window-body-page-item-delete" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>`
    );
    const removeBut = document.getElementById(`inventory-delete-item-${index}`);

    removeBut.onclick = () => {
      if (bb.fastGet("settings", "Show Prompt On Actions")) {
        bb.fastSet("events", "openPrompt", {
          title: tr.get("Remove Item"),
          description: `${tr.get("If you accept")} ${tr.get("item")} ${
            item._name
          } (${item._time}) ${tr.get("will get removed")}`,
          onAccept: () => {
            Engine.ClipboardManager.removeItem(
              clipboardObjs.length - 1 - index
            );
            showClipboard(objWrapper);
          },
        });
      } else {
        Engine.ClipboardManager.removeItem(clipboardObjs.length - 1 - index);
        showClipboard(objWrapper);
      }
    };

    const body = uiFactory.createElement({
      classList: "inventory-window-body",
      parent: wrap,
    });
    previewObject(body, item);

    body.style.cursor = "pointer";

    body.onclick = () => {
      if (bb.fastGet("settings", "Show Prompt On Actions")) {
        bb.fastSet("events", "openPrompt", {
          title: tr.get("Create Object"),
          description: `${tr.get("If you accept")} ${tr.get("a")} ${tr.get(
            "copy"
          )} ${tr.get("of")} ${item._name} ${tr.get("will be created")}`,
          onAccept: () => {
            Engine.ClipboardManager.paste(clipboardObjs.length - 1 - index);
            closeInventoryWindow();
          },
        });
      } else {
        Engine.ClipboardManager.paste(clipboardObjs.length - 1 - index);
        closeInventoryWindow();
      }
    };
  });
}
