import './utils/initializationManager.js'

import App from './app.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'
import inputManager from './utils/inputManager.js'

import init from '../assets/json/init.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json


let app = new App();
let game = app.game;

function inpHandler(key) {
    if(keyToAction[key])keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    if(bb.fastGet('state','mode') === 'editing')return;
    if(localStorage.getItem(key))bb.fastGet('scripting','executeCode')(localStorage.getItem(key));
};


let aliveItems;
let animatorManager;

app.addInitialiseFunction(()=>{

    init.objects.forEach((item)=>{
        let category = bb.fastGet('objects',item.category);
        if(typeof category !== "function"){console.log("There is no category "+item.category)}
        if(item.meta.name === undefined 
        || !bb.fastGet('liveObjects',item.meta.name)){
            if(!category)return;
            let it = new category(item.meta);
            if(item.color)it.setColor(item.color);
            if(item.position)it.setPosition(item.position.x,item.position.y);
            if(item.attributes)item.attributes.forEach((attr)=>it.setOption(attr,true));
            it.add();
            if(bb.fastGet('physics','addToWorld'))bb.fastGet('physics','addToWorld')(it);
        }
    });

    aliveItems = bb.getComponent('liveObjects').itemMap;
    animatorManager = bb.fastGet('gameEngine','animatorManager');
});

app.addLoadFunction(()=>{
    let animationFilmHolder = bb.fastGet('gameEngine', 'animationFilmHolder');
    animationFilmHolder.loadAll();
    bb.fastGet('gameEngine', 'animationManager').loadAll();

    let asset = animationFilmHolder.getFilm("mario_big_right_walking").bitmap;
    if(!bb.fastGet('assets',asset)){
        let img = new Image();
        img.src = asset;
        bb.fastInstall('assets',asset,img);
    }
    
    bb.print();
});


game.input = ()=>{
    inputManager.getPressedKeys().forEach((key)=>inpHandler(key));
};

game.animation = ()=>{
    animatorManager.progress(new Date().getTime());
}

game.render= ()=>{
    bb.fastGet('renderer','render').forEach((it)=>it());
};

game.userCode = ()=>{
    for(let i in aliveItems){
        aliveItems[i].newFrame();
    }
};

game.extra = ()=>{
    FPSCounter();
};

game.physics = ()=>{
    if(bb.fastGet('physics','update'))bb.fastGet('physics','update')()
};



// TODO: Change this function to an appropriate file

function triggerStateModeChange(e){
    if(e === 'play'){
        for(let i in aliveItems)
            aliveItems[i].triggerEvent('onGameStart');
    }
    bb.installWatch('state','mode',triggerStateModeChange);
}

bb.installWatch('state','mode',triggerStateModeChange);



app.main();