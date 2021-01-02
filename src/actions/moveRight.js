import bb from '../utils/blackboard.js'

function moveRight(step = 0.2){
    if(bb.fastGet('physics','force'))
        bb.fastGet('physics','move')(bb.fastGet('state','player'),[step,0]);
    else 
        bb.fastGet('state','player').move(step*30,0);
}

bb.fastInstall('actions','moveRight',moveRight);