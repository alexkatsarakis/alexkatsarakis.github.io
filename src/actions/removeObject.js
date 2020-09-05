import bb from '../utils/blackboard.js'

function removeObject(objName){
    let obj = bb.fastGet('liveObjects',objName);
    obj.remove();
}

bb.fastSet('actions','removeObject',removeObject)