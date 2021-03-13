import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

export default class QuantizerManager {
    _QuantizeMS

    constructor(){
        this._QuantizeMS = 16;
    }

    move(object, x, y, ms){
        let Animator = Engine.AnimationManager.getAnimatorCategory('MovingAnimator');
        let an = new Animator();

        let reps = Number.parseInt(ms / this._QuantizeMS);
        let dx = x / reps;
        let dy = y / reps;

        let Animation = Engine.AnimationManager.getAnimationCategory('MovingAnimation');
        let animation = new Animation(
            {
                id:'temp',
                reps: reps,
                dx: dx,
                dy: dy,
                delay: this._QuantizeMS
            }) 
            
        an.onStart = ()=>{
            object.setAnimator(an);
        }
        an.onAction = (th)=>{
            object.move(th.animation.dx,th.animation.dy);
        };
        an.onFinish = ()=>{
            
        }
    
        an.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        })
    }

    moveTo(object, goalX, goalY, delay){
        let pos = object.getPositional();

        this.move(object, goalX - pos.x, goalY - pos.y, delay);

    }
}