import bb from '../../utils/blackboard.js'

import focusObject from '../../transitionHandlers/focusedObject.js'

import logManager from '../../utils/logs.js'

function removeObject(obj){
    // if(!obj || typeof obj !== object){
    //     logManager.logError("On remove object");
    //     return;
    // }
    if(!obj)obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
    obj.triggerEvent('onRemove');
    obj.remove();
    logManager.logAction("Removed Object ["+obj.name+"]");
    focusObject(undefined);
}

bb.fastInstall('actions','removeObject',removeObject)