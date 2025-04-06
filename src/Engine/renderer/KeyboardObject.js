import Object from "../objects/Object.js";
import bb from "../../utils/blackboard.js";

class KeyboardObject extends Object {
  renderer = "None";
  name = "Keyboard";

  constructor() {
    super("Keyboard", "vxz19AN3VqipnPH");

    this.data.optionHandler.removeOption("isMovable");
    this.data.optionHandler.removeOption("isRemovable");
    this.data.optionHandler.removeOption("isVisible");
    this.data.optionHandler.removeOption("isSolid");
    this.data.optionHandler.removeOption("isCollidable");
    this.data.optionHandler.removeOption("moveWithScroll");

    this.data.eventHandler.removeEvent("onCollision");
    this.data.eventHandler.removeEvent("onRemove");
    this.data.eventHandler.removeEvent("onMove");
    this.data.eventHandler.removeEvent("onGameStart");
    this.data.eventHandler.removeEvent("onEachFrame");
    this.data.eventHandler.removeEvent("onClick");
    this.data.eventHandler.removeEvent("onRightClick");

    this._category = "Keyboard";

    // i = 'A'.charCodeAt(0), j = 'Z'.charCodeAt(0);
    for (let i = 65; i <= 90; ++i) {
      this.addEvent("PressedKey" + String.fromCharCode(i));
    }

    for (let i = 0; i < 10; ++i) {
      this.addEvent("PressedDigit" + i);
    }

    for (let i = 65; i <= 90; ++i) {
      this.addEvent("UnpressedKey" + String.fromCharCode(i));
    }

    for (let i = 0; i < 10; ++i) {
      this.addEvent("UnpressedDigit" + i);
    }
  }

  add() {}

  triggerEvent(ev) {
    if (bb.fastGet("state", "mode") === "paused") return;

    super.triggerEvent(ev);
  }

  remove() {
    throw Error("Keyboard Object cannot be removed!");
  }
}

const keyboardObject = new KeyboardObject();

export default keyboardObject;
