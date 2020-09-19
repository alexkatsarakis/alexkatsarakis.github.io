import bb from '../utils/blackboard.js'

function moveBWD(){
    let funcs = bb.fastGet('renderer','moveBWD');
    for(var f in funcs){
        if(funcs[f]())break;
    }
}

bb.fastSet('actions','moveBackward',moveBWD);