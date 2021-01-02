import bb from '../utils/blackboard.js'

import animatorManager from './Animators/AnimatorManager.js'
import MovingAnimator from './Animators/AnimatorCategories/MovingAnimator.js'
import FrameRangeAnimator from './Animators/AnimatorCategories/FrameRangeAnimator.js'

import animationManager from './Animations/AnimationManager.js'
import animationFilmHolder from './Animations/AnimationFilmHolder.js'
import MovingAnimation from './Animations/AnimationCategories/MovingAnimation.js'
import FrameRangeAnimation from './Animations/AnimationCategories/FrameRangeAnimation.js'


// TODO: check that everything is alright with the arguments
 
bb.fastInstall('animation', 'progress', (gameTime)=>animatorManager.progress(gameTime));
bb.fastInstall('animation', 'getAllFilms',()=>animationFilmHolder._films);
bb.fastInstall('animation', 'getFilm',(film)=>animationFilmHolder.getFilm(film));
bb.fastInstall('animation', 'requiredAssets',()=>{return animationFilmHolder.getAssetsToLoad();});

bb.fastInstall('animation', 'load',()=>{
    animationFilmHolder.loadAll();
    animationManager.loadAll();
});
bb.fastInstall('animation', 'registerNewAnimation',(anim,filmID)=>animationManager.register(anim,filmID));
bb.fastInstall('animation', 'getAllAnimations',()=>animationManager._animations);
bb.fastInstall('animation', 'getAnimation',(animID)=>animationManager.getAnimation(animID));

bb.fastInstall('animation', 'MovingAnimator', MovingAnimator);
bb.fastInstall('animation', 'FrameRangeAnimator', FrameRangeAnimator);

bb.fastInstall('animation', 'MovingAnimation', MovingAnimation);
bb.fastInstall('animation', 'FrameRangeAnimation', FrameRangeAnimation);


bb.fastInstall('debugForAlex', 'animatorManager', animatorManager);
bb.fastInstall('debugForAlex', 'animationManager', animationManager);
bb.fastInstall('debugForAlex', 'animationFilmHolder', animationFilmHolder);