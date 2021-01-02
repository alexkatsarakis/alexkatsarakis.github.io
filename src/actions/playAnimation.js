import bb from '../utils/blackboard.js'

const getAnimation = bb.fastGet('animation','getAnimation');
const FRAnimator = bb.fastGet('animation','FrameRangeAnimator');

function playAnimation({object,anim,onStart,onFinish}){

    if(!anim)return;
    let obj = (object)?object:bb.fastGet('state','player');
    let animator = new FRAnimator();
    let animation = getAnimation(anim);

    let oldFilm;

    animator.onStart = ()=>{
        if(onStart)onStart();
        obj.setAnimator(animator);
        oldFilm = obj.getFilm();
        obj.setFilm(animation.film.id);
    }
    animator.onAction = (th)=>{
        obj.setFrame(th.currentFrame);
        obj.move(th.animation.dx,th.animation.dy);
    };
    animator.onFinish = ()=>{
        obj.setFrame(0);
        obj.setFilm(oldFilm);
        if(onFinish)onFinish();
    }

    animator.start({
        animation: animation.animation,
        timestamp: bb.fastGet('state','gameTime'),
    })
}

bb.fastInstall('actions','playAnimation',playAnimation);