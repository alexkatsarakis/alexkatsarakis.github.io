import collisionHolder from "../../Engine/collisions/collisionHolder.js";

class Collision {
  _obj1;
  _obj2;
  _code;

  constructor({ obj1ID, obj2ID, code }) {
    this._obj1 = obj1ID;
    this._obj2 = obj2ID;
    this._code = code;
  }
}

export default class CollisionManager {
  _regCollisions = {};

  _parent;

  constructor(parent) {
    this._parent = parent;
  }

  registerCollision(colObjName) {
    this._regCollisions[colObjName] = new Collision({
      obj1ID: this._parent.name,
      obj2ID: colObjName,
      code: { text: "", code: "" },
    });
    collisionHolder.installCollision(this._parent.name, colObjName, {
      text: "",
      code: "",
    });
  }

  setCollision(colName, code) {
    if (!this._regCollisions[colName])
      throw Error("setting a collision that is't registered");

    this._regCollisions[colName].code = code;
    collisionHolder.setCollision(this._parent.name, colName, code);
  }

  getCollision(colName) {
    return this._regCollisions[colName];
  }

  getCollisions() {
    return this._regCollisions;
  }

  getCollisionCode(colName) {
    return this._regCollisions[colName].code;
  }

  removeCollision(colName) {
    if (!this._regCollisions[colName])
      throw Error("trying to remove a collision that doesn't exist");

    delete this._regCollisions[colName];
    collisionHolder.removeCollision(this._parent.name, colName);
  }
}
