import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

// function copy(){
//     let obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
//     let pos = obj.getPosition();
//     let name = obj.getName();
//     name += "_copy";
//     let catO = bb.fastGet("objects",obj.getCategory());
//     if(typeof catO !== "function"){console.log("There is no category "+category);return;}
//     if(!bb.fastGet('liveObjects',name)){
//         let it = new catO({name});
//         bb.fastSet('liveObjects',name,it);
//         it.setPosition(pos.x,pos.y);
//         it.add();
//         logManager.logAction("Created Object ["+name+"]");
//     }

// }

// function dummyAction(){
    // let root = document.documentElement;
    
    // const mainThemeColor = '--main-color';
    
    // root.style.setProperty(mainThemeColor, '#000000');
    // console.log('dummy action');
// }

function dummyAction(){
    let liveObj = bb.getComponent('liveObjects').itemMap;
    
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