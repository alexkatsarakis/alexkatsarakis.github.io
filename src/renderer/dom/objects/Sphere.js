import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Sphere extends ActionObject {
    
    constructor({name,texture,dim}){
        super(name);
        this.div = document.createElement('div');
        this.div.id = name;
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.div.style.width = X+"px";
        this.div.style.height = X+"px";

        
        if(texture){
            this.div.style.backgroundImage = texture;
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
        this.div.style.position = "absolute";
        this.div.style.borderRadius = "1000px";
        
        this.options.push('move');
        this.options.push('changeColor');
        this.options.push("removeObject");

    }

    animate(){
        // this.mesh.position.x += 0.01;
        // this.mesh.position.y += 0.01;
    }
}

bb.fastInstall('objects','Sphere',Sphere);