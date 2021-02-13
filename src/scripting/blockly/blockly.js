import './blocksInstallation.js'

import bb from '../../utils/blackboard.js'

bb.fastInstall('scripting','currentScriptAsText',()=>{
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
});

bb.fastInstall('scripting','currentScriptAsCode',()=>{
    return Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
});

bb.fastInstall('scripting','clear',()=>{
    Blockly.mainWorkspace.clear();
});

let elem = document.createElement('div');
elem.id = 'blocklyDiv2';
document.body.appendChild(elem);
let test = Blockly.inject('blocklyDiv2',{toolbox: document.getElementById('toolbox')});

let currObject;
bb.fastInstall('scripting','executeCode',(text,currentObject) => {
    if(text === undefined 
        || text === ""
        || text === null)
            return;
    let prevObject = currObject;
    currObject = currentObject;
    eval(text);
    currObject = prevObject;
});
bb.fastInstall('scripting','executeText',function(text,currentObject) {
    if(text === undefined 
    || text === ""
    || text === null)
        return;
    text = Blockly.Xml.textToDom(text);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(text,test);
    let prevObject = currObject;
    currObject = currentObject;
    eval(Blockly.JavaScript.workspaceToCode(test));
    currObject = prevObject;
});

bb.fastInstall('scripting','clearAndLoadFromText',(text)=>{
    if(text === undefined 
        || text === ""
        || text === null){
            Blockly.mainWorkspace.clear();
            return;
        }
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(text),Blockly.mainWorkspace);
});

bb.fastInstall('scripting','injectInDiv',(div)=>{
    div.style.height = "500px";
    div.style.width = "500px";
    
    Blockly.inject(div.id,{
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
});