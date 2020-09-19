import './utils/initializationManager.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'
import inputManager from './utils/inputManager.js'

import init from '../assets/json/init.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json

init.objects.forEach((item)=>{
    let category = bb.fastGet("objects",item.category);
    if(typeof category !== "function"){console.log("There is no category "+item.category)}
    if(item.meta.name === undefined 
    || !bb.fastGet('liveObjects',item.meta.name)){
        let it = new category(item.meta);
        if(item.color)it.setColor(item.color);
        if(item.position)it.setPosition(item.position.x,item.position.y,item.position.z);
        it.add();
    }
})

function inpHandler(key) {
    if(keyToAction[key])keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    if(bb.fastGet('state','mode') === 'editing')return;
    if(localStorage.getItem(key))bb.fastGet('scripting','executeCode')(localStorage.getItem(key));
};


let aliveItems = bb.getComponent('liveObjects').itemMap;

bb.print();


function gameLoop() {
    requestAnimationFrame( gameLoop );
    
    FPSCounter();
    inputManager.getPressedKeys().forEach((key)=>inpHandler(key));
    // console.log(inputManager.getPressedKeys());
    for(var it in aliveItems){
        aliveItems[it].newFrame();
    }
    bb.fastGet('renderer','render').forEach((it)=>it())
    
}
gameLoop();