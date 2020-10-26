import bb from '../utils/blackboard.js'

import animatorManager from './Animators/AnimatorManager.js'
import MovingAnimator from './Animators/AnimatorCategories/MovingAnimator.js'
import FrameRangeAnimator from './Animators/AnimatorCategories/FrameRangeAnimator.js'

import animationManager from './Animations/AnimationManager.js'
import animationFilmHolder from './Animations/AnimationFilmHolder.js'
import MovingAnimation from './Animations/AnimationCategories/MovingAnimation.js'
import FrameRangeAnimation from './Animations/AnimationCategories/FrameRangeAnimation.js'



bb.fastInstall('gameEngine', 'animatorManager', animatorManager);
bb.fastInstall('gameEngine', 'animationFilmHolder', animationFilmHolder);

bb.fastInstall('gameEngine', 'animationManager', animationManager);

bb.fastInstall('gameEngine', 'MovingAnimator', MovingAnimator);
bb.fastInstall('gameEngine', 'FrameRangeAnimator', FrameRangeAnimator);

bb.fastInstall('gameEngine', 'MovingAnimation', MovingAnimation);
bb.fastInstall('gameEngine', 'FrameRangeAnimation', FrameRangeAnimation);

function bindObjectWithFrameRangeAnimator(obj,frAnimator){
    frAnimator.onAction = (th) => {
        console.log('from Binder Action');
        let box = animationFilmHolder.getFilm(th.id).getFrameBox(th.currentFrame);
        obj.move(th.animation.dx,th.animation.dy);
        //obj change image to frame
    }
}