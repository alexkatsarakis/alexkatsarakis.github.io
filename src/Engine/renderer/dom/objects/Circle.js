import Object from './ObjectDom.js'

import Value from '../../../objects/Value.js'

function fromPercentageToPx(x,y){
    // x = x/100 * window.innerWidth;
    // y = y/100 * window.innerHeight;
    return [x,y];
}

export default class Circle extends Object {
    
    constructor({name,texture,dim,div},id){
        super(name,id);
        if(div)this.div = div;
        else this.createElement({name,texture,dim});

        this.data.valueHandler.registerValue('r',{
            tag: "positional",
            onChange: (value) => {this.div.style.width = value*2+"px";this.div.style.height = value*2+"px";},
            getValue: () => {return (this.div.style.width.slice(0,-2)/2);}
        });

        this._category = 'Circle';
    }


    createElement({name,texture,dim}){
        this.div = document.createElement('div');
        this.div.id = name;
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.div.style.width = X+"px";
        this.div.style.height = X+"px";
        this.div.style.position = "absolute";
        this.div.style.borderRadius = "1000px";

        
        if(texture){
            this.div.style.backgroundImage = texture;
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
    }
}