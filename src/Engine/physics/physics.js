import MatterJS from './matter/matter.js'


export default class PhysicsManager {
    _pe

    constructor(){
        this._pe = new MatterJS();
    }

    addToWorld(item){
        this._pe.addToWorld(item);
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