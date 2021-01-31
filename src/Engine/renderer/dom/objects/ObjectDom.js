import Object from '../../../objects/Object.js'

import Value from '../../../objects/Value.js'

import scene from './Scene.js'
import objectManager from '../../renderer.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

export default class ObjectDom extends Object{
    div

    constructor(name,id){
        super(name,id);
        this.renderer = 'dom';
        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {if(this.getOption('isMovable'))this.div.style.left = value+"px"},
            getValue: () => {return this.div.offsetLeft;}
        });

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            onChange: (value) => {if(this.getOption('isMovable'))this.div.style.top = value+"px"},
            getValue: () => {return this.div.offsetTop;}
        });

        this.data.valueHandler.registerValue('rotation',{
            tag: "positional",
            onChange: (value) => {this.div.style.transform = "rotate("+value+"deg)"},
            getValue: () => {
                let val = this.div.style.getPropertyValue("transform");
                return (val)?val.slice(7,-4):0;
            }
        });

        this.data.valueHandler.registerValue('colour',{
            tag: "texture",
            onChange: (value) => this.div.style.backgroundColor = value,
            getValue: () => {return this.div.style.backgroundColor;}
        });
    }

    setColor(col){
        this.div.style.backgroundColor = col;
    }

    setPosition(x,y){
        // [x,y] = fromPercentageToPx(x,y);
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
        if(!this.getOption('isMovable'))return;
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

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    add(){
        objectManager.addToWorld(this);
        scene.addItem(this.div);
    }

    remove(){
        this.clear();
        objectManager.removeFromWorld(this);
        scene.remove(this.div);
    }

}