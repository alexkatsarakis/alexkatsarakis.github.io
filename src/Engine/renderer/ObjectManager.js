import envObj from './EnvironmentObject.js'
import keyObj from './KeyboardObject.js'
import ODomManager from './dom/renderer.js'
import O454Manager from './454GameEngine/renderer.js'

import changeFocus from '../../utils/focusedObject.js'

import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

import Manager from '../Manager.js'

class ObjectManager extends Manager{
    _objects
    _objectByName
    _constructors
    _systemObjects
    _renderManagers

    constructor() {
        super();
        this._constructors = {};
        this._objects = {}; 
        this._objectByName = {};
        this._systemObjects = [];
        this._renderManagers = [];
    }

    addRenderManager(manager){
        this._renderManagers.push(manager);
    }

    getRenderManagers(){
        return this._renderManagers;
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
        if(bb.fastGet('state','mode') !== 'paused'){
            const ev = {
                type: 'addObject',
                objectID: obj.id,
                data: {
                    object: JSON.parse(obj.toString())
                }
            };
            bb.fastSet('events','last',ev);
            bb.fastSet('events','addObject',ev);
        }
    }

    removeFromWorld(obj){
        if(!this._objects[obj.id])return;
        delete this._objects[obj.id];
        delete this._objectByName[obj.name];
        if(bb.fastGet('state','mode') !== 'paused'){
            const ev = {
                type: 'removeObject',
                objectID: obj.id,
                data: {
                    object: obj
                }
            };
            bb.fastSet('events','last',ev);
            bb.fastSet('events','removeObject',ev);
        }
    }

    get objects(){
        return this._objects;
    }

    rename(obj,newName){
        if(this._objectByName[newName] || !this._objects[obj.id])return;
        Engine.CollisionManager.updateObjectName(obj.name,newName);
        obj.name = newName;
        this._objectByName[newName] = obj;
    }

    getObject(i){
        return this._objects[i];
    }

    getObjectByName(i){
        return this._objectByName[i];
    }

    renderAll(){
        this._renderManagers.forEach(manager => {
            manager.render();
        })
    }

    addSystemObject(objID){
        const index = this._systemObjects.indexOf(objID);
        if(index !== -1) throw Error('trying to add a system object that is already registered');
        this._systemObjects.push(objID);
    }

    isSystemObject(objID){
        const index = this._systemObjects.indexOf(objID);
        return (index > -1);
    }
}

const objectManager = new ObjectManager();

export default objectManager;

const _454Const = O454Manager.constructors;

for(let i in _454Const){
    objectManager.addConstructor(i,_454Const[i]);
}

const domConst = ODomManager.constructors;

for(let i in domConst){
    objectManager.addConstructor(i,domConst[i]);
}

objectManager.addRenderManager(O454Manager);
objectManager.addRenderManager(ODomManager);

objectManager.addToWorld(envObj);
objectManager.addToWorld(keyObj);

objectManager.addSystemObject(envObj.id);
objectManager.addSystemObject(keyObj.id);

const clickWrapper = document.createElement('div');
    clickWrapper.id = "clickWrapper";
    clickWrapper.style.width = '100vw';
    clickWrapper.style.height = '100vh';
    clickWrapper.style.opacity = 0;
    clickWrapper.style.position = 'absolute';
    clickWrapper.style.top = 0;
    clickWrapper.style.left = 0;
    document.body.appendChild(clickWrapper);

const managers = objectManager.getRenderManagers();
clickWrapper.onclick = (ev)=>{
    const objects = objectManager.objects;
    for(let i in objects){
        const obj = objects[i];
        if(obj.div){
            obj.div.style.zIndex = '0';
        }
    }
    window.focus();
    for(let i in managers){
        if(managers[i].mouseEvents.leftClick){
            const obj = managers[i].mouseEvents.leftClick(ev);
            if(obj){
                changeFocus(obj.id);
                obj.triggerEvent('onClick');
                return;
            }
        }
    }
    changeFocus(undefined);
};

clickWrapper.ontouchstart = (ev)=>{
    ev.offsetX = ev.touches[0].clientX;
    ev.offsetY = ev.touches[0].clientY;
    for(let i in managers){
        if(managers[i].mouseEvents.mouseDown){
            const obj = managers[i].mouseEvents.mouseDown(ev);
            if(obj)return;
        }
    }
}

clickWrapper.onmousedown = (ev)=>{
    for(let i in managers){
        if(managers[i].mouseEvents.mouseDown){
            const obj = managers[i].mouseEvents.mouseDown(ev);
            if(obj)return;
        }
    }
};

clickWrapper.oncontextmenu = (ev) => {
    for(let i in managers){
        if(managers[i].mouseEvents.rightClick){
            const obj = managers[i].mouseEvents.rightClick(ev);
            if(obj){
                obj.triggerEvent('onRightClick');
                bb.fastSet('events','contextMenu',{objID: obj.id,event: ev});
                return;
            }
        }
    }
    bb.fastSet('events','contextMenu',{objID: envObj.id,event: ev});
};