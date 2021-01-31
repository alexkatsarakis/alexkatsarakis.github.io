import bb from '../../utils/blackboard.js'

import Object from '../objects/Object.js'
import Value from '../objects/Value.js'
import Event from '../objects/Event.js'
import log from '../../utils/logs.js'

class EnvironmentObject extends Object {

    renderer = 'None';
    name = 'Stage';
    
    _x;
    _y;
    _width;
    _height;

    constructor(){
        super('Stage','BpAoTcBMfklfGm6');

        this._x = 0;
        this._y = 0;
        this._width = 3100;
        this._height = 1080;

        

        this.data.eventHandler.registerEvent('moveStageLeft',{
            tag: 'system',
            code: localStorage.getItem(this.id+"_moveStageLeft")
        });

        this.data.eventHandler.registerEvent('moveStageRight',{
            tag: 'system',
            code: localStorage.getItem(this.id+"_moveStageRight")
        });

        this.data.eventHandler.registerEvent('cameraFollowPlayer',{
            tag: 'system',
            code: localStorage.getItem(this.id+"_cameraFollowPlayer")
        });

        this._windowWidth = window.innerWidth;
        this._windowHeight = window.innerHeight;


        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {
                this._x = value;
                if(this._x + this._windowWidth > this._width)
                    this._x = this._width - this._windowWidth;
                if(this._x < 0)this._x = 0;
            },
            getValue: () => {return this._x;}
        })

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            // onChange: (value) => {log.logError('Can\'t change y value of Stage');},
            onChange: (value) => {
                this._y = value;
                if(this._y + this._windowHeight > this._height)
                    this._y = this._height - this._windowHeight;
                if(this._y < 0)this._y = 0;
            },
            getValue: () => {return this._y;}
        });

        this.data.valueHandler.registerValue('width',{
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change width value of Stage');},
            getValue: () => {return this._width;}
        });

        this.data.valueHandler.registerValue('height',{
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change height value of Stage');},
            getValue: () => {return this._height;}
        });
        this.data.valueHandler.registerValue('windowWidth',{
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change width value of Stage');},
            getValue: () => {return this._windowWidth;}
        });
        this.data.valueHandler.registerValue('windowHeight',{
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change height value of Stage');},
            getValue: () => {return this._windowHeight;}
        });

        this.data.optionHandler.removeOption('isMovable');
        this.data.optionHandler.removeOption('isRemovable');
        this.data.optionHandler.removeOption('isVisible');
        this.data.optionHandler.removeOption('isSolid');

        this.data.optionHandler.setOption('isCollidable',false);


        this.data.eventHandler.removeEvent('onCollision');
        this.data.eventHandler.removeEvent('onRemove');
        this.data.eventHandler.removeEvent('onMove');
        this.data.eventHandler.removeEvent('onClick');
        this.data.eventHandler.removeEvent('onRightClick');


        this._category = 'Stage';
    }

    move(x,y){
        if(!this.options['isMovable'])return;
        this.setValue('x',this._x + x);
        this.setValue('y',this._y + y);
        // this._x += x;
        // if(this._x + this._windowWidth > this._width)
        //     this._x = this._width - this._windowWidth;
        // if(this._x < 0)this._x = 0;
        // this._y += y;
        // if(this._y + this._windowHeight > this._height)
        //     this._y = this._height - this._windowHeight;
        // if(this._y < 0)this._y = 0;
    }

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    remove(){
        throw Error('Environment Object cannot be removed!');
    }

}


const environmentObject = new EnvironmentObject();

export default environmentObject;