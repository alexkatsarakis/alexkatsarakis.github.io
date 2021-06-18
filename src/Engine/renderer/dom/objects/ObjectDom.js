import Object from '../../../objects/Object.js'

import stage from '../../EnvironmentObject.js'

import scene from './Scene.js'
import objectManager from '../../ObjectManager.js'

export default class ObjectDom extends Object{
    div
    _x
    _y

    constructor(name,id,extra){
        super(name,id);
                
        this._state = 'loaded';
        if(extra.div){
            if(typeof extra.div === 'string'){
                const temp = document.createElement('div');
                temp.innerHTML = extra.div;
                this.div = temp.firstChild;
            }else{
                this.div = extra.div;
            }
        }
        else this.createElement({name,...extra});


        this.renderer = 'dom';
        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {if(this.getOption('isMovable'))this._x = value;},
            getValue: () => {return this._x;}//return this.getMapCoords()[0];}
        });

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            onChange: (value) => {if(this.getOption('isMovable'))this._y = value;},
            getValue: () => {return this._y;}//return this.getMapCoords()[1]}
        });

        this.data.valueHandler.registerValue('rotation',{
            tag: "positional",
            onChange: (value) => {this.div.style.transform = "rotate("+value+"deg)"},
            getValue: () => {
                const val = this.div.style.getPropertyValue("transform");
                return (val)?val.slice(7,-4):0;
            }
        });

        this.data.valueHandler.registerValue('colour',{
            tag: "texture",
            onChange: (value) => this.div.style.backgroundColor = value,
            getValue: () => {return this.div.style.backgroundColor;}
        });

        this.data.optionHandler.registerOption('moveThroughGrid', 'user', true);

        this._stage = stage;
    }

    toString(){
        const toSave = JSON.parse(super.toString());
        toSave.extra = {
            div: this.div.outerHTML
        }
        return JSON.stringify(toSave);
    }

    getObject(){
        return this.div;
    }

    createElement(){
        throw Error("createElement must be implemented for every Dom object")
    }    
    
    // THE FOLLOWING FUNC IS JUST FOR PERFORMANCE REASONS
    // INSTEAD OF
            // getMapCoords(){
            //     if(!this.getOption('moveWithScroll'))
            //         return [this._x, this._y];
            //     return [this._x - this._stage.getValue('x'),this._y- this._stage.getValue('y')];
            // }
    getMapCoords(){
        if(!this.data.optionHandler._regOptions['moveWithScroll']?.val)
            return [this._x, this._y];
        return [this._x - this._stage._x,this._y - this._stage._y];
    }

    animate(){}

    add(){
        this._state = 'alive';
        objectManager.addToWorld(this);
        scene.addItem(this);
    }

    remove(){
        this._state = 'removed';
        super.remove();
        objectManager.removeFromWorld(this);
        scene.remove(this);
    }

    addDivToScene(){
        scene.addItem(this);
    }

    removeDivFromScene(){
        if(this._state === 'alive')
            scene.remove(this);
    }

    render(){        
        if(!this.data.optionHandler._regOptions['isVisible']?.val){
            this.div.style.visibility = 'hidden';
            return;
        }

        const [X,Y] = this.getMapCoords();
        this.div.style.left = X + 'px';
        this.div.style.top  = Y + 'px';
        this.div.style.visibility = 'visible';
    }

}