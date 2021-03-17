import Object from './Object454.js'

import bb from '../../../../utils/blackboard.js'


export default class Rectangle extends Object {
    _width;
    _height;
    _film;
    _frame;

    constructor({name,dim,film},id){
        super(name,id);
        this._category = 'Rectangle';

        this._width = (dim)?dim.width:100;
        this._height = (dim)?dim.height:100;
        
        this._frame = 0;
        this._film = film;

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

        this.data.valueHandler.registerValue('film',{
            tag: 'render',
            value: film,
            onChange: (value) => {
                this._frame = 0;
                this._film = value;
            },
            getValue: () => {return this._film;}
        });

        this._getFilm = bb.fastGet('Engine','AnimationManager').getFilm;
    }

    render(ctx){
        let film = this.getValue('film');
        if(!this.getOption('isVisible'))return;
        
        let [drawX,drawY] = this.getMapCoords();
        if(drawX + this.getValue('width') <= 0
        || drawX > this._stage.getValue('windowWidth')
        || drawY + this.getValue('height') <= 0
        || drawY > this._stage.getValue('windowHeight')) return;
        if(!film){
            ctx.fillStyle = this._color;
            ctx.fillRect(drawX, drawY, this._width, this._height);
            ctx.fillStyle = "#ffffff";
        }else{
            let info = this._getFilm(film);
            let box = info.getFrameBox(this._frame);
            let img = info.bitmap;
            ctx.drawImage(bb.fastGet('assets',img),
            box.x,box.y,box.width,box.height,
            drawX, drawY, this._width, this._height);
        }
    }
}