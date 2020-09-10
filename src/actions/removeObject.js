import bb from '../utils/blackboard.js'

import focusObject from '../transitionHandlers/focusedObject.js'

import logAction from '../utils/logs.js'

function removeObject(obj){
    if(!obj)obj = bb.fastGet('state','focusedObject');
    if(!obj)return;
    obj.remove();
    logAction("Removed Object ["+obj.name+"]");
    focusObject(undefined);
}

bb.fastSet('actions','removeObject',removeObject)