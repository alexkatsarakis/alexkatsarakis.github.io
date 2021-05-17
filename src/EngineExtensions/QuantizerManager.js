import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'
import Manager from '../Engine/Manager.js'

export default class QuantizerManager extends Manager{
    _QuantizeMS

    constructor(){
        super();
        this._QuantizeMS = 16;
    }

    move(object, x, y, ms){
        if(!object)throw Error('Tried to move Quantizer without object');
        const Animator = Engine.AnimationManager.getAnimatorCategory('MovingAnimator');
        const an = new Animator();


        const reps = Number.parseInt(ms / this._QuantizeMS);
        const dx = x / reps;
        const dy = y / reps;
        
        const Animation = Engine.AnimationManager.getAnimationCategory('MovingAnimation');
        const animation = new Animation(
            {
                id:'temp',
                reps: reps,
                dx: dx,
                dy: dy,
                delay: this._QuantizeMS
            }); 
            
        // const ogX = object.getValue('x');
        // const ogY = object.getValue('y');
        an.onStart = ()=>{
            if(!object.isAlive)
                object = Engine.ObjectManager.objects[object.id];
            object.setAnimator(an);
        };
        an.onAction = (th)=>{
            object.move(th.animation.dx,th.animation.dy);
        };
        an.onFinish = ()=>{
            // if(dx !== 0)object.setValue('x',ogX + x);
            // if(dy !== 0)object.setValue('y',ogY + y);
        };
    
        an.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        });
    }

    moveTo(object, goalX, goalY, delay){
        const pos = object.getPositional();

        this.move(object, goalX - pos.x, goalY - pos.y, delay);

    }
}