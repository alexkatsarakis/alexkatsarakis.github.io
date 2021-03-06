import Manager from '../Engine/Manager.js'

import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

function pressKey(key){
    let code = key;
    // let code;
    // if(isNaN(key)){
    //     code = 'Key'+key;
    // }else{
    //     code = 'Digit'+key;
    // }
    return (()=>{
        return Engine.InputManager.keyPressed(code);
    });
}

function releaseKey(key){
    let code = key;
    // let code;
    // if(isNaN(key)){
    //     code = 'Key'+key;
    // }else{
    //     code = 'Digit'+key;
    // }
    return (()=>{
        return Engine.InputManager.keyReleased(code);
    });
}

export default class InputAutomationManager extends Manager{

    _actions
    _actionsCB

    _onKeyPressCB
    _onKeyReleaseCB

    constructor() {
        super();
        this._actions = [];
        this._actionsCB = [];

        // this.addAction('W',500,true);
        // this.addAction('D',600,true);
        // this.addAction('D',5000,false);
        // this.addAction('A',700,true);
        // this.addAction('A',800,false);
        // this.addAction('W',1000,false);
        // this.addAction('M',2000,true);
        // this.addAction('M',2050,false);
        
        
        // this.addAction('D',200,true);
        // this.addAction('D',26000,false);
        // this.addAction('W',1600,true);
        // this.addAction('W',1620,false);
        // this.addAction('W',3000,true);
        // this.addAction('W',3020,false);
        // this.addAction('W',5500,true);
        // this.addAction('W',5520,false);
        // this.addAction('W',6900,true);
        // this.addAction('W',6920,false);
        // this.addAction('W',8200,true);
        // this.addAction('W',8220,false);
        // this.addAction('W',10200,true);
        // this.addAction('W',10220,false);
        // this.addAction('W',12200,true);
        // this.addAction('W',12220,false);
        // this.addAction('W',16200,true);
        // this.addAction('W',16220,false);
        // this.addAction('W',25000,true);
        // this.addAction('W',25020,false);
        // this.addAction('W',25500,true);
        // this.addAction('W',25520,false);


    }

    startRecording(){
        const currTime = bb.fastGet('state','gameTime');
        this._actions = [];
        this._onKeyPressCB = Engine.InputManager.addOnKeyPress((key)=>{
            this.addAction(key,bb.fastGet('state','gameTime') - currTime, true);
        });
        this._onKeyReleaseCB = Engine.InputManager.addOnKeyRelease((key)=>{
            this.addAction(key,bb.fastGet('state','gameTime') - currTime, false);
        });
    }

    stopRecording(){
        Engine.InputManager.removeOnKeyPress(this._onKeyPressCB);
        Engine.InputManager.removeOnKeyRelease(this._onKeyReleaseCB);
        this._onKeyPressCB = undefined;
        this._onKeyReleaseCB = undefined;
        console.log(this._actions);
    }


    onUpdate(){
        // console.log(Engine.InputManager.getPressedKeys());
    }

    addAction(key,delay,pressed = true){
        this._actions.push({
            delay: delay,
            pressed: pressed,
            action: (pressed)?pressKey(key):releaseKey(key)
        });
    }

    startInputAutomation(){
        if(this._actionsCB.length !== 0)this.stopInputAutomation();
        this._actions.forEach(action => {
            this._actionsCB.push(Engine.ClockManager.callIn(action.action,{},action.delay));
        });
    }

    stopInputAutomation(){
        this._actionsCB.forEach(action => {
            Engine.ClockManager.cancelCallBack(action);
        });
        this._actionsCB.length = 0;
    }
}