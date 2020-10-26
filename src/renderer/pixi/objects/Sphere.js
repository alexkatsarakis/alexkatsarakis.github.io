import bb from '../../../utils/blackboard.js'

import Object from './ObjectPixi.js'

import Value from '../../../objects/Value.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Sphere extends Object {
    constructor({name,texture,dim}){
        super(name);
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.obj = new PIXI.Graphics();
        this.obj.beginFill(0xffffff);
        this.obj.drawCircle(30, 30, 30);
        this.obj.endFill();
        this.obj.width = X;
        this.obj.height = X;

        this.obj.name = name;
        this.setColor("#ffffff");

        this.values['r'] = new Value({
            tag: "positional",
            onChange: (value) => {this.obj.width = value*2;this.obj.height = value*2;},
            getValue: () => {return this.obj.width/2;}
        });

    }

    getCategory(){
        return "Sphere";
    }
}  

bb.fastInstall('objects','Sphere',Sphere);