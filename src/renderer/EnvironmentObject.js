import bb from '../utils/blackboard.js'

import Object from '../objects/Object.js'
import Value from '../objects/Value.js'
import Event from '../objects/Event.js'
import log from '../utils/logs.js'

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

        

        this.events["moveStageLeft"] = new Event({
            tag: 'system',
            value: localStorage.getItem(this.id+"_moveStageLeft")
        });

        this.events["moveStageRight"] = new Event({
            tag: 'system',
            value: localStorage.getItem(this.id+"_moveStageRight")
        });

        this._windowWidth = window.innerWidth;
        this._windowHeight = window.innerHeight;

        this._width = 2100;
        this._height = 1080;

        this.values['x'] = new Value({
            tag: "positional",
            // onChange: (value) => {log.logError('Can\'t change x value of Stage');},
            onChange: (value) => {
                this._x = value;
                if(this._x + this._windowWidth > this._width)
                    this._x = this._width - this._windowWidth;
                if(this._x < 0)this._x = 0;
            },
            getValue: () => {return this._x;}
        });

        this.values['y'] = new Value({
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

        this.values['width'] = new Value({
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change width value of Stage');},
            getValue: () => {return this._width;}
        });

        this.values['height'] = new Value({
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change height value of Stage');},
            getValue: () => {return this._height;}
        });
        
        this.values['window width'] = new Value({
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change width value of Stage');},
            getValue: () => {return this._windowWidth;}
        });

        this.values['window height'] = new Value({
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change height value of Stage');},
            getValue: () => {return this._windowHeight;}
        });

        delete this.options['isMovable'];
        delete this.options['isRemovable'];
        delete this.options['isVisible'];
        delete this.options['isSolid'];

        delete this.events['onCollision'];
        delete this.events['onRemove'];
        delete this.events['onMove'];

        delete this.events['onClick'];
        delete this.events['onRightClick'];

        this.options['isCollidable'] = false;
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
        this.clear();
        bb.fastRemove('liveObjects',this.id);
    }

    getCategory(){
        return 'Stage';
    }

}


const environmentObject = new EnvironmentObject();

bb.fastSet('liveObjects', environmentObject.id, environmentObject);

export default environmentObject;