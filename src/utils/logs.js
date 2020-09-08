export default function logAction(funcName){
    let onDocument = document.getElementById('consoleArea');
    if(onDocument){
        onDocument.value += "\n"+funcName;
        onDocument.scrollTop = onDocument.scrollHeight;
    }
    else console.log(funcName);
}