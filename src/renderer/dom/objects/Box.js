import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Box extends ActionObject {
    
    constructor({name,texture,dim,div}){
        super(name);
        if(div)this.div = div;
        else this.createElement({name,texture,dim});

        this.options.push('changeColor');
        this.options.push("removeObject");

        this.events['onEachFrame'] = localStorage.getItem(this.name+"_onEachFrame");
        this.events['test1'] = localStorage.getItem(this.name+"_test1");
        this.events['test2'] = localStorage.getItem(this.name+"_test2");

    }

    createElement({name,texture,dim}){
        this.div = document.createElement('div');
        this.div.id = name;
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.div.style.width = X+"px";
        this.div.style.height = X+"px";
        this.div.style.position = "absolute";
        if(texture){
            this.div.style.backgroundImage = "url('"+texture+"')";
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
    }

    animate(){
        this.triggerEvent('onEachFrame');
        // this.triggerEvent('onClick');
        // console.log("a");
    }

}


bb.fastInstall('objects','Box',Box);