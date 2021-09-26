import Object from './ObjectDom.js'


export default class Square extends Object {
    
    constructor({name,texture,dim,div},id){
        super(name,id,{div,texture,dim});

        this.data.valueHandler.registerValue('HTML',{
            tag: "div",
            onChange: (value) => {
                const width = Number.parseFloat(this.div.style.width.slice(0,-2));
                const height = Number.parseFloat(this.div.style.height.slice(0,-2));
                const temp = document.createElement('div');
                temp.innerHTML = value;
                this.removeDivFromScene();
                this.div = temp.firstChild;
                this.div.style.width = width +'px';
                this.div.style.height = height +'px';
                this.div.style.position = 'absolute';
                this.div.style.left = this._x;
                this.div.style.top = this._y;
                this.addDivToScene();
            },
            getValue: () => { return '<html>'}
        });

        this._category = 'Square';

    }

    createElement({name,texture,dim}){
        this.div = document.createElement('div');
        this.div.id = name;
        const X = (dim&&dim.width)?dim.width:100;
        const Y = (dim&&dim.height)?dim.height:100;
        this.div.style.width = X+"px";
        this.div.style.height = Y+"px";
        this.div.style.position = "absolute";
        if(texture){
            this.div.style.backgroundImage = "url('"+texture+"')";
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
    }
}