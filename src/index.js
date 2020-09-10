import './utils/initialisationManager.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'

import init from '../assets/json/init.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json

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
    console.log(ev.offsetX,ev.offsetY);
    let funcs = bb.fastGet('renderer','leftClick');
    for(var f in funcs){
        if(funcs[f](ev))break;
    }
})

clickWrapper.addEventListener('contextmenu',(ev) => {
    console.log(ev.offsetX,ev.offsetY);
    let funcs = bb.fastGet('renderer','rightClick');
    for(var f in funcs){
        if(funcs[f](ev))break;
    }
})

init.objects.forEach((item)=>{
    let category = bb.fastGet("objects",item.category);
    if(typeof category !== "function"){console.log("There is no category "+item.category)}
    if(item.meta.name === undefined 
    || !bb.fastGet('liveObjects',item.meta.name)){
        let it = new category(item.meta);
        bb.fastSet('liveObjects',item.meta.name,it);
        if(item.color)it.setColor(item.color);
        if(item.position)it.setPosition(item.position.x,item.position.y);
        it.add();
        console.log(item);
    }
})

document.onkeydown = function(ev) {
    // console.log(ev);
    for(var key in keyToAction){
        if(ev.code === key){
            console.log(keyToAction[key]);
            // keyToAction[key].map((action)=>bb.fastGet('actions',action)(document.getElementById("inputss").value));
            keyToAction[key].map((action)=>bb.fastGet('actions',action)(bb.fastGet('state','focusedObject')));
        }
    }
    if(localStorage.getItem(ev.key))eval(localStorage.getItem(ev.key));
};



let aliveItems = bb.getComponent('liveObjects').itemMap;

bb.print();


function gameLoop() {
    requestAnimationFrame( gameLoop );
    
    FPSCounter();
    for(var it in aliveItems){
        aliveItems[it].animate();
    }
    bb.fastGet('renderer','render').forEach((it)=>it())
    
}
gameLoop();