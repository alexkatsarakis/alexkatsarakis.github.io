
var raycaster = new THREE.Raycaster();
var mouse = { x : 0, y : 0 };

let inp = document.createElement("input");
inp.style.position = "absolute";
inp.style.top = "0";
inp.id = "inputss";
document.body.appendChild(inp);

let action = "alert(name);"

export function rightClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.offsetY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, bb.fastGet('sceneComponents','camera') );  

    var intersects = raycaster.intersectObjects( bb.fastGet('sceneComponents','scene').children );

    for ( var i = 0; i < intersects.length; i++ ) {
        let name = intersects[i].object.name;
        intersects[i].object.userData.setAction(document.getElementById("inputss").value);    
    }
}

export function leftClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.offsetY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, bb.fastGet('sceneComponents','camera') );  

    var intersects = raycaster.intersectObjects( bb.fastGet('sceneComponents','scene').children );
    
    for ( var i = 0; i < intersects.length; i++ ) {
        // console.log( intersects[ i ].object.name );
        eval(intersects[i].object.userData.getAction()); 
    }

}