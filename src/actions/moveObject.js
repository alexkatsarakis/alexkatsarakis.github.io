import bb from '../utils/blackboard.js'

function move(objName){
    let obj = bb.fastGet('liveObjects',objName);
    if(obj)obj.move(0.1,0);
}

bb.fastSet('actions','move',move)