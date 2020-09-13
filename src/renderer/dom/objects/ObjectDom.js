import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'

import scene from './Scene.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

export default class ObjectDom extends Object{
    div

    constructor(name){
        super(name);
        this.renderer = 'dom';
    }

    setColor(col){
        this.div.style.backgroundColor = col;
    }

    setPosition(x,y){
        [x,y] = fromPercentageToPx(x,y);
        this.div.style.left = x +"px";
        this.div.style.top = y +"px";
    }

    getPosition(){
        return [this.div.style.top,this.div.style.left];
    }

    getObject(){
        return this.div;
    }

    move(x,y){
        this.div.style.left = (this.div.offsetLeft+x) +"px";
        this.div.style.top = (this.div.offsetTop+y) +"px";
    }

    getBoundingBox(){
        return {
            x: (this.div.offsetLeft),
            y: (this.div.offsetTop),
            width: (this.div.offsetWidth),
            height: (this.div.offsetHeight)
        }
    }

    createElement(){
        throw Error("createElement must be implemented for every Dom object")
    }

    animate(){}

    add(){
        scene.addItem(this.div);
    }

    remove(){
        console.log("removing "+this.name);
        bb.fastRemove('liveObjects',this.name);
        scene.remove(this.div);
    }

}