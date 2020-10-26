import bb from '../../../utils/blackboard.js'

import Object from './ObjectPixi.js'

import Value from '../../../objects/Value.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Box extends Object {
    constructor({name,texture,dim}){
        super(name);
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.obj = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.obj.width = X;
        this.obj.height = Y;
        this.obj.name = name;
        this.setColor("#ffffff");

        this.values['width'] = new Value({
            tag: "positional",
            onChange: (value) => {this.obj.width = value;},
            getValue: () => {return this.obj.width;}
        });

        this.values['height'] = new Value({
            tag: "positional",
            onChange: (value) => {this.obj.height = value;},
            getValue: () => {return this.obj.height;}
        });

    }

    getCategory(){
        return "Box";
    }
}  

bb.fastInstall('objects','Box',Box);