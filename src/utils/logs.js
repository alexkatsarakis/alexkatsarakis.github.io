function logManager(){
     function logAction(message){
        let onDocument = document.getElementById('consoleArea');
        if(onDocument){
            onDocument.value += "\n"+message;
            onDocument.scrollTop = onDocument.scrollHeight;
        }
        else console.log(message);
    }
    
    function logError(message){
        let onDocument = document.getElementById('consoleArea');
        if(onDocument){
            onDocument.value += '\nError: '+message;
            onDocument.scrollTop = onDocument.scrollHeight;
        }
        else console.log(message);
    }

    function logWarning(message){
        let onDocument = document.getElementById('consoleArea');
        if(onDocument){
            onDocument.value += '\nWarning: '+message;
            onDocument.scrollTop = onDocument.scrollHeight;
        }
        else console.log(message);
    }

    return {
        logAction,
        logError,
        logWarning
    }
}

export default logManager();