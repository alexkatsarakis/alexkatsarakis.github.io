import Object from '../../../objects/Object.js'

import stage from '../../EnvironmentObject.js'

import scene from './Scene.js'
import objectManager from '../../ObjectManager.js'

export default class Object454 extends Object{
    _x;
    _y;
    _color;
    _rotation;
    _film;
    _frame;
    _animator;

    constructor(name,id){
        super(name,id);
        this.renderer = '454';
        this._rotation = 0;

        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {this._x = value;},
            getValue: () => {return this._x;}
        });

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            onChange: (value) => {this._y = value;},
            getValue: () => {return this._y;}
        });

        this.data.valueHandler.registerValue('colour',{
            tag: "texture",
            onChange: (value) => this._color = value,
            getValue: () => {return this._color;}
        });

        this._stage = stage;

    }

    setColor(col){
        this._color = col;
    }

    setPosition(x,y){
        if(!this.getOption('isMovable'))return;
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
        if(!this.getOption('isMovable'))return;
        if(x !== 0) this.setValue('x', this._x + x);
        if(y !== 0) this.setValue('y', this._y + y);
        if(x !== 0 || y !== 0)
            this.triggerEvent('onMove');
    }

    getMapCoords(){
        // return [this._x,this._y];
        if(!this.getOption('moveWithScroll'))
            return [this._x, this._y];
        return [this._x - this._stage.getValue('x'),this._y - this._stage.getValue('y')];
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
        objectManager.addToWorld(this);
        scene.addItem(this);
    }
    
    remove(){
        if(this._animator !== undefined)this._animator.stop();
        this._stage = undefined;
        this.clear();
        objectManager.removeFromWorld(this);
        scene.removeItem(this);
    }

    render(ctx){
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = "#ffffff";
    }
    

}