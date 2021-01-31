import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'

// function dummyAction(){
    // let root = document.documentElement;
    
    // const mainThemeColor = '--main-color';
    
    // root.style.setProperty(mainThemeColor, '#000000');
    // console.log('dummy action');
// }

function dummyAction(){
    let liveObj = Engine.ObjectManager.objects;
    
    let allSaved = {};
    for(let i in liveObj){
        let saved = liveObj[i].save();
        saved['timeStamp'] = bb.fastGet('state','gameTime');
        allSaved[saved['id']] = saved;
    }
    console.log(allSaved);


    var textFileAsBlob = new Blob([JSON.stringify(allSaved)], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = "savedState.txt";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

bb.fastInstall('actions','dummyAction',dummyAction)