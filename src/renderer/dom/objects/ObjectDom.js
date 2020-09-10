import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'

import scene from './Scene.js'

function pxToNumber(str){
    str.substr(1,str.length-4);
    return parseInt(str);
}

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
        this.div.style.left = (pxToNumber(this.div.style.left)+x) +"px";
        this.div.style.top = (pxToNumber(this.div.style.top)+y) +"px";
    }

    getBoundingBox(){
        return {
            x: pxToNumber(this.div.style.left),
            y: pxToNumber(this.div.style.top),
            width: pxToNumber(this.div.style.width),
            height: pxToNumber(this.div.style.height)
        }
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