import Object from './Object.js'

import bb from '../utils/blackboard.js'

class Line extends Object {
    
    action;
    constructor({name,texture,point1,point2}){
        super(name);
        var points = [];
        points.push( new THREE.Vector3( point1[0],point1[1],point1[2] ) );
        points.push( new THREE.Vector3( point2[0],point2[1],point2[2] ) );

        this.geometry = new THREE.BufferGeometry().setFromPoints( points );
        let materialInfo = {};

        if(texture)materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.LineBasicMaterial( materialInfo );
        this.mesh = new THREE.Line( this.geometry, this.material );
        this.mesh.name = name;

        this.options.push('changeColor');
        this.options.push("removeObject");

        this.isMovable = false;
    }

    animate(){
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.01;
    }

    setAction(str){
        this.action = str;
    }

    getAction(){
        return this.action;
    }

}


bb.fastSet('objects','Line',Line);