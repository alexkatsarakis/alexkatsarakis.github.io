import './utils/initializationManager.js'

import App from './app.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'
import inputManager from './utils/inputManager.js'

import init from '../assets/json/pacman.js' //json
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
let animationFilmHolder;
let animationManager;

app.addInitialiseFunction(()=>{

    document.body.style.backgroundColor = init.state.background_color;
    if(init.state.background)document.body.style.backgroundImage = `url('${init.state.background}')`;

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
            if(item.fields){
                for(let f in item.fields){
                    it.addValue(f,item.fields[f]);
                }
            }
            if(item.events){
                for(let e in item.events){
                    it.addEvent(item.events[e]);
                }
            }
            it.add();
            if(bb.fastGet('physics','addToWorld'))bb.fastGet('physics','addToWorld')(it);
        }
    });

    aliveItems = bb.getComponent('liveObjects').itemMap;
    animatorManager = bb.fastGet('gameEngine','animatorManager');
    animationManager = bb.fastGet('gameEngine','animationManager');
    animationFilmHolder = bb.fastGet('gameEngine', 'animationFilmHolder');
});

app.addLoadFunction(()=>{
    animationFilmHolder.loadAll();
    animationManager.loadAll();
    animationFilmHolder.getAssetsToLoad().forEach((asset)=>{
        if(!bb.fastGet('assets',asset)){
            let img = new Image();
            img.src = asset;
            bb.fastInstall('assets',asset,img);
        }
    });
    bb.print();
});



game.render = ()=>{
    bb.fastGet('renderer','render').forEach((it)=>it());
};

game.input = ()=>{
    inputManager.getPressedKeys().forEach((key)=>inpHandler(key));
};

game.animation = ()=>{
    animatorManager.progress(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{

}

game.physics = ()=>{
    if(bb.fastGet('physics','update'))bb.fastGet('physics','update')()
};

function collided(obj1,obj2){
    if(obj1 === obj2)return;
    if(!obj1.getOption('isCollidable') || !obj2.getOption('isCollidable'))return;
    // console.log(obj1,obj2);
    let pos1 = obj1.getPositional();
    let pos2 = obj2.getPositional();
    // debugger;
    if(pos1.x >= pos2.x + pos2.width || pos2.x >= pos1.x + pos1.width){
        return false;
    }

    if(pos1.y >= pos2.y + pos2.height || pos2.y >= pos1.y + pos1.height){
        return false;
    }

    obj1.triggerEvent('onCollision');
    obj2.triggerEvent('onCollision');
    console.log(obj1.name,obj2.name);
}

game.collisions = ()=>{
    for(let i in aliveItems){
        for(let j in aliveItems){
            collided(aliveItems[i],aliveItems[j]);
        }
    }
};

game.userCode = ()=>{
    for(let i in aliveItems){
        aliveItems[i].newFrame();
    }
};

game.extra = ()=>{
    FPSCounter();
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