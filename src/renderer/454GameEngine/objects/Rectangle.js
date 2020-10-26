import Object from './Object454.js'

import Value from '../../../objects/Value.js'

import bb from '../../../utils/blackboard.js'


class Rectangle extends Object {
    _width;
    _height;

    constructor({name,dim,film}){
        super(name);
        
        bb.fastInstall('state','player',this);

        this._width = (dim)?dim.width:100;
        this._height = (dim)?dim.height:100;
        this._frame = 0;
        this._film = film;
        this.values['width'] = new Value({
            tag: "positional",
            onChange: (value) => {this._width = value;},
            getValue: () => {return this._width;}
        });

        this.values['height'] = new Value({
            tag: "positional",
            onChange: (value) => {this._height = value;},
            getValue: () => {return this._height;}
        });
    }

    getCategory(){
        return "Rectangle";
    }

    render(ctx){
        if(!this._film){
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
            ctx.fillStyle = "#ffffff";
        }else{
            let info = bb.fastGet('gameEngine','animationFilmHolder').getFilm(this._film);
            let box = info.getFrameBox(this._frame);
            let img = info.bitmap;
            ctx.drawImage(bb.fastGet('assets',img),
            box.x,box.y,box.width,box.height,
            this._x, this._y, this._width, this._height);
        }
    }
}

bb.fastInstall('objects','Rectangle',Rectangle);