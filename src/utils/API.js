import bb from './blackboard.js'

import logManager from './logs.js'

function AK() {
    
}

AK.prototype.getObject = (objName)=>{
    throw Error('TODO');
    // return bb.fastGet('liveObjects',objName);
}

AK.prototype.getField = (obj,fieldName)=>{
    return obj.getValue(fieldName);
}

AK.prototype.changeColor = (obj,color)=>{
    bb.fastGet('actions','changeColor')(obj,color);
}

AK.prototype.move = (obj,x,y)=>{
    bb.fastGet('actions','move')(obj,x,y);
}

AK.prototype.log = (whatever)=>{
    logManager.logAction(whatever);
}

AK.prototype.triggerEvent = (obj,eventName)=>{
    try{
        obj.triggerEvent(eventName);
    }catch(e){
        logManager.logError(e);   
    }
}

///////////////////SOUND/////////////////////
AK.prototype.addSound = (id,url)=>{
    bb.fastGet('sound','addSound')(id,url);
}

AK.prototype.removeSound = (id,url)=>{
    bb.fastGet('sound','removeSound')(id,url);
}

AK.prototype.playSound = (id)=>{
    bb.fastGet('sound','playSound')(id);
}

AK.prototype.stopSound = (id)=>{
    bb.fastGet('sound','stopSound')(id);
}

AK.prototype.playBackground = (id)=>{
    bb.fastGet('sound','playBackground')(id);
}

AK.prototype.stopBackground = (id)=>{
    bb.fastGet('sound','stopBackground')(id);
}

AK.prototype.stopAllSounds = ()=>{
    bb.fastGet('sound','stopAllSounds')();
}


//////////////////////////////////////////////
// AK.prototype.consoleLog = (t)=>{
//     console.log(t);
// }


const ak = new AK();

export default ak;