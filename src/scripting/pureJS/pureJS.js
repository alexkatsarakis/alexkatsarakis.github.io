import bb from '../../utils/blackboard.js'

import AK from './APItoUser.js'

let inputArea = document.createElement('textarea');
inputArea.style.width = "100%";
inputArea.style.height = "100%";
inputArea.style.resize = "none";
inputArea.spellcheck = "false";

bb.fastInstall('scripting','currentScriptAsText',()=>{
    return inputArea.value;
});

bb.fastInstall('scripting','currentScriptAsCode',()=>{
    return inputArea.value;
});

bb.fastInstall('scripting','clear',()=>{
    inputArea.value = "";
});

bb.fastInstall('scripting','fromTextToCode',(text) => {
    return text;
});

bb.fastInstall('scripting','executeText',(text) => {
    // try{
    //     eval(text);
    // }catch(e){
    //     console.log(e);
    // }
    eval(text);
});

bb.fastInstall('scripting','executeCode',(text) => {
    // try{
    //     eval(text);
    // }catch(e){
    //     console.log(e);
    // }
    eval(text);
});

bb.fastInstall('scripting','clearAndLoadFromText',(text)=>{
    inputArea.value = text;
});

bb.fastInstall('scripting','injectInDiv',(div)=>{
    div.style.height = "500px";
    div.style.width = "500px";
    
    div.appendChild(inputArea);
});