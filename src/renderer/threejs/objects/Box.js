import Object from './ObjectThreeJS.js'

import bb from '../../../utils/blackboard.js'

class Box extends Object {
    goal
    constructor({name,texture,dim}){
        super(name);
        bb.fastInstall('state','player',name);
        this.geometry = new THREE.BoxGeometry((dim&&dim.width)?dim.width:1, (dim&&dim.height)?dim.height:1,(dim&&dim.depth)?dim.depth:1);
        let materialInfo = {};

        if(texture)materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;

        this.goal = new THREE.Object3D;
        this.goal.position.set(0, 5, -5);
        this.mesh.add( this.goal );

        this.events['onEachFrame'] = localStorage.getItem(this.name+"_onEachFrame");

    }

    getGoal(){
        return this.goal;
    }


    getCategory(){
        return "Box";
    }

}


bb.fastInstall('objects','Box',Box);