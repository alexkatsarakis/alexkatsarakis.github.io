import Object from './ObjectThreeJS.js'

import bb from '../../../utils/blackboard.js'

class Sphere extends Object {
    
    constructor({name,texture}){
        super(name);
        this.geometry = new THREE.SphereGeometry();
        
        let materialInfo = {};

        if(texture)materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;

    }

    getCategory(){
        return "Sphere";
    }
}

bb.fastInstall('objects','Sphere',Sphere);