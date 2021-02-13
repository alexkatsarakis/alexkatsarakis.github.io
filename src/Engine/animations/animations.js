import bb from '../../utils/blackboard.js'

import animatorManager from './Animators/AnimatorManager.js'
import MovingAnimator from './Animators/AnimatorCategories/MovingAnimator.js'
import FrameRangeAnimator from './Animators/AnimatorCategories/FrameRangeAnimator.js'

import animationManager from './Animations/AnimationManager.js'
import animationFilmHolder from './Animations/AnimationFilmHolder.js'
import MovingAnimation from './Animations/AnimationCategories/MovingAnimation.js'
import FrameRangeAnimation from './Animations/AnimationCategories/FrameRangeAnimation.js'

 
export default class AnimationManager {
    _animationFilms
    _animationManagement

    constructor(animationFilms,animationManagement){
        this._animationFilms = animationFilms;
        this._animationManagement = animationManagement;
    }

    load(){
        animationFilmHolder.loadAll(this._animationFilms);
        animationManager.loadAll(this._animationManagement);
    }

    progress(gameTime){
        animatorManager.progress(gameTime);
    }

    timeShift(gameTime){
        animatorManager.timeShift(gameTime);
    }

    getAllFilms(){
        return animationFilmHolder._films;
    }

    getFilm(film){
        return animationFilmHolder.getFilm(film);
    }

    getAnimation(animID){
        return animationManager.getAnimation(animID);
    }

    getAllAnimations() {
        return animationManager._animations;
    }

    registerNewAnimation(anim,filmID){
        return animationManager.register(anim,filmID);
    }

    requiredAssets(){
        return animationFilmHolder.getAssetsToLoad();
    }

    playAnimation = ({object,anim,onStart,onFinish,animator = 'FrameRangeAnimator'}) => {

        if(!anim)return;
        if(!object)return;
        
        let Animator = bb.fastGet('animation',animator);
        if(!Animator)return;
    
        let an = new Animator();
        let animation = this.getAnimation(anim);
    
        let oldFilm;
    
        an.onStart = ()=>{
            if(onStart)onStart();
            object.setAnimator(an);
            oldFilm = object.getValue('film');
            object.setValue('film',animation.film.id);
        }
        an.onAction = (th)=>{
            object.setFrame(th.currentFrame);
            object.move(th.animation.dx,th.animation.dy);
        };
        an.onFinish = ()=>{
            object.setFrame(0);
            object.setValue('film',oldFilm);
            if(onFinish)onFinish();
        }
    
        an.start({
            animation: animation.animation,
            timestamp: bb.fastGet('state','gameTime'),
        })
    }

}

bb.fastInstall('animation', 'MovingAnimator', MovingAnimator);
bb.fastInstall('animation', 'FrameRangeAnimator', FrameRangeAnimator);

bb.fastInstall('animation', 'MovingAnimation', MovingAnimation);
bb.fastInstall('animation', 'FrameRangeAnimation', FrameRangeAnimation);
