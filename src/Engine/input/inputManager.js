import Manager from "../Manager.js";

const InputState = {
  TRIGGERED: "TRIGGERED",
  TOTRIGGER: "TOTRIGGER",
  FOREVER: "FOREVER",
};

class InputManager extends Manager {
  currentlyPressed = {};
  releasedKeys = [];
  onKeyPress = {};
  onKeyRelease = {};

  // DEFAULTS
  keyCombos = {
    "Copy Object": ["ControlLeft", "KeyC"],
    "Paste Object": ["ControlLeft", "KeyV"],
    "Save(locally)": ["ControlLeft", "KeyS"],
    "Pause/Resume Toggle": ["KeyP"],
    dummyAction: ["ControlLeft", "KeyB"],
  };

  addOnKeyPress(cb) {
    const num = Math.floor(Math.random() * 10000);
    this.onKeyPress[num] = cb;
    return num;
  }

  removeOnKeyPress(id) {
    if (!this.onKeyPress[id]) return; //TODO;

    delete this.onKeyPress[id];
  }

  addOnKeyRelease(cb) {
    const num = Math.floor(Math.random() * 10000);
    this.onKeyRelease[num] = cb;
    return num;
  }

  removeOnKeyRelease(id) {
    if (!this.onKeyRelease[id]) return; //TODO;

    delete this.onKeyRelease[id];
  }

  onSave() {
    return JSON.stringify(this.keyCombos);
  }

  onRetrieve(info) {
    const savedKeyCombos = JSON.parse(info);
    for (let i in savedKeyCombos) {
      this.keyCombos[i] = savedKeyCombos[i];
    }
  }

  setCombo(comboID, arr) {
    this.keyCombos[comboID] = arr;
  }

  getCombo(comboID) {
    return this.keyCombos[comboID];
  }

  getCombos() {
    return Object.keys(this.keyCombos);
  }

  constructor() {
    super();
  }

  isCurrentlyPressed(key) {
    return this.currentlyPressed[key] !== undefined; // This is on purpose because it will go into if even if it's another value
  }

  keyPressed(key, forever) {
    if (forever) this.currentlyPressed[key] = InputState.FOREVER;
    else this.currentlyPressed[key] = InputState.TOTRIGGER;

    for (let i in this.onKeyPress) {
      this.onKeyPress[i](key);
    }

    let hasTriggeredCombo = false;
    for (let combo in this.keyCombos) {
      let isCombo = true;
      const keysForCombo = this.keyCombos[combo];
      for (let key in keysForCombo) {
        if (!this.currentlyPressed[keysForCombo[key]]) isCombo = false;
      }
      if (isCombo === true) {
        /// === true so it doesn't try to convert isCombo from bool
        this.currentlyPressed[combo] = InputState.TOTRIGGER;
        hasTriggeredCombo = true;
      }
    }

    return hasTriggeredCombo;
  }

  keyReleased(key) {
    delete this.currentlyPressed[key];
    this.releasedKeys.push(key);

    for (let i in this.onKeyRelease) {
      this.onKeyRelease[i](key);
    }
    // logManager.logAction(`Released Key ${key}`);
  }

  getReleasedKeys() {
    const toReturn = this.releasedKeys;
    this.releasedKeys = [];
    return toReturn;
  }

  getPressedKeys() {
    this.pollKeys();
    let keysPressed = [];
    for (let i in this.currentlyPressed) {
      const currP = this.currentlyPressed[i];
      if (currP === InputState.TOTRIGGER || currP === InputState.FOREVER) {
        keysPressed.push(i);
      }

      if (currP === InputState.TOTRIGGER) {
        this.currentlyPressed[i] = InputState.TRIGGERED;
      }
    }
    return keysPressed;
  }

  addCombo(id, keys) {
    this.keyCombos[id] = keys;
  }

  removeCombo(id) {
    if (!this.keyCombos[id])
      throw Error("Tried to remove a combo that doesn't exists");
    delete this.keyCombos[id];
  }

  isPressed(key) {
    for (let i in this.currentlyPressed) {
      if (i === key) return true;
    }
    return false;
  }

  pollKeys() {
    gamep.updateStatus();
  }
}

const inputManager = new InputManager();

let haveEvents = "ongamepadconnected" in window;
class GamepadController {
  _gamepad;
  constructor() {}
  addGamepad(gamepad) {
    this._gamepad = gamepad;
  }

  removeGamepad(e) {
    this._gamepad = undefined;
  }

  scangamepads() {
    var gamepads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads()
      : [];

    if (gamepads[0]) {
      this._gamepad = gamepads[0];
    }
  }

  updateStatus() {
    if (!this._gamepad) return;
    if (!haveEvents) {
      this.scangamepads();
    }
    var controller = this._gamepad;

    const keyMap = {
      0: "KeyW",
      // 13: 'KeyS',
      // 14: 'KeyA',
      // 15: 'KeyD',
      100: "KeyD",
      102: "KeyS",
      104: "KeyA",
      // 106: 'KeyW',
    };

    const arePressed = {};

    for (let i in keyMap) {
      arePressed[i] = false;
    }

    for (let i = 0; i < controller.buttons.length; i++) {
      var val = controller.buttons[i];
      var pressed = false;
      if (typeof val == "object") {
        pressed = val.pressed;
      }

      // if(controller.vibrationActuator)
      //     controller.vibrationActuator.playEffect("dual-rumble", {
      //     startDelay: 0,
      //     duration: 50,
      //     weakMagnitude: 0.5,
      //     strongMagnitude: 1.0
      // });
      if (pressed) {
        // console.log(i);
        arePressed[i] = true;
      }
    }
    for (let i = 0; i < controller.axes.length; i++) {
      const index = 100 + i;
      if (controller.axes[i] > 0.5) {
        arePressed[index + i] = true;
      } else if (controller.axes[i] < -0.5) {
        arePressed[index + i + 4] = true;
      }
    }

    Object.keys(arePressed).forEach((val) => {
      if (arePressed[val] === true) {
        if (!inputManager.isPressed(keyMap[val])) {
          inputManager.keyPressed(keyMap[val]);
        }
      } else {
        if (inputManager.isPressed(keyMap[val])) {
          inputManager.keyReleased(keyMap[val]);
        }
      }
    });
  }
}

let gamep = new GamepadController();

document.onkeydown = (ev) => {
  if (
    ev.target.type === "text" ||
    ev.target.type === "textarea" ||
    ev.target.tagName === "svg"
  )
    return;
  if (!inputManager.isPressed(ev.code))
    if (inputManager.keyPressed(ev.code)) ev.preventDefault();
};
document.onkeyup = (ev) => {
  if (inputManager.isPressed(ev.code)) inputManager.keyReleased(ev.code);
};
window.addEventListener("gamepadconnected", (e) => gamep.addGamepad(e.gamepad));
window.addEventListener("gamepaddisconnected", (e) =>
  gamep.removeGamepad(e.gamepad)
);

export default inputManager;
