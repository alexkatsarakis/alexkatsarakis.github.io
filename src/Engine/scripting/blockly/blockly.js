import './blocksInstallation.js'
import './blocksCurrentObject.js'
import './blocksMove.js'
import './blocksCalculation.js'
import './blocksUnnamed.js'

import bb from '../../../utils/blackboard.js'
import AK from '../../../utils/API.js' //THIS IS ON PURPOSE SO IT WILL BE ON EVAL

let currObject;

function currentScriptAsText() {
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
};

function currentScriptAsCode() {
    return Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
}

function executeCode(codes,currentObject) {
    if(!codes)
        return;
    const prevObject = currObject;
    currObject = currentObject;
    eval(codes.code);
    currObject = prevObject;
}

function clearAndLoadFromText(codes) {
    if(!codes || !codes.text){
            Blockly.mainWorkspace.clear();
            return;
        }
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(codes.text),Blockly.mainWorkspace);
}

function printInfo(){
    console.log({
        id: 'blockly',
        API: AK,
        Blackboard: bb
    });
}

function injectInDiv(div) {
    div.style.height = 500 + 'px';
    div.style.width = 750 + 'px';
    
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
}

export default {
    id: 'blockly',
    currentScriptAsText,
    currentScriptAsCode,
    executeCode,
    clearAndLoadFromText,
    injectInDiv,
    printInfo
}