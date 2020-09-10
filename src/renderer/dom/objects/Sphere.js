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
        let [defaultX,defaultY] = fromPercentageToPx(5,5);
        this.div.style.width = (dim&&dim.width)?dim.width: defaultX+"px";
        this.div.style.height = (dim&&dim.height)?dim.height: defaultX+"px";

        
        if(texture){
            this.div.style.backgroundImage = texture;
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
        this.div.style.position = "absolute";
        this.div.style.borderRadius = "50px";
        
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