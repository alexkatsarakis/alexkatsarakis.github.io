import Object from './ObjectDom.js'

import bb from '../../../utils/blackboard.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Square extends Object {
    
    constructor({name,texture,dim,div}){
        super(name);
        if(div)this.div = div;
        else this.createElement({name,texture,dim});

        this.events['onEachFrame'] = localStorage.getItem(this.name+"_onEachFrame");

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

    getCategory(){
        return "Square";
    }
}


bb.fastInstall('objects','Square',Square);