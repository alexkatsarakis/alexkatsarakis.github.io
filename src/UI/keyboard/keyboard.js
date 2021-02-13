import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

export default {name:'keyboard',link: './src/UI/keyboard/keyboard.ahtml',cb:onKeyboardLoaded};

function onKeyboardInteraction(value){
    function action(){
        if(isNaN(value))
            Engine.ObjectManager.getObjectByName('Keyboard').triggerEvent('PressedKey'+value);
        else
        Engine.ObjectManager.getObjectByName('Keyboard').triggerEvent('PressedDigit'+value);
    }

    return action;
}


function onKeyboardLoaded(){

    let keys = [...document.getElementsByClassName("keyboardKey")];
    keys.forEach(key => {
        key.addEventListener('click',onKeyboardInteraction(key.innerHTML));
    })
}