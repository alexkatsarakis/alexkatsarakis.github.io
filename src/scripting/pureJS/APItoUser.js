import bb from '../../utils/blackboard.js'

import logManager from '../../utils/logs.js'

let AK = {
    getObject: (objName)=>{
        return bb.fastGet('liveObjects',objName);
    },
    getField: (obj,fieldName)=>{
        return obj.getValue(fieldName);
    },
    changeColor: (obj,color)=>{
        bb.fastGet('actions','changeColor')(obj,color);
    },
    move: (obj,x,y)=>{
        bb.fastGet('actions','move')(obj,x,y);
    },
    log: (whatever)=>{
        logManager.logAction(whatever);
    },
    triggerEvent: (obj,eventName)=>{
        try{
            obj.triggerEvent(eventName);
        }catch(e){
            logManager.logError(e);   
        }
    }
}

export default AK;