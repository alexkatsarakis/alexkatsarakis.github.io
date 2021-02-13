import bb from '../../utils/blackboard.js'
/*
<script type="text/javascript">
    // set the pyodide files URL (packages.json, pyodide.asm.data etc)
    window.languagePluginUrl = 'https://pyodide-cdn2.iodide.io/v0.15.0/full/';
</script>
<script src="./libs/pyodide.js"></script>
*/

let inputArea = document.createElement('textarea');
inputArea.style.width = "100%";
inputArea.style.height = "100%";
inputArea.style.resize = "none";
inputArea.spellcheck = "false";

languagePluginLoader.then(function () {
    console.log(pyodide.runPython(`
        import sys
        sys.version
    `));
    
})

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

bb.fastInstall('scripting','executeText',(text,currObject) => {
    if(text === "" || text === null || text === undefined)return;
    console.log(pyodide.runPython(text));
});

bb.fastInstall('scripting','executeCode',(text) => {
    if(text === "" || text === null || text === undefined)return;
    console.log(pyodide.runPython(text));
});

bb.fastInstall('scripting','clearAndLoadFromText',(text)=>{
    inputArea.value = text;
});

bb.fastInstall('scripting','injectInDiv',(div)=>{
    div.style.height = "500px";
    div.style.width = "500px";
    
    div.appendChild(inputArea);
});