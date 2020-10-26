import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'
import Value from '../../../objects/Value.js'

import scene from './Scene.js'

export default class ObjectThreeJS extends Object{
    material
    geometry 
    mesh

    constructor(name){
        super(name);
        this.renderer = 'threejs';
        
        this.values['x'] = new Value({
            onChange: (value) => this.mesh.position.x = value,
            getValue: () => {return this.mesh.position.x.toFixed(2);}
        });

        this.values['y'] = new Value({
            onChange: (value) => this.mesh.position.y = value,
            getValue: () => {return this.mesh.position.y.toFixed(2);}
        });

        this.values['colour'] = new Value({
            onChange: (value) => this.material.color = new THREE.Color(value),
            getValue: () => {return "#"+this.material.color.getHexString();}
        });
    }

    setColor(col){
        this.material.color = new THREE.Color(col);
    }

    setPosition(x,y){
        this.mesh.position.x = x;
        this.mesh.position.y = y;
    }

    getPosition(){
        return this.mesh.position;
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
        if(!this.options['isMovable'])return;
        this.mesh.position.x += x;
        this.mesh.position.y += y;
    }

    animate(){}

    setName(newName){
        bb.fastRemove('liveObjects',this.name);
        if(bb.fastGet('state','player') === this)bb.fastSet('state','player',this);
        this.name = newName;
        this.mesh.name = newName;
        bb.fastSet('liveObjects',this.name,this);
    }

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    add(){
        bb.fastSet('liveObjects',this.name,this);
        scene.addItem(this.mesh);
    }

    remove(){
        bb.fastRemove('liveObjects',this.name);
        scene.getScene().remove(this.mesh);
    }

}