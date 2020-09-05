function changeBackground(color){
    bb.fastGet('sceneComponents','scene').background = new THREE.Color( color );
}

bb.fastSet('actions','changeBackground',changeBackground)