import Object from '../../../objects/Object.js'

import stage from '../../EnvironmentObject.js'

import scene from './Scene.js'
import objectManager from '../../ObjectManager.js'

export default class ObjectDom extends Object{
    div
    _x
    _y

    constructor(name,id){
        super(name,id);
        this.renderer = 'dom';
        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {if(this.getOption('isMovable'))this._x = value;},
            getValue: () => {return this._x;}
        });

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            onChange: (value) => {if(this.getOption('isMovable'))this._y = value;},
            getValue: () => {return this._y;}
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

        this._stage = stage;
    }

    getPosition(){
        return [this.div.style.top,this.div.style.left];
    }

    getObject(){
        return this.div;
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
    
    getMapCoords(){
        // return [this._x,this._y];
        if(!this.getOption('moveWithScroll'))
            return [this._x, this._y];
        return [this._x - this._stage.getValue('x'),this._y- this._stage.getValue('y')];
    }

    animate(){}

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    add(){
        objectManager.addToWorld(this);
        scene.addItem(this);
    }

    remove(){
        this.clear();
        objectManager.removeFromWorld(this);
        scene.remove(this);
    }

    render(){
        const [X,Y] = this.getMapCoords();
        this.div.style.left = X + 'px';
        this.div.style.top  = Y + 'px';
        this.div.style.visibility = (this.getOption('isVisible')?'visible':'hidden');
    }

}