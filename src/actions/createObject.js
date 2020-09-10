import bb from '../utils/blackboard.js'

import logAction from '../utils/logs.js'

function createObject({category,name,colour,position}){
    let catO = bb.fastGet("objects",category);
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    if(!bb.fastGet('liveObjects',name)){
        let it = new catO({name});
        bb.fastSet('liveObjects',name,it);
        if(colour)it.setColor(colour);
        if(position)it.setPosition(position.x,position.y);
        it.add();
        logAction("Created Object ["+name+"]");
    }
}

bb.fastSet('actions','createObject',createObject)