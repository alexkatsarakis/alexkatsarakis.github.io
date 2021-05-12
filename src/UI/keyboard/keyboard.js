import Engine from '../../Engine.js'

export default {
    name:'keyboard',
    link: './src/UI/keyboard/keyboard.ahtml',
    cb:onKeyboardLoaded,
    removable: true, 
    loadOnInstall: false
};

function onKeyboardInteraction(value){
    const keyboard = Engine.ObjectManager.getObjectByName('Keyboard');
    function pressed(){
        if(isNaN(value))
            keyboard.triggerEvent('PressedKey'+value);
        else
            keyboard.triggerEvent('PressedDigit'+value);
    }
    function unpressed(){
        if(isNaN(value))
            keyboard.triggerEvent('UnpressedKey'+value);
        else
            keyboard.triggerEvent('UnpressedDigit'+value);
    }

    return {
        pressed,
        unpressed
    };
}


function onKeyboardLoaded(){

    const keys = [...document.getElementsByClassName("keyboardKey")];
    keys.forEach(key => {
        const actions = onKeyboardInteraction(key.innerHTML);
        key.onmousedown = () => actions.pressed();
        key.onmouseup = () => actions.unpressed();
    });
}