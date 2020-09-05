import bb from '../utils/blackboard.js'

export default class Object {
    name
    material
    geometry 
    mesh

    isMovable;

    constructor(_name){
        if(!_name)name = "Unnamed Object"+Math.random(5);
        this.name = _name;
    
        this.isMovable = true;

    }

    setColor(col){
        this.material.color = new THREE.Color(col);
    }

    setPosition(x,y){
        if(!this.isMovable)return;
        this.mesh.position.x = x;
        this.mesh.position.y = y;
    }
    
    getGeometry(){
        return this.geometry;
    }

    getObject(){
        return this.mesh;
    }

    getMaterial(){
        return this.material;
    }

    move(x,y){
        if(!this.isMovable)return;
        this.mesh.position.x += x;
        this.mesh.position.y += y;
    }

    animate(){}

    remove(){
        console.log("removing "+this.name);
        bb.fastRemove('liveObjects',this.name);
        bb.fastSet('state','focusedObject',undefined);
        let scene = bb.fastGet('liveObjects','scene').getScene();
        let myself = scene.getObjectByName(this.name);
        scene.remove(myself);
    }

}