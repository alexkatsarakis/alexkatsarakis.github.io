import logManager from '../../../utils/logs.js'

import bb from '../../../utils/blackboard.js'
import AK from '../../../utils/API.js' //THIS IS ON PURPOSE SO IT WILL BE ON EVAL

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

    //Beautify code
    inputArea.value = js_beautify(codes.code,{
        "indent_size": "4",
        "indent_char": " ",
        "max_preserve_newlines": "5",
        "preserve_newlines": true,
        "keep_array_indentation": false,
        "break_chained_methods": true,
        "indent_scripts": "normal",
        "brace_style": "collapse",
        "space_before_conditional": true,
        "unescape_strings": false,
        "jslint_happy": false,
        "end_with_newline": false,
        "wrap_line_length": "0",
        "indent_inner_html": false,
        "comma_first": false,
        "e4x": false,
        "indent_empty_lines": false
      });
    // inputArea.value = codes.code;
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