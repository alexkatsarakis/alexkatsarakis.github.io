import bb from '../utils/blackboard.js'


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
                onFinish();
            }
        }
    }
    rawFile.send(null);
}
readTextFile('./src/UI/hud.ahtml',onHudLoaded);

function hudState(){
    let isVisible = true;
    function toggleVisibility(){
        isVisible = !isVisible;
        let hudChildren = document.querySelectorAll('.hudChild');
        hudChildren.forEach(element => {
            element.style.display = (isVisible)?"block":"none";
            element.style.opacity = (isVisible)?"1":"0";
        });
    }
    return toggleVisibility;
}


function onHudLoaded(){
    let toggle = document.getElementById('hudToggle');
    toggle.addEventListener('click',hudState());

    let blocklyDiv = document.getElementById('blocklyDiv');
    blocklyDiv.style.height = "500px";
    blocklyDiv.style.width = "500px";

    Blockly.inject('blocklyDiv',{toolbox: document.getElementById('toolbox'),scrollbars: true});
    
    Blockly.JavaScript.addReservedWords('code');

    objMenuButton.addEventListener('click',()=>{
        if(document.getElementById('objMenu'))document.getElementById('objMenu').remove();
        let objMenu = document.createElement("div");
        objMenu.id = "objMenu";
        objMenu.classList += "hudChild";
        document.body.appendChild(objMenu);

        let focusedObj = bb.fastGet('state','focusedObject');
        if(!focusedObj)return;
        let options = bb.fastGet('liveObjects',focusedObj).getOptions();
        options.map(opt=>{
            let i = document.createElement('div');
            i.className = "objMenuButton";
            i.innerHTML = opt;
            i.addEventListener('click',()=>{
                bb.fastGet('actions',opt)(focusedObj);
            })
            objMenu.appendChild(i);
        })
        console.log(options);
    });
}