import App from './Engine/app.js'
import bb from './utils/blackboard.js'

import FPSCounter from './utils/fps.js'
import inputManager from './Engine/inputManager.js'
import installWatches from './utils/watches.js'

import objectManager from './Engine/renderer/renderer.js'
import AnimationManager from './Engine/animations/animations.js'
import CollisionManager from './Engine/collisions/collisions.js'
import PhysicsManager from './Engine/physics/physics.js'
import SoundManager from './Engine/sound/sound.js'

const rend = bb.fastGet('renderer', 'render');

const app = new App();
const game = app.game;

class _Engine {
    _managers

    constructor(){
        this._managers = {};
    }

    get app(){
        return app;
    }

    get game(){
        return game;
    }

    set initInfo(info){
        this._initInfo = info;
    }

    get initInfo(){
        if(this._initInfo)return this._initInfo;
        // else throw Error('No level Info provided');
    }

    set animationBundle(an){
        this._animationBundle = an;
    }

    get animationBundle(){
        if(this._animationBundle)return this._animationBundle;
        else throw Error('No Animations provided');
    }

    set preSetAnimations(preSet){
        this._preSetAnimations = preSet;
    }

    get preSetAnimations(){
        if(this._preSetAnimations)return this._preSetAnimations;
        else throw Error('No Animations provided');
    }

    set timePaused(tp){
        this._timePaused = tp;
    }

    get timePaused(){
        return this._timePaused;
    }

    set AnimationManager(anM){
        if(!(anM instanceof AnimationManager)) throw Error('Set AnimationManager isn\'t Instance of AnimationManager');
        this._managers['AnimationManager'] = anM;
    }

    get AnimationManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['AnimationManager']) throw Error('AnimationManager wasn\'t initialised');
        return this._managers['AnimationManager'];
    }

    set CollisionManager(anM){
        if(!(anM instanceof CollisionManager)) throw Error('Set CollisionManager isn\'t Instance of CollisionManager');
        this._managers['CollisionManager'] = anM;
    }

    get CollisionManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['CollisionManager']) throw Error('CollisionManager wasn\'t initialised');
        return this._managers['CollisionManager'];
    }

    set ObjectManager(anM){
        this._managers['ObjectManager'] = anM;
    }

    get ObjectManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['ObjectManager']) throw Error('ObjectManager wasn\'t initialised');
        return this._managers['ObjectManager'];
    }

    set InputManager(anM){
        this._managers['InputManager'] = anM;
    }

    get InputManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['InputManager']) throw Error('InputManager wasn\'t initialised');
        return this._managers['InputManager'];
    }

    set SoundManager(anM){
        this._managers['SoundManager'] = anM;
    }

    get SoundManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['SoundManager']) throw Error('SoundManager wasn\'t initialised');
        return this._managers['SoundManager'];
    }

    set PhysicsManager(anM){
        this._managers['PhysicsManager'] = anM;
    }

    get PhysicsManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['PhysicsManager']) throw Error('PhysicsManager wasn\'t initialised');
        return this._managers['PhysicsManager'];
    }

}

const Engine = new _Engine();


game.render = ()=>{
    if(rend)
        rend.forEach((it)=>it());
};

