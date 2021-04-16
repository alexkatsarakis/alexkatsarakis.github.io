import bb from '../../utils/blackboard.js'

import animatorManager from './Animators/AnimatorManager.js'
import MovingAnimator from './Animators/AnimatorCategories/MovingAnimator.js'
import FrameRangeAnimator from './Animators/AnimatorCategories/FrameRangeAnimator.js'

import animationManager from './Animations/AnimationManager.js'
import animationFilmHolder from './Animations/AnimationFilmHolder.js'
import MovingAnimation from './Animations/AnimationCategories/MovingAnimation.js'
import FrameRangeAnimation from './Animations/AnimationCategories/FrameRangeAnimation.js'

 
import Manager from '../Manager.js'

import Engine from '../../Engine.js'

export default class AnimationManager extends Manager{
    _animationFilms
    _animationManagement
    _animationCategories
    _animatorCategories

    constructor(){
        super();
        this._animationFilms = [];
        this._animationManagement = [];
        this._animationCategories = {
            'MovingAnimation': MovingAnimation,
            'FrameRangeAnimation': FrameRangeAnimation
        }
        this._animatorCategories = {
            'MovingAnimator': MovingAnimator,
            'FrameRangeAnimator': FrameRangeAnimator
        }
    }

    setAnimationFilms(anFilms){
        this._animationFilms.push(anFilms);
    }

    setAnimationManagement(anMan){
        this._animationManagement.push(anMan);
    }

    getAnimationCategory(cat){
        return this._animationCategories[cat];
    }

    getAnimatorCategory(cat){
        return this._animatorCategories[cat];
    }

    getAnimators(){
        return animatorManager.getAnimators();
    }

    restoreAnimators(newAnimators){
        animatorManager.restoreAnimators(newAnimators);
    }

    onLoad(){
        this._animationFilms.forEach((films)=>{
            animationFilmHolder.loadAll(films);
        });
        this._animationManagement.forEach((manag)=>{
            animationManager.loadAll(manag);
        });
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
        
        let Animator = this.getAnimatorCategory(animator);
        if(!Animator)return;
    
        let an = new Animator();
        let animation = this.getAnimation(anim);
    
        let oldFilm;
        an.onStart = (animator,an)=>{
            if(!object.isAlive){
                object = Engine.ObjectManager.objects[object.id];
            }
            if(onStart)onStart();
            object.setAnimator(animator);
            oldFilm = object.getValue('film');
            let anim = Engine.AnimationManager.getAnimation(an.id);
            object.setValue('film',anim.film.id);
        }
        an.onAction = (animator)=>{
            object.setFrame(animator.currentFrame);
            object.move(animator.animation.dx,animator.animation.dy);
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
