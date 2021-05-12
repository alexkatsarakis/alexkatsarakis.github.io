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
        const film = this.getValue('film');
        if(!this.getOption('isVisible'))return;
        
        const [drawX,drawY] = this.getMapCoords();
        if(drawX + this.getValue('width') <= 0
        || drawX > this._stage.getValue('windowWidth')
        || drawY + this.getValue('height') <= 0
        || drawY > this._stage.getValue('windowHeight')) return;
        if(!film){
            ctx.fillStyle = this._color;
            ctx.fillRect(drawX, drawY, this._width, this._height);
            ctx.fillStyle = "#ffffff";
        }else{
            const info = this._getFilm(film);
            const box = info.getFrameBox(this.getValue('frame'));
            const img = info.bitmap;
            ctx.drawImage(bb.fastGet('assets',img),
            box.x,box.y,box.width,box.height,
            drawX, drawY, this._width, this._height);
        }
    }
}