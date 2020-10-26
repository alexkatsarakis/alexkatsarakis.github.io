import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'

import Value from '../../../objects/Value.js'

import scene from './Scene.js'

export default class Object454 extends Object{
    _x;
    _y;
    _color;
    _rotation;
    _film;
    _frame;
    _animator;

    constructor(name){
        super(name);
        this.renderer = '454';
        this._rotation = 0;

        this.values['x'] = new Value({
            tag: "positional",
            onChange: (value) => {this._x = value;},
            getValue: () => {return this._x;}
        });

        this.values['y'] = new Value({
            tag: "positional",
            onChange: (value) => {this._y = value;},
            getValue: () => {return this._y;}
        });

        this.values['rotation'] = new Value({
            tag: "positional",
            onChange: (value) => {this._rotation = value;},
            getValue: () => {return this._rotation;}
        });

        this.values['colour'] = new Value({
            tag: "texture",
            onChange: (value) => this._color = value,
            getValue: () => {return this._color;}
        });

    }

    setColor(col){
        this._color = col;
    }

    setPosition(x,y){
        this._x = x;
        this._y = y;
    }

    getPosition(){
        return [x,y];
    }

    getObject(){
        return this;
    }

    move(x,y){
        this._x += x;
        this._y += y;
        if(x !== 0 || y !== 0)
            this.triggerEvent('onMove');
    }

    getBoundingBox(){
        return {
            x: this._x,
            y: this._y,
            width: this._width,
            height: this._height
        }
    }

    animate(){}

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    setFrame(newFrame){
        this._frame = newFrame;
    }

    getFilm(){
        return this._film;
    }

    setFilm(film){
        this._film = film;
    }

    setAnimator(animator){
        if(this._animator !== undefined)this._animator.stop();
        this._animator = animator;
    }

    getAnimator(){
        return this._animator;
    }

    add(){
        bb.fastSet('liveObjects',this.name,this);
        scene.addItem(this);
    }

    remove(){
        if(this._animator !== undefined)this._animator.stop();
        bb.fastRemove('liveObjects',this.name);
        scene.removeItem(this);
    }

    render(ctx){
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = "#ffffff";
    }
    

}