import bb from '../../utils/blackboard.js'

function readTextFile(file,onFinish){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.body.insertAdjacentHTML('beforeend',allText);
                convertHTMLtoObjects();
                onFinish();
            }
        }
    }
    rawFile.send(null);
}
readTextFile('./src/UI/keyboard/keyboard.ahtml',onKeyboardLoaded);

function convertHTMLtoObjects(){
    let children = [ ...document.body.children ];
    children.map(child => {
        if(child.attributes.getNamedItem("category")){
            let objCat = bb.fastGet('objects',child.attributes["category"].nodeValue);
            document.body.removeChild(child);
            let obj = new objCat({name:child.id,div:child});
            bb.fastSet('liveObjects',child.id,obj);
            obj.add();
        }
    })
}

function onKeyboardInteraction(value){
    function action(){
        if(isNaN(value))
            localStorage.setItem("Key"+value ,bb.fastGet('scripting','currentScriptAsCode')());
        else
            localStorage.setItem("Digit"+value ,bb.fastGet('scripting','currentScriptAsCode')());
    }

    return action;
}


function onKeyboardLoaded(){

    let keys = [...document.getElementsByClassName("keyboardKey")];
    keys.forEach(key => {
        key.addEventListener('click',onKeyboardInteraction(key.innerHTML));
    })
}