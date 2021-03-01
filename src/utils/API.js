import bb from './blackboard.js'

import logManager from './logs.js'

import Engine from '../Engine.js'
import objectManager from '../Engine/renderer/ObjectManager.js';

function AK() {
    
}

AK.prototype.getObject = (objName)=>{
    return Engine.ObjectManager.getObjectByName(objName);
}

AK.prototype.getObjectByID = (objID)=>{
    return Engine.ObjectManager.getObject(objID);
}

AK.prototype.getAttribute = (obj,fieldName)=>{
    return obj.getValue(fieldName);
}

AK.prototype.setAttribute = (obj,fieldName, newValue)=>{
    return obj.setValue(fieldName, newValue);
}

AK.prototype.getCurrentState = (obj)=>{
    return obj.getCurrentState();
}

AK.prototype.getEvents = (obj)=>{
    return obj.getEvents();
}

AK.prototype.getFlags = (obj)=>{
    return obj.getFlags();
}

AK.prototype.setFlag = (obj, flag, value) => {
    obj.setOption(flag, value);
}

AK.prototype.setAttribute = (obj, attr, value) => {
    obj.setValue(attr, value);
}

AK.prototype.setCurrentState = (obj, newState) => {
    obj.setCurrentState(newState);
}

AK.prototype.triggerEvent = (obj,eventName)=>{
    try{
        obj.triggerEvent(eventName);
    }catch(e){
        logManager.logError(e);   
    }
}

///////////ACTIONS/////////////////

AK.prototype.removeObject = (obj)=>{
    bb.fastGet('actions','removeObject')(obj);
}

AK.prototype.renameObject = (obj, newName)=>{
    bb.fastGet('actions','renameObject')(obj,newName);
}

AK.prototype.createObject = ({category, name, x, y})=>{
    bb.fastGet('actions','createObject')({
        'category': category,
        'name': name,
        'position':{
            'x': x,
            'y': y
        } 
    });
}

AK.prototype.playAnimation = ({object, anim, onStart, onFinish})=>{
    bb.fastGet('actions','playAnimation')(
        {
           object: object,
           anim: anim,
           onStart: onStart,
           onFinish: onFinish 
        });
}

AK.prototype.moveObject = (obj,x,y)=>{
    bb.fastGet('actions','move')(obj,x,y);
}

AK.prototype.log = (whatever)=>{
    logManager.logAction(whatever);
}

///////////////////SOUND/////////////////////
AK.prototype.addSound = (id,url)=>{
    Engine.SoundManager.addSound(id,url);
}

AK.prototype.removeSound = (id,url)=>{
    Engine.SoundManager.removeSound(id, url);
}

AK.prototype.playSound = (id)=>{    
    Engine.SoundManager.playSound(id);
}

AK.prototype.stopSound = (id)=>{
    Engine.SoundManager.stopSound(id);
}

AK.prototype.playBackground = (id)=>{
    Engine.SoundManager.playSoundOnRepeat(id);
}

AK.prototype.stopBackground = (id)=>{
    Engine.SoundManager.stopSoundOnRepeat(id);
}

AK.prototype.stopAllSounds = ()=>{
    Engine.SoundManager.stopAllSounds();
}


//////////////////////////////////////////////
// AK.prototype.consoleLog = (t)=>{
//     console.log(t);
// }


const ak = new AK();

export default ak;