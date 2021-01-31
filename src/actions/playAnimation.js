import Engine from '../Engine.js';
import bb from '../utils/blackboard.js'

function playAnimation({object,anim,onStart,onFinish}){

    if(!anim)return;
    if(!object)return;
    Engine.AnimationManager.playAnimation({object,anim,onStart,onFinish,animator:'FrameRangeAnimator'})
}

bb.fastInstall('actions','playAnimation',playAnimation);