import Object from './Object.js'

import bb from '../utils/blackboard.js'

class Plane extends Object {
    
    action;
    constructor({name,texture}){
        super(name);
        this.geometry = new THREE.PlaneGeometry( 20, 20, 32 );
        let materialInfo = {};

        materialInfo.side = THREE.DoubleSide;
        if(texture) materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;
        this.mesh.userData = this;
        this.mesh.rotation.x = -1;
    }

    animate(){
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.z += 0.01;
    }

    setAction(str){
        this.action = str;
    }

    getAction(){
        return this.action;
    }

}


bb.fastSet('objects','Plane', Plane);