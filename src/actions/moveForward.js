import bb from '../utils/blackboard.js'

function moveFWD(){
    let funcs = bb.fastGet('renderer','moveFWD');
    for(var f in funcs){
        if(funcs[f]())break;
    }
}

bb.fastSet('actions','moveForward',moveFWD);