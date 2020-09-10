import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Box extends ActionObject {
    
    constructor({name,texture,dim}){
        super(name);
        
        this.div = document.createElement('div');
        this.div.id = name;
        let [defaultX,defaultY] = fromPercentageToPx(5,5);
        this.div.style.width = (dim&&dim.width)?dim.width: defaultX+"px";
        this.div.style.height = (dim&&dim.height)?dim.height: defaultX+"px";

        
        if(texture){
            this.div.style.backgroundImage = "url('"+texture+"')";
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
        this.div.style.position = "absolute";

        this.options.push('changeColor');
        this.options.push("removeObject");
    }

    animate(){
        
    }

}


bb.fastInstall('objects','Box',Box);