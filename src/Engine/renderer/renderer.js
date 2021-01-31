import bb from '../../utils/blackboard.js'


class ObjectManager {
    _objects
    _objectByName
    _constructors

    constructor() {
        this._constructors = {};
        this._objects = {}; 
        this._objectByName = {};
    }

    addConstructor(name,cons){
        this._constructors[name] = cons;
    }

    removeConstructor(name){
        if(this._constructors[name])
            delete this._constructors[name];
    }

    getConstructor(name){
        return this._constructors[name];
    }

    get constr(){
        return this._constructors;
    }

    addToWorld(obj) {
        if(this._objects[obj.id] || this._objectByName[obj.name])return;
        this._objects[obj.id] = obj;
        this._objectByName[obj.name] = obj;
    }

    removeFromWorld(obj){
        if(!this._objects[obj.id])return;
        delete this._objects[obj.id];
        delete this._objectByName[obj.name];
    }

    get objects(){
        return this._objects;
    }

    rename(obj,newName){
        if(this._objectByName[newName] || !this._objects[obj.id])return;
        obj.name = newName;
        this._objectByName[newName] = obj;
    }

    getObject(i){
        return this._objects[i];
    }

    getObjectByName(i){
        return this._objectByName[i];
    }
}

const objectManager = new ObjectManager();

export default objectManager;

import envObj from './EnvironmentObject.js'
import colObj from './CollisionsObject.js'
import domConst from './dom/renderer.js'
import _454Const from './454GameEngine/renderer.js'

for(let i in _454Const){
    objectManager.addConstructor(i,_454Const[i]);
}

for(let i in domConst){
    objectManager.addConstructor(i,domConst[i]);
}

objectManager.addToWorld(envObj);
objectManager.addToWorld(colObj);

bb.fastInstall('state', 'systemObjects', [envObj.name,colObj.name]);



import changeFocus from '../../transitionHandlers/focusedObject.js'
let clickWrapper = document.createElement('div');
    clickWrapper.id = "clickWrapper";
    clickWrapper.style.width = '100vw';
    clickWrapper.style.height = '100vh';
    clickWrapper.style.opacity = 0;
    clickWrapper.style.position = 'absolute';
    clickWrapper.style.top = 0;
    clickWrapper.style.left = 0;
    document.body.appendChild(clickWrapper);


let funcsLC = bb.fastGet('renderer','leftClick');
clickWrapper.addEventListener('click',(ev)=>{
    let anythingFocused = false;
    for(var f in funcsLC){
        anythingFocused = funcsLC[f](ev);
        if(anythingFocused)break;
    }
    if(!anythingFocused)changeFocus(undefined);
});

let funcsMD = bb.fastGet('renderer','mouseDown');
clickWrapper.addEventListener('mousedown',(ev)=>{
    for(var f in funcsMD){
        if(funcsMD[f](ev))break;
    }
});

let funcsRC = bb.fastGet('renderer','rightClick');
clickWrapper.addEventListener('contextmenu',(ev) => {
    for(var f in funcsRC){
        if(funcsRC[f](ev))break;
    }
})