app.addInitialiseFunction(()=>{
    Engine.AnimationManager = new AnimationManager(Engine.animationBundle,Engine.preSetAnimations);
    bb.fastInstall('Engine','AnimationManager',Engine.AnimationManager);

    Engine.CollisionManager = new CollisionManager();
    bb.fastInstall('Engine','CollisionManager',Engine.CollisionManager);

    Engine.SoundManager = new SoundManager();
    bb.fastInstall('Engine','SoundManager',Engine.SoundManager);

    Engine.ObjectManager = objectManager;
    bb.fastInstall('Engine','ObjectManager',Engine.ObjectManager);

    Engine.InputManager = inputManager;
    bb.fastInstall('Engine','InputManager',Engine.InputManager);

    // Engine.PhysicsManager = new PhysicsManager();
    // bb.fastInstall('Engine','PhysicsManager',Engine.PhysicsManager);

    let init = Engine.initInfo;
    if(init && init.state.background_color)document.body.style.backgroundColor = init.state.background_color;
    if(init && init.state.background)document.body.style.backgroundImage = `url('${init.state.background}')`;

    if(init)
    init.objects.forEach((item)=>{
    //     let category = Engine.ObjectManager.getConstructor(item.category);
    //     if(!category || typeof category !== "function"){console.log("There is no category "+item.category)}
    //     if(item.meta.name !== undefined){
    //         let it = new category(item.meta,item.id);
    //         if(item.color)it.setColor(item.color);
    //         if(item.position)it.setPosition(item.position.x,item.position.y);
    //         if(item.attributes){
    //             for(let a in item.attributes){
    //                 if(typeof item.attributes[a] !== "boolean")throw Error('Attributes must be boolean');
    //                 it.setOption(a,item.attributes[a]);
    //             }
    //         }
    //         if(item.fields){
    //             for(let f in item.fields){
    //                 it.addValue(f,item.fields[f]);
    //             }
    //         }
    //         if(item.events){
    //             for(let e in item.events){
    //                 it.addEvent(item.events[e]);
    //             }
    //         }
    //         if(item.states){
    //             for(let e in item.states){
    //                 it.addState(item.states[e]);
    //             }
    //         }
    //         it.add();
    //         if(Engine.PhysicsManager)Engine.PhysicsManager.addToWorld(it);
    //     }
    // });

    if(item._category === 'Stage' || item._category === 'Collisions')return;
    let category = Engine.ObjectManager.getConstructor(item._category);
    if(!category || typeof category !== "function"){console.log("There is no category "+item.category)}

    if(item._name !== undefined){
        let it = new category({name:item._name},item._id);
        let values = item.values;

        if(values.colour.val)it.setColor(values.colour.val);
        it.setPosition(values.x.val,values.y.val);
        for(let a in item.options){
            if(typeof item.options[a] !== "boolean")throw Error('Attributes must be boolean');
            it.setOption(a,item.options[a]);
        }

        for(let v in values){
            if(!it.getValue(v) === undefined)it.addValue(v,values[v].val);
            else it.setValue(v,values[v].val);
            if(values[v].onChange){
                it.setValueCode(v, values[v].onChange);
            }
        }

        let events = item.events;
        for(let f in events){
            if(it.getEvent(f) === undefined)
                it.addEvent(f,events[f].val);
            else 
                it.setEvent(f,events[f].val);
        }

        let states = item.states;
        for(let s in states){
            it.addState(s);
            it.setState(s,states[s].transitionFrom,states[s].transitionTo);
        }

        //TODO 
        if(it.name === 'player')
            bb.fastInstall('state','player',it);

        it.add();
        if(Engine.PhysicsManager)Engine.PhysicsManager.addToWorld(it);
    }});
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
    installWatches();
    Engine.CollisionManager.loadSaved();
});

game.input = ()=>{
    // if(game.gameState === 3)return; // 3 === PAUSED
    Engine.InputManager.pollKeys();
    Engine.InputManager.getPressedKeys().forEach((key)=>inpHandler(key));
};

game.animation = ()=>{
    Engine.AnimationManager.progress(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{
}

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
    FPSCounter();
};



import keyToAction from '../assets/json/keyToActions.js' //json
// TODO: move this to somewhere better
function inpHandler(key) {
    if(localStorage.getItem(key))bb.fastGet('scripting','executeCode')(localStorage.getItem(key));
    if(bb.fastGet('state','mode') === 'editing')return;
    else if(keyToAction[key]){
        keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    }
};

//--------------------Engine Object--------------------//

Engine.start = ()=>{
    app.main();

    bb.fastInstall('Engine','Self',Engine);

    bb.print();
}

Engine.pause = ()=>{
    if(Engine.timePaused) throw Error('Pause while paused');
    Engine.timePaused = bb.fastGet('state','gameTime');
    Engine.game.pause();
}

Engine.resume = ()=>{
    if(!Engine.timePaused) throw Error('Resume without pause');
    Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - Engine.timePaused);
    Engine.game.unpause();
    Engine.timePaused = undefined;
}


export default Engine;