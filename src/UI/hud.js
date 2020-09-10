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
            element.style.visibility = (isVisible)?"visible":"hidden";
            element.style.opacity = (isVisible)?"0.9":"0";
        });
    }
    return toggleVisibility;
}


function onHudLoaded(){
    let toggle = document.getElementById('hudToggle');
    toggle.addEventListener('click',hudState());

    document.getElementById('playScriptButton').addEventListener('click',()=>{
        console.log(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace));
        eval(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace));
    });

    document.getElementById('saveScriptButton').addEventListener('click',()=>{
        let xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        localStorage.setItem('code' ,Blockly.Xml.domToText(xml));
    });

    document.getElementById('loadScriptButton').addEventListener('click',()=>{
        let xml = Blockly.Xml.textToDom(localStorage.getItem('code'));
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml,Blockly.mainWorkspace);
    });

    document.getElementById('bindScriptToKey').addEventListener('click',()=>{
        localStorage.setItem(document.getElementById('keyToBind').value ,Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace));
    });

    let blocklyDiv = document.getElementById('blocklyDiv');
    blocklyDiv.style.height = "500px";
    blocklyDiv.style.width = "500px";

    Blockly.inject('blocklyDiv',{
        toolbox: document.getElementById('toolbox'),
        scrollbars: true,
        zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 2,
          minScale: 0.5,
          scaleSpeed: 1.2,
          pinch: true}
    });
    
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
                bb.fastGet('actions',opt)(bb.fastGet('liveObjects',focusedObj));
            })
            objMenu.appendChild(i);
        })
        console.log(options);
    });
}