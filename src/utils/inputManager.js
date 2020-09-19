

class InputManager {
    currentlyPressed = {}
    
    keyPressed(key){
        if(this.currentlyPressed[key] === true)return;
        this.currentlyPressed[key] = true;
    }
    
    keyReleased(key){
        if(this.currentlyPressed[key] !== true)return;
        delete this.currentlyPressed[key];
    }
    
    getPressedKeys(){
        let keysPressed = [];
        for(let i in this.currentlyPressed){
            keysPressed.push(i);
        }
        return keysPressed;
    }
}


let inputManager = new InputManager();

document.onkeypress = (ev)=>inputManager.keyPressed(ev.code);

document.onkeyup = (ev)=>inputManager.keyReleased(ev.code);

export default inputManager;