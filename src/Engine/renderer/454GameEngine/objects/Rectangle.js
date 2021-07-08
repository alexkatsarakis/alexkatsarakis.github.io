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

        this.setValue('width',(dim)?dim.width:100);
        this.setValue('height',(dim)?dim.width:100);
        

        this.setValue('film',film);
        this.setValue('frame',0);


        this._getFilm = bb.fastGet('Engine','AnimationManager').getFilm;
    }

    render(ctx){
        //for performance reasons instead of
        // if(!this.getOption('isVisible))return;
        if(!this.data.optionHandler._regOptions['isVisible']?.val)return;

        const film = this._film;
        
        const [drawX,drawY] = this.getMapCoords();
        if(drawX + this._width <= 0
        || drawX > 1920
        || drawY + this._height <= 0
        || drawY > 1080) return;
        if(!film){
            ctx.fillStyle = this._color;
            ctx.fillRect(drawX, drawY, this._width, this._height);
            ctx.fillStyle = "#ffffff";
        }else{
            const info = this._getFilm(film);
            const box = info.getFrameBox(this._frame);
            const img = info.bitmap;
            ctx.drawImage(bb.fastGet('assets',img),
            box.x,box.y,box.width,box.height,
            drawX, drawY, this._width, this._height);
        }
    }
}