import Engine from "../../Engine.js";

class Event {
  val;
  tag;
  onChange;
  getValue;
  constructor({ tag, value, onChange, getValue }) {
    if (
      typeof tag !== "string" ||
      (typeof onChange !== "function" && onChange !== undefined) ||
      (typeof getValue !== "function" && getValue !== undefined)
    ) {
      throw Error("Error creating value");
    }
    this.tag = tag;
    this.val = value;
    this.onChange =
      onChange ||
      ((val) => {
        this.val = val;
      });
    this.getValue = getValue;
  }
}

export default class EventsManager {
  _regEvents = {};

  _parent;

  constructor(def, parent) {
    if (def) {
      this.registerEvent("onClick", { tag: "system" });
      this.registerEvent("onRightClick", { tag: "system" });
      this.registerEvent("onGameStart", { tag: "system" });
      this.registerEvent("onRemove", { tag: "system" });
      this.registerEvent("onCollision", { tag: "system" });
      this.registerEvent("onMove", { tag: "system" });
      this.registerEvent("onEachFrame", { tag: "system" });
    }
    this._parent = parent;
  }

  registerEvent(name, { tag = "user", code = {} }) {
    this._regEvents[name] = new Event({
      tag: tag,
      value: code,
    });
  }

  getEvents() {
    return this._regEvents;
  }

  getEvent(ev) {
    const event = this._regEvents[ev];
    if (!event) {
      // log.logError('Couldn\'t get event '+ev+' because it doesn\'t exists');
      return;
    }
    if (event.getValue) return event.getValue();

    return event.val;
  }

  setEvent(ev, code) {
    const event = this._regEvents[ev];
    if (!event) {
      this.registerEvent(ev, code);
      return;
    }
    event.val = code;
    if (event.onChange) event.onChange(code);
  }

  removeEvent(ev) {
    if (!this._regEvents[ev]) return;
    delete this._regEvents[ev];
  }

  triggerEvent(ev) {
    if (!this._regEvents[ev] || !this._regEvents[ev].val) return;

    Engine.ScriptingManager.executeCode(this.getEvent(ev), this._parent);
  }

  getEventTag(ev) {
    if (!this._regEvents[ev])
      throw Error("get tag from a not registered event");
    return this._regEvents[ev].tag;
  }
}
