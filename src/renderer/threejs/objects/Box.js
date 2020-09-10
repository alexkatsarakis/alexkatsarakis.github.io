import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

class Box extends ActionObject {
    
    constructor({name,texture,dim}){
        super(name);
        this.geometry = new THREE.BoxGeometry((dim&&dim.width)?dim.width:1, (dim&&dim.height)?dim.height:1,1);
        let materialInfo = {};

        if(texture)materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;

        this.options.push('changeColor');
        this.options.push("removeObject");
    }

    animate(){
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.01;
    }

}


bb.fastInstall('objects','Box',Box);