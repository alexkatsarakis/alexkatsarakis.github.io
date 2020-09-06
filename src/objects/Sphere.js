import Object from './Object.js'

import bb from '../utils/blackboard.js'

class Sphere extends Object {
    action;
    constructor({name,texture}){
        super(name);
        this.geometry = new THREE.SphereGeometry();
        
        let materialInfo = {};

        if(texture)materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;
        
        this.options.push('move');
        this.options.push('changeColor');
        this.options.push("removeObject");

    }

    animate(){
        // this.mesh.position.x += 0.01;
        // this.mesh.position.y += 0.01;
    }

    setAction(str){
        this.action = str;
    }

    getAction(){
        return this.action;
    }
}

bb.fastSet('objects','Sphere',Sphere);