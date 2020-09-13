import bb from '../utils/blackboard.js'

function move(obj,x = 0,y = 0){
    if(!obj)obj = bb.fastGet('state','focusedObject');
    console.log(x,y);
    if(obj)obj.move(x,y);
}

bb.fastSet('actions','move',move)