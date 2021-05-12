import MatterJS from './matter/matter.js'

import Engine from '../../Engine.js'

import Manager from '../../Engine/Manager.js'
import bb from '../../utils/blackboard.js'
export default class PhysicsManager extends Manager{
    _pe

    constructor(){
        super();
        this._pe = new MatterJS();
        Engine.game.physics = ()=>{
            Engine.PhysicsManager.update();
        };
        bb.installWatch('events','addObject', (it) => this.addToWorld(it));
    }


    addToWorld(item){
        bb.installWatch('events','addObject', (item) => this.addToWorld(item));
        
        if(Engine.ObjectManager.isSystemObject(item.objectID))return;
        
        const obj = Engine.ObjectManager.objects[item.objectID];
        this._pe.addToWorld(obj);
    }

    removeFromWorld(item){
        this._pe.removeFromWorld(item);
    }

    force(rObj,position,force){
        this._pe.applyForce(rObj,position,force);
    }

    move(obj,pos){
        this._pe.moveObject(obj,pos)
    }
        
    update(){
        this._pe.update();
    }

}