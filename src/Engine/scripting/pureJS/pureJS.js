import bb from '../../../utils/blackboard.js'

import AK from '../../../utils/API.js'
import logManager from '../../../utils/logs.js'

let inputArea = document.createElement('textarea');
inputArea.style.width = "100%";
inputArea.style.height = "100%";
inputArea.style.resize = "none";
inputArea.spellcheck = "false";

function currentScriptAsText(){
    return inputArea.value;
};

function currentScriptAsCode(){
    return inputArea.value;
};

function clear(){
    inputArea.value = "";
};

function fromTextToCode(text) {
    return text;
};

let currObject;
function executeCode(codes,currentObject){
    if(!codes || !codes.code)
        return;
    let prevObject = currObject;
    currObject = currentObject;
    try{
        eval(codes.code);
    }catch(e){
        logManager.logError(e);
        console.log(e);
    }
    currObject = prevObject;
};

function clearAndLoadFromText(codes){
    if(!codes || !codes.code)
        inputArea.value = '';
    inputArea.value = codes.code;
};

function injectInDiv(div) {
    div.style.height = "500px";
    div.style.width = "500px";
    
    div.appendChild(inputArea);
}

export default {
    id: 'pureJS',
    currentScriptAsText,
    currentScriptAsCode,
    executeCode,
    clearAndLoadFromText,
    injectInDiv
}