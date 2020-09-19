import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

function createObject({category,name,colour,position}){
    let catO = bb.fastGet("objects",category);
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    if(!bb.fastGet('liveObjects',name)){
        let it = new catO({name});
        if(colour)it.setColor(colour);
<<<<<<< HEAD
        if(position)it.setPosition(position.x,position.y,position.z);
=======
        if(position)it.setPosition(position.x,position.y,item.position.z);
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611
        it.add();
        logManager.logAction("Created Object ["+name+"]");
    }
}

bb.fastSet('actions','createObject',createObject)