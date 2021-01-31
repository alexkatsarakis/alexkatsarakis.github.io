import Engine from '../Engine.js';
import bb from '../utils/blackboard.js'

function moveBWD(step = 0.3){
    if(Engine.PhysicsManager)
        Engine.PhysicsManager.force(bb.fastGet('state','player'),[0,0],[0,step]);
    else 
        bb.fastGet('state','player').move(0,step*30);
}

bb.fastInstall('actions','moveBackward',moveBWD);