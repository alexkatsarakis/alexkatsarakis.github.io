import bb from '../utils/blackboard.js'

<<<<<<< HEAD
import logManager from '../utils/logs.js'
=======
import logAction from '../utils/logs.js'
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611

function dummyAction(){
    let obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
    let pos = obj.getPosition();
    let name = obj.getName();
    name += "_copy";
    let catO = bb.fastGet("objects",obj.getCategory());
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    if(!bb.fastGet('liveObjects',name)){
        let it = new catO({name});
        bb.fastSet('liveObjects',name,it);
        it.setPosition(pos.x,pos.y,pos.z);
        it.add();
<<<<<<< HEAD
        logManager.logAction("Created Object ["+name+"]");
=======
        logAction("Created Object ["+name+"]");
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611
    }

}

bb.fastSet('actions','dummyAction',dummyAction)