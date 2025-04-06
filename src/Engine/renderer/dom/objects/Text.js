import Object from "./ObjectDom.js";

import scene from "./Scene.js";

export default class Text extends Object {
  _fontSize;

  constructor({ name, texture, dim, defaultText, div }, id) {
    super(name, id, { div, texture, dim, defaultText });

    this.data.valueHandler.registerValue("text", {
      tag: "x",
      onChange: (value) => (this.div.innerHTML = value),
      getValue: () => {
        return this.div.innerHTML;
      },
    });

    this.data.valueHandler.registerValue("color", {
      tag: "texture",
      onChange: (value) => (this.div.style.color = value),
      getValue: () => {
        return this.div.style.color;
      },
    });

    this.data.valueHandler.registerValue("bold", {
      tag: "x",
      value: false,
      onChange: (newVal) =>
        (this.div.style.fontWeight = newVal ? "bold" : "normal"),
    });

    this.data.valueHandler.registerValue("font", {
      tag: "appearance",
      onChange: (value) => {
        this.div.style.fontFamily = value;
      },
      getValue: () => {
        return this.div.style.fontFamily;
      },
    });

    this.data.valueHandler.registerValue("fontSize", {
      tag: "appearance",
      onChange: (value) => {
        this._fontSize = value;
        this.div.style.fontSize = value / scene._aspectRatio + "px";
      },
      getValue: () => {
        return this._fontSize;
      },
    });

    this._category = "Text";
  }

  createElement({ name, texture, dim, defaultText }) {
    this.div = document.createElement("div");
    this.div.id = name;
    if (!dim) {
      this.div.style.width = "100px";
      this.div.style.height = "100px";
    }
    this.div.innerHTML = defaultText || name;
    this.div.style.position = "absolute";
    this.div.style.fontSize = "16px";
    this.div.style.textShadow = "1px 1px 0 #444";
  }
}
