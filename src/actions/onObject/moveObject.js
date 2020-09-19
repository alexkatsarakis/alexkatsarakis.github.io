import bb from '../../utils/blackboard.js'

import logHandler from '../../utils/logs.js'

function move(obj,x = 0,y = 0,z = 0){
    if( obj 
        && typeof obj === 'object'
        && typeof x === 'number'
        && typeof y === 'number'
        && typeof z === 'number'){
        obj.triggerEvent('onMove');
        obj.move(x,y,z);
    }else {
        logHandler.logError("Wrong Argument on move object");
    }
}

bb.fastSet('actions','move',move)