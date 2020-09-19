import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'
<<<<<<< HEAD
import Value from '../../../objects/Value.js'
=======
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611

import scene from './Scene.js'
function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}
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

        this.values['z'] = new Value({
            onChange: (value) => this.mesh.position.z = value,
            getValue: () => {return this.mesh.position.z.toFixed(2);}
        });

        this.values['colour'] = new Value({
            onChange: (value) => this.material.color = new THREE.Color(value),
            getValue: () => {return "#"+this.material.color.getHexString();}
        });
    }

    setColor(col){
        this.material.color = new THREE.Color(col);
    }

    setPosition(x,y,z = 0){
        // [x,y] = fromPercentageToPx(x,y);
        // [x,y] = translator(x,y);
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
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

    move(x,y,z = 0){
        if(!this.options['isMovable'])return;
        // [x,y] = translator(x,y);
        this.mesh.position.x += x;
        this.mesh.position.y += y;
        this.mesh.position.z += z;
    }

    animate(){}

<<<<<<< HEAD
    setName(newName){
        bb.fastRemove('liveObjects',this.name);
        if(bb.fastGet('state','player') === this.name)bb.fastSet('state','player',newName);
        this.name = newName;
        this.mesh.name = newName;
        bb.fastSet('liveObjects',this.name,this);
    }

=======
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611
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