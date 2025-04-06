class CollisionHolder {
  _collisionReactions = {};

  constructor() {}

  updateObjectName(objName, newName) {
    for (let i in this._collisionReactions) {
      const split = i.split("_");
      const obj1Name = split[0];
      const obj2Name = split[1];
      // console.log(this._collisionReactions[i]);
      if (obj1Name === objName) {
        this._collisionReactions[`${newName}_${obj2Name}`] =
          this._collisionReactions[i];
        delete this._collisionReactions[i];
      } else if (obj2Name === objName) {
        this._collisionReactions[`${obj1Name}_${newName}`] =
          this._collisionReactions[i];
        delete this._collisionReactions[i];
      }
    }
  }

  installCollision(first, second, code) {
    if (
      this._collisionReactions[`${first}_${second}`] ||
      this._collisionReactions[`${second}_${first}`]
    )
      return false;
    this._collisionReactions[`${first}_${second}`] = code || {
      text: "",
      code: "",
    };
    return true;
  }

  getAllCollisions() {
    let toReturn = {};
    for (let i in this._collisionReactions) {
      const split = i.split("_");
      const obj1Name = split[0];
      const obj2Name = split[1];
      if (!toReturn[obj1Name]) {
        toReturn[obj1Name] = [];
      }
      toReturn[obj1Name][obj2Name] = { code: this._collisionReactions[i] };

      if (!toReturn[obj2Name]) {
        toReturn[obj2Name] = [];
      }
      toReturn[obj2Name][obj1Name] = { code: this._collisionReactions[i] };
    }
    return toReturn;
  }

  getCollisions(objId) {
    let toReturn = [];
    for (let i in this._collisionReactions) {
      const split = i.split("_");
      const obj1Name = split[0];
      const obj2Name = split[1];
      if (obj1Name === objId) {
        toReturn.push({
          collisionWith: obj2Name,
          code: this._collisionReactions[i],
        });
      } else if (obj2Name === objId) {
        toReturn.push({
          collisionWith: obj1Name,
          code: this._collisionReactions[i],
        });
      }
    }
    return toReturn;
  }

  getCollision(first, second) {
    if (!this._collisionReactions[`${first}_${second}`]) {
      return "";
    } else {
      return this._collisionReactions[`${first}_${second}`];
    }
  }

  setCollision(first, second, code) {
    if (!code) return false;
    const combined = `${first}_${second}`;
    const combinedRev = `${second}_${first}`;
    if (this._collisionReactions[combinedRev] !== undefined)
      delete this._collisionReactions[combinedRev];
    this._collisionReactions[combined] = code;
  }

  removeCollision(first, second) {
    const combined = `${first}_${second}`;
    const combinedRev = `${second}_${first}`;
    if (this._collisionReactions[combined] !== undefined)
      delete this._collisionReactions[combined];
    else if (this._collisionReactions[combinedRev] !== undefined)
      delete this._collisionReactions[combinedRev];
  }

  collided(obj1, obj2) {
    if (obj1 === obj2) return false;
    if (!obj1.getOption("isCollidable") || !obj2.getOption("isCollidable"))
      return;
    const pos1 = obj1.getPositional();
    const pos2 = obj2.getPositional();
    if (pos1.x >= pos2.x + pos2.width || pos2.x >= pos1.x + pos1.width) {
      return false;
    }

    if (pos1.y >= pos2.y + pos2.height || pos2.y >= pos1.y + pos1.height) {
      return false;
    }

    return true;
  }

  checkAndInvoke(aliveItems, exec) {
    // THIS IS EXPENSIVE but checks everything
    // for(let i in aliveItems){
    //     for(let j in aliveItems){
    //         if(this.collided(aliveItems[i],aliveItems[j])){
    //             // aliveItems[i].triggerEvent('onCollision');
    //             console.log(aliveItems[i].name,aliveItems[j].name);
    //             if(this._collisionReactions[`${aliveItems[i].name}_${aliveItems[j].name}`]){
    //                 console.log(`${aliveItems[i].name}_${aliveItems[j].name}`)
    //                 this._codeRunner(this._collisionReactions[`${aliveItems[i].name}_${aliveItems[j].name}`]);
    //             }
    //         }
    //     }
    // }

    let nameTranslator = {};

    for (let i in aliveItems) {
      nameTranslator[aliveItems[i].name] = aliveItems[i];
    }

    for (let i in this._collisionReactions) {
      const split = i.split("_");
      const obj1Name = split[0];
      const obj2Name = split[1];
      if (!nameTranslator[obj1Name] || !nameTranslator[obj2Name]) continue;
      if (this.collided(nameTranslator[obj1Name], nameTranslator[obj2Name])) {
        // aliveItems[obj1Name].triggerEvent('onCollision');
        if (this._collisionReactions[i]) {
          exec(this._collisionReactions[i], nameTranslator[obj1Name].id);
        }
      }
    }
  }
}

const collisionHolder = new CollisionHolder();

export default collisionHolder;
