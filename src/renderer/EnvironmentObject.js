import bb from '../utils/blackboard.js'

import Object from '../objects/Object.js'
import Value from '../objects/Value.js'
import log from '../utils/logs.js'

class EnvironmentObject extends Object {

    renderer = 'None';
    name = 'Stage';

    _x;
    _y;
    _width;
    _height;

    constructor(){
        super('Stage');

        this._x = 0;
        this._y = 0;

        this._width = window.innerWidth;
        this._height = window.innerHeight;


        this.values['x'] = new Value({
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change x value of Stage');},
            getValue: () => {return this._x;}
        });

        this.values['y'] = new Value({
            tag: "positional",
            onChange: (value) => {log.logError('Can\'t change y value of Stage');},
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

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    getCategory(){
        return 'Stage';
    }

}


bb.fastSet('liveObjects','Stage',new EnvironmentObject());