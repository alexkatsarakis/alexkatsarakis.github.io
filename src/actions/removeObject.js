import bb from '../utils/blackboard.js'

import focusObject from '../transitionHandlers/focusedObject.js'

function removeObject(objName){
    let obj = bb.fastGet('liveObjects',objName);
    obj.remove();
    focusObject(undefined);
}

bb.fastSet('actions','removeObject',removeObject)