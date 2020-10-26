import './dom/renderer.js'
import './454GameEngine/renderer.js'
// import './pixi/renderer.js'
// import './threejs/renderer.js'

import bb from '../utils/blackboard.js'

import changeFocus from '../transitionHandlers/focusedObject.js'

let clickWrapper = document.createElement('div');
    clickWrapper.id = "clickWrapper";
    clickWrapper.style.width = window.innerWidth + 'px';
    clickWrapper.style.height = window.innerHeight + 'px';
    clickWrapper.style.opacity = 0;
    clickWrapper.style.position = 'absolute';
    clickWrapper.style.top = 0;
    clickWrapper.style.left = 0;
    document.body.appendChild(clickWrapper);

clickWrapper.addEventListener('click',(ev)=>{
    let funcs = bb.fastGet('renderer','leftClick');
    let anythingFocused = false;
    for(var f in funcs){
        anythingFocused = funcs[f](ev);
        if(anythingFocused)break;
    }
    if(!anythingFocused)changeFocus(undefined);
});

clickWrapper.addEventListener('mousedown',(ev)=>{
    if(bb.fastGet('state','mode') !== "editing")return;
    let funcs = bb.fastGet('renderer','mouseDown');
    for(var f in funcs){
        if(funcs[f](ev))break;
    }
});

clickWrapper.addEventListener('contextmenu',(ev) => {
    let funcs = bb.fastGet('renderer','rightClick');
    for(var f in funcs){
        if(funcs[f](ev))break;
    }
})