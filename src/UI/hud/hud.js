import bb from '../../utils/blackboard.js'

function readTextFile(file,onFinish){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.body.insertAdjacentHTML('beforeend',allText);
                convertHTMLtoObjects();
                onFinish();
            }
        }
    }
    rawFile.send(null);
}
readTextFile('./src/UI/hud/hud.ahtml',onHudLoaded);

function convertHTMLtoObjects(){
    let children = [ ...document.body.children ];
    children.map(child => {
        if(child.attributes.getNamedItem("category")){
            let objCat = bb.fastGet('objects',child.attributes["category"].nodeValue);
            document.body.removeChild(child);
            let obj = new objCat({name:child.id,div:child});
            bb.fastSet('liveObjects',child.id,obj);
            obj.add();
        }
    })
}

function hudState(){
    let isVisible = (bb.fastGet('state','mode') === "editing")?true:false;
    toggleVisibility();
    toggleVisibility();
    function toggleVisibility(){
        isVisible = !isVisible;
        bb.fastSet('state','mode',(isVisible)?"editing":"play");
        let hudChildren = document.querySelectorAll('.hudChild');
        hudChildren.forEach(element => {
            element.style.visibility = (isVisible)?"visible":"hidden";
            element.style.opacity = (isVisible)?"0.9":"0";
        });
    }
    return toggleVisibility;
}


function onHudLoaded(){
    document.getElementById('hudToggle').addEventListener('click',hudState());


    let tabOpen = "onClick";
    document.getElementById('playScriptButton').addEventListener('click',()=>{
        let code = bb.fastGet('scripting','currentScriptAsCode')();
        bb.fastGet('scripting','executeCode')(code);
    });

    document.getElementById('saveScriptButton').addEventListener('click',()=>{
        let text = bb.fastGet('scripting','currentScriptAsText')();
        bb.fastGet('liveObjects',bb.fastGet('state','focusedObject')).setEvent(tabOpen,text);
    });

    function tabInfo(obj,id){
        return ()=>{
            let text = bb.fastGet('liveObjects',obj).getEvent(id);
            bb.fastGet('scripting','clearAndLoadFromText')(text);
            tabOpen = id;
            document.getElementById('openTab').innerHTML = tabOpen;
        };
    }

    function onFocuseChange(objName){
        let eventsTab = document.getElementById('eventsTab');
        eventsTab.innerHTML = "";
        if(objName === undefined){
            document.getElementById('openTab').innerHTML = "";
            bb.fastGet('scripting','clearAndLoadFromText')("");
            bb.installWatch('state','focusedObject',onFocuseChange);
            return;
        }
        tabOpen = "onClick";
        let firstObject = true;
        for(let i in bb.fastGet('liveObjects',objName).getEvents()){
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.addEventListener('click',tabInfo(objName,i));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }
        bb.installWatch('state','focusedObject',onFocuseChange);
    }
    
    bb.installWatch('state','focusedObject',onFocuseChange);

    let fpsCounter = document.getElementById('fpsCounter');

    function onFPSChange(newFPS){
        fpsCounter.innerHTML = "FPS:"+newFPS;
        bb.installWatch('state','FPS',onFPSChange);
    }

    bb.installWatch('state','FPS',onFPSChange);

    bb.fastGet('scripting','injectInDiv')(document.getElementById('languageDiv'));

}