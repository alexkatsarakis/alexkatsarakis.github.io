import bb from '../../utils/blackboard.js'

import logHandler from '../../utils/logs.js'

function move(obj,x = 0,y = 0){
    if( obj 
        && typeof obj === 'object'
        && typeof x === 'number'
        && typeof y === 'number'){
        obj.triggerEvent('onMove');
        obj.move(x,y);
    }else {
        logHandler.logError("Wrong Argument on move object");
    }
}

bb.fastInstall('actions','move',move)