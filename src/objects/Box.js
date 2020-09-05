import Object from './Object.js'

class Box extends Object {
    
    action;
    constructor(name){
        super(name);
        this.geometry = new THREE.BoxGeometry();
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;
        this.mesh.userData = this;
    }

    animate(){
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

    setAction(str){
        this.action = str;
    }

    getAction(){
        return this.action;
    }

}


bb.fastSet('objects','Box',Box);