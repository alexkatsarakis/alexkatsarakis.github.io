import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

class Plane extends ActionObject {
    
    constructor({name,texture,rotation,dim}){
        super(name);
        this.geometry = new THREE.PlaneGeometry( (dim&&dim.width)?dim.width:1, (dim&&dim.height)?dim.height:1, 32 );
        let materialInfo = {};

        materialInfo.side = THREE.DoubleSide;
        if(texture) materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;
        this.mesh.userData = this;
        if(rotation)this.mesh.rotation.x = rotation.x;

        this.options.push("removeObject");

    }

    animate(){
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.z += 0.01;
    }

}


bb.fastInstall('objects','Plane', Plane);