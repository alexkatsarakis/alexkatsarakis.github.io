export default class Object {
    name
    material
    geometry 
    mesh

    constructor(_name){
        if(!_name)name = "Unnamed Object"+Math.random(5);
        this.name = _name;
        this.material = new THREE.MeshBasicMaterial( );
        this.material.name = _name;
    }

    setColor(col){
        this.material.color = new THREE.Color(col);
    }

    setPosition(x,y){
        this.mesh.position.x = x;
        this.mesh.position.y = y;
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

    animate(){}

}