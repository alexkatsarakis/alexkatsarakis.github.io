import bb from '../utils/blackboard.js'

import focusObject from '../transitionHandlers/focusedObject.js'

import logAction from '../utils/logs.js'

function removeObject(objName){
    let obj = bb.fastGet('liveObjects',objName);
    obj.remove();
    logAction("Removed Object ["+objName+"]");
    focusObject(undefined);
}

bb.fastSet('actions','removeObject',removeObject)