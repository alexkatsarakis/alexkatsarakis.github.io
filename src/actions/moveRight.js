import bb from '../utils/blackboard.js'

function moveRight(){
    let funcs = bb.fastGet('renderer','moveRight');
    for(var f in funcs){
        if(funcs[f]())break;
    }
}

bb.fastSet('actions','moveRight',moveRight);