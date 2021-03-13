import logManager from '../../utils/logs.js'

const InputState = {
    TRIGGERED: 'TRIGGERED',
    TOTRIGGER: 'TOTRIGGER',
    FOREVER: 'FOREVER'
}

class InputManager {
    currentlyPressed = {};
    releasedKeys = [];

    keyCombos = {
        // 'Copy': ['ControlLeft', 'KeyC'],
        // 'Paste': ['ControlLeft', 'KeyV'],
        'dummyAction': ['ControlLeft', 'KeyB']
    }

    isCurrentlyPressed(key){
        if(this.currentlyPressed[key]){
            return true;
        }
        return false;
    }
    
    keyPressed(key,forever){
        // logManager.logAction(`Pressed Key ${key}`);
        if(forever) this.currentlyPressed[key] = InputState.FOREVER;
        else this.currentlyPressed[key] = InputState.TOTRIGGER;

        for(let combo in this.keyCombos){
            let isCombo = true;
            let keysForCombo = this.keyCombos[combo];
            for(let key in keysForCombo){
                if(!this.currentlyPressed[keysForCombo[key]])
                    isCombo = false;
            }
            if(isCombo === true) /// === true so it doesn't try to convert isCombo from bool
                this.currentlyPressed[combo] = InputState.TOTRIGGER;
        }
    }
    
    keyReleased(key){
        delete this.currentlyPressed[key];
        this.releasedKeys.push(key);
        // logManager.logAction(`Released Key ${key}`);
    }
    
    getReleasedKeys(){
        let toReturn = this.releasedKeys;
        this.releasedKeys = [];
        return toReturn;
    }
    
    getPressedKeys(){
        this.pollKeys();
        let keysPressed = [];
        for(let i in this.currentlyPressed){
            let currP = this.currentlyPressed[i];
            if(currP === InputState.TOTRIGGER 
            || currP === InputState.FOREVER){
                // logManager.logAction(`Action for input ${i}`);
                keysPressed.push(i);
            }

            if(currP === InputState.TOTRIGGER){
                this.currentlyPressed[i] = InputState.TRIGGERED;
            }
        }
        return keysPressed;
    }

    addCombo(id, keys){
        this.keyCombos[id] = keys;
    }

    removeCombo(id){
        if(!this.keyCombos[id]) throw Error('Tried to remove a combo that doesn\'t exists');
        delete this.keyCombos[id];
    }

    isPressed(key){
        for(let i in this.currentlyPressed){
            if(i === key)return true;
        }
        return false;
    }
    
    pollKeys(){
        gamep.updateStatus();
    }
}


const inputManager = new InputManager();



let haveEvents = 'ongamepadconnected' in window;
class GamepadController {
  _gamepad;
  constructor(){}
  addGamepad(gamepad){
    this._gamepad = gamepad;
  }

  removeGamepad(e){
    this._gamepad = undefined;
  }
  
  scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    
    if (gamepads[0]) {
        this._gamepad = gamepads[0];
    }
  }

  updateStatus() {
    if(!this._gamepad)return;
    if(!haveEvents){
      this.scangamepads();
    }
    var controller = this._gamepad;

    for (let i = 0; i < controller.buttons.length; i++) {
      var val = controller.buttons[i];
      var pressed = false;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }

      if (pressed) {
        if(controller.vibrationActuator)
          controller.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 50,
            weakMagnitude: 0.5,
            strongMagnitude: 1.0
          });

        if(!inputManager.isPressed('controller'+i)){
            inputManager.keyPressed('controller'+i,true);
        }
      } else {
        if(inputManager.isPressed('controller'+i)){
            inputManager.keyReleased('controller'+i);
        }
      }
  
        //   var axes = d.getElementsByClassName("axis");
        for (let i = 0; i < controller.axes.length; i++) {
            if(controller.axes[i] >= 0.5){
                if(!inputManager.isPressed('controller'+(20+i))){
                    inputManager.keyPressed('controller'+(20+i),true);
                }
            }else if(controller.axes[i] <= -0.5){
                if(!inputManager.isPressed('controller'+(20+4+i))){
                    inputManager.keyPressed('controller'+(20+4+i),true);
                }
            }else{
                if(inputManager.isPressed('controller'+(20+i))){
                    inputManager.keyReleased('controller'+(20+i));
                }
                if(inputManager.isPressed('controller'+(20+4+i))){
                    inputManager.keyReleased('controller'+(20+4+i));
                }
            }
        }
    }
  }
}

let gamep = new GamepadController();


document.onkeydown = (ev)=>{
    if(!inputManager.isPressed(ev.code))
        inputManager.keyPressed(ev.code);
}
document.onkeyup = (ev)=>{
    if(inputManager.isPressed(ev.code))
        inputManager.keyReleased(ev.code)
};
window.addEventListener("gamepadconnected", (e)=>gamep.addGamepad(e.gamepad));
window.addEventListener("gamepaddisconnected", (e)=>gamep.removeGamepad(e.gamepad));



export default inputManager;