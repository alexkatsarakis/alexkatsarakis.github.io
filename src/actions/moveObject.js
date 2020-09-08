import bb from '../utils/blackboard.js'

function move(objName,howMuch = 0.1){
    let obj = bb.fastGet('liveObjects',(objName)?objName:bb.fastGet('state','focusedObject'));
    if(obj)obj.move(howMuch,0);
}

bb.fastSet('actions','move',move)