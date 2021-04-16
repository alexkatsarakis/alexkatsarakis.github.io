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

        this.data.valueHandler.registerValue('width',{
            tag: "positional",
            onChange: (value) => {this._width = value;},
            getValue: () => {return this._width;}
        });

        this.data.valueHandler.registerValue('height',{
            tag: "positional",
            onChange: (value) => {this._height = value;},
            getValue: () => {return this._height;}
        });

        this.data.valueHandler.registerValue('colour',{
            tag: "texture",
            onChange: (value) => this._color = value,
            getValue: () => {return this._color;}
        });


        this.data.valueHandler.registerValue('film',{
            tag: 'render',
            onChange: (value) => {
                this._frame = 0;
                this._film = value;
            },
            getValue: () => {return this._film;}
        });

        this.data.valueHandler.registerValue('frame',{
            tag: 'render',
            onChange: (value) => {
                this._frame = value;
            },
            getValue: () => {return this._frame;}
        });

        this._stage = stage;

    }

    toString(){
        let toSave = JSON.parse(super.toString());
        toSave._film = this._film;
        toSave._frame = this._frame;
        if(this.name === 'f')debugger;
        return JSON.stringify(toSave);
    }

    setColor(col){
        this.setValue('colour',col);
    }

    getPosition(){
        return [x,y];
    }

    getObject(){
        return this;
    }
    
    getMapCoords(){
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