import App from './Engine/app.js'

import bb from './utils/blackboard.js'
import assert from './utils/assert.js'
import installWatches from './utils/watches.js'
import utils from './utils/utils.js'


import inputManager from './Engine/input/inputManager.js'
import objectManager from './Engine/renderer/ObjectManager.js'
import AnimationManager from './Engine/animations/animations.js'
import CollisionManager from './Engine/collisions/collisions.js'
// import PhysicsManager from './Engine/physics/physics.js'
import SoundManager from './Engine/sound/sound.js'
import ClockManager from './Engine/clock/ClockManager.js'
import ScriptingManager from './Engine/scripting/scripting.js'
import SaveManager from './Engine/save/save.js'


class _Engine {
    _managers
    _app

    constructor(){
        this._managers = {};
        this._app = new App();

        this.installManager('AnimationManager', new AnimationManager());

        this.installManager('CollisionManager', new CollisionManager());
    
        this.installManager('SoundManager', new SoundManager());
    
        this.installManager('ObjectManager', objectManager);
    
        this.installManager('InputManager', inputManager);
    
        this.installManager('ClockManager', new ClockManager());
    
        this.installManager('ScriptingManager', new ScriptingManager());

        this.installManager('SaveManager', new SaveManager());
    
        // this.installManager('PhysicsManager', new PhysicsManager());
    }

    installManager(name, manager){
        assert.check(!this._managers[name],'Installing a manager that already exists');
        this._managers[name] = manager;
        this[name] = manager;
        bb.fastInstall('Engine',name,manager);
    }

    hasManager(name){
        return name in this._managers;
    }

    start(){
        Engine.app.main();
        bb.fastInstall('Engine','Self',Engine);
    
        let aliveItems = Engine.ObjectManager.objects;
        for(let i in aliveItems)
            aliveItems[i].triggerEvent('onGameStart');
    
        bb.print();
    }

    get app(){
        return this._app;
    }

    get game(){
        return this._app.game;
    }

}

const Engine = new _Engine();

const app = Engine.app;
const game = app.game;

app.addInitialiseFunction(()=>{
    let init = Engine.initInfo;

    for(let i in init.objects){
        utils.createObject(init.objects[i]);
    }
});

app.addLoadFunction(()=>{
    Engine.AnimationManager.load();
    Engine.AnimationManager.requiredAssets().forEach((asset)=>{
        if(!bb.fastGet('assets',asset)){
            let img = new Image();
            img.src = asset;
            bb.fastInstall('assets',asset,img);
        }
    });

    Engine.ClockManager.onLoad();

    installWatches();
});

game.render = ()=>{
    Engine.ObjectManager.renderAll();
};

game.input = ()=>{
    // if(game.gameState === 3)return; // 3 === PAUSED
    Engine.InputManager.pollKeys();
    Engine.InputManager.getReleasedKeys().forEach((key)=>utils.inputHandler('Unpressed'+key));
    Engine.InputManager.getPressedKeys().forEach((key)=>utils.inputHandler('Pressed'+key));
};

game.animation = ()=>{
    Engine.AnimationManager.progress(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{
};

game.physics = ()=>{
    if(Engine.PhysicsManager)Engine.PhysicsManager.update();
};

game.collisions = ()=>{
    Engine.CollisionManager.checkAndInvoke(Engine.ObjectManager.objects);
};

game.userCode = ()=>{
    const aliveItems = Engine.ObjectManager.objects;
    for(let i in aliveItems){
        aliveItems[i].newFrame();
    }
};

game.extra = ()=>{
    Engine.ClockManager.update();
};

export default Engine;