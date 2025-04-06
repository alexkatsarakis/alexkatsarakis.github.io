import serverCommuncator from "../../utils/serverCommunication.js";
import httpRequest from "../../utils/httpRequest.js";

import Engine from "../../Engine.js";

import Manager from "../Manager.js";

import utils from "../../utils/utils.js";

export default class SaveManager extends Manager {
  _DBName = "superMarioReal";
  _loadRemote = false;

  _localState = "./assets/json/savedState.json";
  _localPreSettedAnim = "./assets/json/AnimationManager.json";
  _localAnimationFilms = "./assets/json/AnimationFilmHolder.json";

  constructor() {
    super();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const gameName = urlParams.get("game");
    if (gameName) {
      this._DBName = gameName;
      this._localState = `./assets/json/${gameName}.json`;
    }
  }

  getPreSettedAnim(url) {
    return new Promise((resolve, reject) => {
      httpRequest("GET", url, null).then((resp) => {
        resolve(JSON.parse(resp));
      });
    });
  }

  getAnimationFilms(url) {
    return new Promise((resolve, reject) => {
      httpRequest("GET", url, null).then((resp) => {
        resolve(JSON.parse(resp));
      });
    });
  }

  getObjects() {
    if (this._loadRemote) return this.getObjectsDB();
    return this.getObjectsLocal();
  }

  getObjectsLocal() {
    return new Promise((resolve, reject) => {
      if (this._localState !== `./assets/json/local.json`)
        httpRequest("GET", this._localState, null).then((resp) => {
          let res;
          try {
            res = JSON.parse(resp);
          } catch (err) {
            res = [];
          }
          resolve(res);
        });
      else {
        const game = localStorage.getItem("saved");
        if (!game) {
          httpRequest("GET", "./assets/json/savedState.json", null).then(
            (resp) => {
              let res;
              try {
                res = JSON.parse(resp);
              } catch (err) {
                res = [];
              }
              resolve(res);
            }
          );
        } else {
          resolve(JSON.parse(game));
        }
      }
    });
  }

  getObjectsDB() {
    serverCommuncator.tableName = this._DBName;
    return new Promise((resolve, reject) => {
      serverCommuncator.getTable(serverCommuncator.tableName, (res) => {
        if (res !== "") {
          res = JSON.parse(res);
          res.forEach((element) => {
            element.objectInfo = element.objectInfo
              .replace(/'/g, '"')
              .replace(/~/g, "'");
            element.objectInfo = JSON.parse(element.objectInfo);
          });
          res = res.map((item) => item.objectInfo);
          resolve(res);
        } else {
          resolve([]);
        }
      });
    });
  }

  saveObjectsDB() {
    const tableName = serverCommuncator.tableName;
    const objects = Engine.ObjectManager.objects;

    console.log(objects);

    serverCommuncator.clearTable(tableName).then(() => {
      for (let i in objects) {
        const obj = objects[i];
        for (let i in obj.getValues()) {
          obj.setValue(i, obj.getValue(i));
        }

        serverCommuncator.updateItemToTable(
          tableName,
          {
            key: "id",
            value: '"' + i + '"',
          },
          [
            {
              name: "id",
              type: "TEXT",
              value: obj.id,
            },
            {
              name: "objectInfo",
              type: "TEXT",
              value: obj.toString().replace(/'/g, "~").replace(/"/g, "'"),
            },
          ]
        );
      }
    });
  }

  saveObjectsLocal() {
    const liveObj = Engine.ObjectManager.objects;
    const toSave = {};
    for (let i in liveObj) {
      toSave[i] = JSON.parse(liveObj[i].toString());
    }

    return toSave;
  }

  saveObjects() {
    if (this._loadRemote) return this.saveObjectsDB();
    return this.saveObjectsLocal();
  }

  getSavedAnimations() {
    return new Promise((resolve, reject) => {
      httpRequest("GET", this._localState, null).then((resp) => {
        const res = JSON.parse(resp);
        const arr = [];

        for (let i in res) {
          arr.push(res[i]);
        }
        resolve(arr);
      });
    });
  }

  async getGame() {
    const gameInfo = await this.getObjects();
    const all = {
      objects: gameInfo.objects,
      films: [],
      preSet: [],
      extra: gameInfo.info.extra || [],
    };

    const films = gameInfo.info.films;
    for (let i in films) {
      const f = await this.getAnimationFilms(films[i]);
      all.films.push(f);
    }

    const preSet = gameInfo.info.preSet;
    for (let i in preSet) {
      const f = await this.getPreSettedAnim(preSet[i]);
      all.preSet.push(f);
    }

    return all;
  }

  saveGame() {
    const toSave = {};
    toSave.objects = this.saveObjects();
    toSave.info = {
      name: this._DBName,
      preSet: [this._localPreSettedAnim],
      films: [this._localAnimationFilms],
      extra: {},
    };
    Engine.forEachManager((name, manager) => {
      const temp = manager.onSave();
      if (temp) toSave.info.extra[name] = temp;
    });

    var textFileAsBlob = new Blob([JSON.stringify(toSave)], {
      type: "application/json",
    });
    var downloadLink = document.createElement("a");
    downloadLink.download = "savedState.json";
    if (window.webkitURL != null) {
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }

  saveToLocal() {
    const toSave = {};
    toSave.objects = this.saveObjects();
    toSave.info = {
      name: this._DBName,
      preSet: [this._localPreSettedAnim],
      films: [this._localAnimationFilms],
      extra: {},
    };
    Engine.forEachManager((name, manager) => {
      const temp = manager.onSave();
      if (temp) toSave.info.extra[name] = temp;
    });
    console.log(toSave);
    localStorage.setItem("saved", JSON.stringify(toSave));
  }

  async setEngine(callback) {
    const game = await this.getGame();

    Engine.app.addLoadFunction(() => {
      for (let i in game.objects) {
        utils.createObject(game.objects[i]);
      }
    });

    game.films.forEach((film) => {
      Engine.AnimationManager.setAnimationFilms(film);
    });

    game.preSet.forEach((preSet) => {
      Engine.AnimationManager.setAnimationManagement(preSet);
    });

    Engine.forEachManager((name, manager) => {
      if (game.extra[name]) manager.onRetrieve(game.extra[name]);
    });

    if (game.films.length === 0) {
      Engine.AnimationManager.setAnimationFilms(this._localAnimationFilms);
      Engine.AnimationManager.setAnimationManagement(this._localPreSettedAnim);
    }

    callback();
  }
}
