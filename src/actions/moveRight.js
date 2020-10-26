import bb from '../utils/blackboard.js'

function moveRight(step = 0.1){
    if(bb.fastGet('physics','force'))
        bb.fastGet('physics','force')(bb.fastGet('state','player'),[0,0],[step,0]);
    else 
        bb.fastGet('state','player').move(step*30,0);
}

bb.fastInstall('actions','moveRight',moveRight);