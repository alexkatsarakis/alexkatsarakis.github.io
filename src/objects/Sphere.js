import Object from './Object.js'

class Sphere extends Object {
    action;
    constructor(name){
        super(name);
        this.geometry = new THREE.SphereGeometry();
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;
        this.mesh.userData = this;
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