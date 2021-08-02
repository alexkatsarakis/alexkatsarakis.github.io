import Object from '../../../objects/Object.js'

import stage from '../../EnvironmentObject.js'

import scene from './Scene.js'
import objectManager from '../../ObjectManager.js'

import Engine from '../../../../Engine.js'
import bb from '../../../../utils/blackboard.js'

export default class Object454 extends Object{
    _x;
    _y;
    _color;
    _rotation;
    _film;
    _frame;

    constructor(name,id){
        super(name,id);
        this.renderer = '454';
        this._rotation = 0;

        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {this._x = Number.parseInt(value);},
            getValue: () => {return this._x;}
        });

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            onChange: (value) => {this._y = Number.parseInt(value);},
            getValue: () => {return this._y;}
        });

        this.data.valueHandler.registerValue('width',{
            tag: "positional",
            onChange: (value) => {this._width = Number.parseInt(value);},
            getValue: () => {return this._width;}
        });

        this.data.valueHandler.registerValue('height',{
            tag: "positional",
            onChange: (value) => {this._height = Number.parseInt(value);},
            getValue: () => {return this._height;}
        });

        this.data.valueHandler.registerValue('color',{
            tag: "texture",
            onChange: (value) => this._color = value,
            getValue: () => {return this._color;}
        });

        this.data.valueHandler.registerValue('zIndex',{
            tag: 'render',
            value: 0,
            onChange: (val) => scene.sortObjects(this,val),
        });

        this.data.valueHandler.registerValue('film',{
            tag: 'render',
            onChange: (value) => {
                if(!value)return
                if(!Engine.AnimationManager.getFilm(value)){
                    bb.fastSet('events','showFeedback',`Failed to update film to ${value}`);
                    return;
                }
                this._frame = 0;
                this._film = value;
            },
            getValue: () => {return this._film;}
        });

        this.data.valueHandler.registerValue('frame',{
            tag: 'render',
            onChange: (value) => {
                const f = Engine.AnimationManager.getFilm(this._film);
                if(value === undefined || !f)return;
                if(isNaN(value) || value < 0 || value > f.totalFrames-1){
                    bb.fastSet('events','showFeedback',`Failed to update frame to ${value}`);
                    return;
                }
                this._frame = value;
            },
            getValue: () => {return this._frame;}
        });

        this._stage = stage;

    }

    toString(){
        const toSave = JSON.parse(super.toString());
        toSave._film = this._film;
        toSave._frame = this._frame;
        return JSON.stringify(toSave);
    }

    setColor(col){
        this.setValue('color',col);
    }

    getObject(){
        return this;
    }

    // THE FOLLOWING FUNC IS JUST FOR PERFORMANCE REASONS
    // INSTEAD OF
            // getMapCoords(){
            //     if(!this.getOption('moveWithScroll'))
            //         return [this._x, this._y];
            //     return [this._x - this._stage.getValue('x'),this._y- this._stage.getValue('y')];
            // }
    getMapCoords(){
        if(!this.data.optionHandler._regOptions['moveWithScroll']?.val)
            return [this._x, this._y];
        return [this._x - this._stage._x,this._y - this._stage._y];
    }

    animate(){}

    setFrame(newFrame){
        this.setValue('frame',newFrame);
    }

    getFilm(){
        return this._film;
    }

    setFilm(film){
        this.setValue('film',film);
    }

    add(){
        objectManager.addToWorld(this);
        scene.addItem(this);
    }
    
    remove(){
        super.remove();
        this.destroyAnimator();
        objectManager.removeFromWorld(this);
        scene.removeItem(this);
    }

    render(ctx){
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = "#ffffff";
    }
    

}