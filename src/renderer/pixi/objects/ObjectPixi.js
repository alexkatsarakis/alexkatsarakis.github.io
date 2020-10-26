import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'
import Value from '../../../objects/Value.js'

import scene from './Scene.js';

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

export default class ObjectPixi extends Object{
    obj
    constructor(name){
        super(name);
        this.renderer = 'pixi';

        this.values['x'] = new Value({
            tag: "positional",
            onChange: (value) => this.obj.x = value,
            getValue: () => {return this.obj.x.toFixed(2);}
        });

        this.values['y'] = new Value({
            tag: "positional",
            onChange: (value) => this.obj.y = value,
            getValue: () => {return this.obj.y.toFixed(2);}
        });

        this.values['colour'] = new Value({
            tag: "texture",
            onChange: (value) => this.setColor(value),
            getValue: () => {return PIXI.utils.hex2string(this.obj.tint);}
        });
    }

    setColor(col){
        this.obj.tint = PIXI.utils.string2hex(col);
    }

    setPosition(x,y){
        // [x,y] = fromPercentageToPx(x,y);
        this.obj.x = x;
        this.obj.y = y;
    }

    getPosition(){
        return {
            x: this.obj.x,
            y: this.obj.y
        };
    }

    getBoundingBox(){
        return {
            x: this.obj.x,
            y: this.obj.y,
            width: this.obj.width,
            height: this.obj.height
        };
    }

    getObject(){
        return this.obj;
    }

    move(x,y){
        this.obj.x += x;
        this.obj.y += y;
    }

    animate(){}

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    add(){
        bb.fastSet('liveObjects',this.name,this);
        scene.addItem(this.getObject());
    }

    remove(){
        bb.fastRemove('liveObjects',this.name);
        scene.removeItem(this.getObject());
    }

}