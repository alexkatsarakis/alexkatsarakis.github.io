import bb from "./blackboard.js";

import logManager from "./logs.js";

import Engine from "../Engine.js";

function AK() {}

AK.prototype.getObject = (objName) => {
  return Engine.ObjectManager.getObjectByName(objName);
};

AK.prototype.getObjectByID = (objID) => {
  return Engine.ObjectManager.getObject(objID);
};

AK.prototype.getAttribute = (obj, fieldName) => {
  return obj.getValue(fieldName);
};

AK.prototype.setAttribute = (obj, fieldName, newValue, extra) => {
  return obj.setValue(fieldName, newValue, extra);
};

AK.prototype.getCurrentState = (obj) => {
  return obj.getCurrentState();
};

AK.prototype.getEvents = (obj) => {
  return obj.getEvents();
};

AK.prototype.getFlags = (obj) => {
  return obj.getFlags();
};

AK.prototype.setFlag = (obj, flag, value) => {
  obj.setOption(flag, value);
};

AK.prototype.setCurrentState = (obj, newState) => {
  obj.setCurrentState(newState);
};

AK.prototype.triggerEvent = (obj, eventName) => {
  try {
    obj.triggerEvent(eventName);
  } catch (e) {
    logManager.logError(e);
  }
};

///////////ACTIONS/////////////////

AK.prototype.removeObject = (obj) => {
  bb.fastGet("actions", "removeObject")(obj);
};

AK.prototype.renameObject = (obj, newName) => {
  bb.fastGet("actions", "renameObject")(obj, newName);
};

AK.prototype.createObject = ({ category, name, x, y }) => {
  bb.fastGet(
    "actions",
    "createObject"
  )({
    category: category,
    name: name,
    position: {
      x: x,
      y: y,
    },
  });
};

AK.prototype.playAnimation = ({ object, anim, onStart, onFinish }) => {
  bb.fastGet(
    "actions",
    "playAnimation"
  )({
    object: object,
    anim: anim,
    onStart: onStart,
    onFinish: onFinish,
  });
};

AK.prototype.stopAnimation = (obj) => {
  obj.destroyAnimator();
};

AK.prototype.moveObject = (obj, x, y) => {
  bb.fastGet("actions", "move")(obj, x, y);
};

AK.prototype.log = (whatever) => {
  logManager.logAction(whatever);
};

///////////////////SOUND/////////////////////
AK.prototype.addSound = (id, url) => {
  Engine.SoundManager.addSound(id, url);
};

AK.prototype.removeSound = (id, url) => {
  Engine.SoundManager.removeSound(id, url);
};

AK.prototype.playSound = (id) => {
  Engine.SoundManager.playSound(id);
};

AK.prototype.stopSound = (id) => {
  Engine.SoundManager.stopSound(id);
};

AK.prototype.playBackground = (id) => {
  Engine.SoundManager.playSoundOnRepeat(id);
};

AK.prototype.stopBackground = (id) => {
  Engine.SoundManager.stopSoundOnRepeat(id);
};

AK.prototype.stopAllSounds = () => {
  Engine.SoundManager.stopAllSounds();
};

/////////////MOVE///////////////
AK.prototype.moveBy = (obj, x, y) => {
  obj.setValue("x", obj.getValue("x") + x);
  obj.setValue("y", obj.getValue("y") + y);
};

AK.prototype.moveTo = (obj, x, y) => {
  obj.setValue("x", x);
  obj.setValue("y", y);
};

AK.prototype.moveByInMSeconds = (obj, x, y, delay) => {
  Engine.QuantizerManager.move(obj, x, y, delay);
};

AK.prototype.moveToInMSeconds = (obj, x, y, delay) => {
  Engine.QuantizerManager.moveTo(obj, x, y, delay);
};
////////////DISTANCE////////////
AK.prototype.distanceObjects = (obj1, obj2) => {
  return Engine.DistanceManager.distanceObject(obj1, obj2);
};

AK.prototype.distanceTwoPoints = (p1, p2) => {
  return Engine.DistanceManager.distanceTwoPoints(p1, p2);
};

AK.prototype.getObjectCenter = (obj1) => {
  return Engine.DistanceManager.getObjectCenter(obj1);
};

AK.prototype.isSolidBelow = (obj) => {
  if (!Engine.hasManager("GridManager")) return false;
  const pos = obj.getPositional();
  const w = pos.x + pos.width;
  const h = pos.y + pos.height;

  for (let i = pos.x + 1; i < w; ++i) {
    if (Engine.GridManager.isPointInGrid(i, h + 1)) return true;
  }

  return false;
};

/////////////CLONES/////////////

///////////RANDOM///////////////

//////////TIMER////////////////

AK.prototype.callIn = (cb, args, delay) => {
  return Engine.ClockManager.callIn(cb, args, delay);
};

// AK.runAfterOnce(code, delay)
// AK.runAfterRepeat(code, delay)
// AK.stopRepeat(code, delay)

//////////////////////////////////////////////
// AK.prototype.consoleLog = (t)=>{
//     console.log(t);
// }

/////////////KEYS///////////////
AK.prototype.isKeyPressed = (key) => {
  if (isNaN(key)) {
    key = "Key" + key;
  } else {
    key = "Digit" + key;
  }
  return Engine.InputManager.isCurrentlyPressed(key);
};

////////////COPY//////////////
AK.prototype.copyObject = (obj) => {
  Engine.ClipboardManager.copy(obj, false);
  return Engine.ClipboardManager.paste();
};

const ak = new AK();

export default ak;
