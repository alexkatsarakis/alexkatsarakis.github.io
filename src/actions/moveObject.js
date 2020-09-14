import bb from '../utils/blackboard.js'

function move(obj,x = 0,y = 0){
    if(!obj)obj = bb.fastGet('state','focusedObject');
    if(obj){
        obj.triggerEvent('onMove');
        obj.move(x,y);
    }
}

bb.fastSet('actions','move',move)