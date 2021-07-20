import App from './Engine/app.js'

import bb from './utils/blackboard.js'
import assert from './utils/assert.js'
import installWatches from './utils/watches.js'
import utils from './utils/utils.js'


import inputManager from './Engine/input/inputManager.js'
import objectManager from './Engine/renderer/ObjectManager.js'
import AnimationManager from './Engine/animations/animations.js'
import CollisionManager from './Engine/collisions/collisions.js'
import SoundManager from './Engine/sound/sound.js'
import ClockManager from './Engine/clock/ClockManager.js'
import ScriptingManager from './Engine/scripting/scripting.js'
import SaveManager from './Engine/save/save.js'

/**
 * @class _Engine is a syntactic sugar for setters/getters
 */
class _Engine {

    /**
     * @private _manager local variable that stores all the installed managers
     * @private _app is a local variable that saves the app (gameloop and etc)
     */
    _managers
    _app


    /**
     * @method constructor initialise the local variables and 
     * install all the Core Managers needed for the application to run
     */
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
    }


    /**
     * 
     * @param {string} name: Will remove the Manager with that name
     * @throws Error if the name doesn't correspond to an installed manager 
     */
    removeManager(name){
        assert.check(this._managers[name],'Removing a manager that doesn\'t exist');
        delete this._managers[name]
        delete this[name];
        bb.fastRemove('Engine',name);
    }

    /**
     * 
     * @param {string} name: Will register a manager with that name
     * @param {Manager} manager: The Manager that will be stored
     * @throws Error if the given name is already binded by another Manager
     */
    installManager(name, manager){
        assert.check(!this._managers[name],'Installing a manager that already exists');
        this._managers[name] = manager;
        this[name] = manager;
        bb.fastInstall('Engine',name,manager);
    }

    /**
     * 
     * @param {string} name: the name of a manager 
     * @returns {boolean} if there is a Manager with that name installed
     */
    hasManager(name){
        return name in this._managers;
    }
    

    forEachManager(cb){
        for(let i in this._managers){
            cb(i,this._managers[i]);
        }
    }

    /**
     * Responsible to start the game loop.
     */
    start(){
        this.app.main();
        bb.fastInstall('Engine','Self',this);
    
        const aliveItems = this.ObjectManager.objects;
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
});

app.addLoadFunction(()=>{
    for(let i in Engine._managers){
        Engine._managers[i].onLoad();
    }

    installWatches();
});

game.render = ()=>{
    Engine.ObjectManager.renderAll();
};

game.input = ()=>{
    // Engine.InputManager.pollKeys();
    Engine.InputManager.getReleasedKeys().forEach((key)=>utils.inputHandler('Unpressed'+key));
    Engine.InputManager.getPressedKeys().forEach((key)=>utils.inputHandler('Pressed'+key));
};

game.animation = ()=>{
    Engine.AnimationManager.progress(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{
};

game.physics = ()=>{
};

game.collisions = ()=>{
    Engine.CollisionManager.checkAndInvoke();
};

game.userCode = ()=>{
    const aliveItems = Engine.ObjectManager.objects;
    for(let i in aliveItems){
        aliveItems[i].newFrame();
    }
};

game.extra = ()=>{
    for(let i in Engine._managers){
        Engine._managers[i].onUpdate();
    }
};

export default Engine;