import bb from '../utils/blackboard.js'

function moveLeft(){
    let funcs = bb.fastGet('renderer','moveLeft');
    for(var f in funcs){
        if(funcs[f]())break;
    }
}

bb.fastSet('actions','moveLeft',moveLeft);