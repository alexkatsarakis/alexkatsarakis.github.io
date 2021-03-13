import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

export default {
    name:'hud',
    link: './src/UI/hud/hud.ahtml',
    cb:onHudLoaded, 
    removable: false, 
    loadOnInstall: true
};

function hudState(){
    let isVisible = (bb.fastGet('state','mode') === "editing");
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

// function codeAnalysis(srcCode){
//     const reg = /(AK\.)([^\(]+)\(([^\,\)]*)\)/gim;
//     let matches = ((srcCode || '').match(reg) || []);
//     let res = [];

//     matches.forEach((match)=>{
//         let test = match;
//         res.push(match);
//         while((test = test.replace(reg,'$3'))){
//             let m = (test || '').match(reg) || [];
//             console.log(m);
//             if(m.length === 0)return;
//             m.forEach(mat=>res.push(mat));
//         }
//     })
//     console.log(res);
// }

function showHideCodeUI(show = 'block'){
    let eventsTab = document.getElementById('eventsTab');
    let infoBar = document.getElementById('infoBar');
    let languageDiv = document.getElementById('languageDiv');
    let playScriptButton = document.getElementById('playScriptButton');
    let showScriptButton = document.getElementById('showScriptButton');
    let saveScriptButton = document.getElementById('saveScriptButton');
    languageDiv.style.display = show;
    eventsTab.style.display = show;
    infoBar.style.display = show;
    playScriptButton.style.display = show;
    saveScriptButton.style.display = show;
    showScriptButton.style.display = show;
}

function onHudLoaded(){
    document.getElementById('hudToggle').addEventListener('click',hudState());

    let codes;


    let tabOpen = "onClick";
    document.getElementById('playScriptButton').addEventListener('click',()=>{
        let code = Engine.ScriptingManager.currentScriptAsCode();
        let currObj = bb.fastGet('state','focusedObject');
        Engine.ScriptingManager.executeCode({text: code, code: code},currObj.id);
    });
    
    document.getElementById('showScriptButton').addEventListener('click',()=>{
        let code = Engine.ScriptingManager.currentScriptAsCode();
        console.log(code);
    });

    document.getElementById('saveScriptButton').addEventListener('click',()=>{
        let text = Engine.ScriptingManager.currentScriptAsText();
        let code = Engine.ScriptingManager.currentScriptAsCode();
        codes.stripped[tabOpen].set({text:text,code:code});
    });

    function tabInfo(id,cb){
        return ()=>{
            let codes = cb();
            Engine.ScriptingManager.clearAndLoadFromText(codes);
            tabOpen = id;
            document.getElementById('openTab').innerHTML = tabOpen;
        };
    }

    // let consoleArea = document.getElementById('consoleArea');
    // function onActionChange(newMessage){
    //     consoleArea.value += '\n'+newMessage;
    //     consoleArea.scrollTop = consoleArea.scrollHeight;
    //     // logAllActions += newMessage+'\n';
    //     bb.installWatch('state','lastAction',onActionChange);
    // }

    // bb.installWatch('state','lastAction',onActionChange);
    function onFocusChange(obj){
        let eventsTab = document.getElementById('eventsTab');
        let infoBar = document.getElementById('infoBar');
        showHideCodeUI('block');
        eventsTab.innerHTML = "";
        infoBar.innerHTML = "";
        if(obj === undefined){
            showHideCodeUI('none');
            document.getElementById('openTab').innerHTML = "";
            Engine.ScriptingManager.clearAndLoadFromText({text: '',code: ''});
            bb.installWatch('state','focusedObject',onFocusChange);
            return;
        }
        let firstObject = true;

        infoBar.innerHTML = 'Scripts for Object ('+obj.name+')';

        codes = obj.getCodes();
        codes.stripped = {};

        let events  = codes.events;
        let states  = codes.states;
        let values  = codes.values;
        let options = codes.options;

        let eventSplit = document.createElement('div');
        eventSplit.classList = 'tabSplitter';
        eventSplit.innerHTML = 'Events';
        eventsTab.appendChild(eventSplit);

        for(let i in events){
            codes.stripped[i] = events[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,events[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        let stateSplit = document.createElement('div');
        stateSplit.classList = 'tabSplitter';
        stateSplit.innerHTML = 'States';
        eventsTab.appendChild(stateSplit);

        for(let i in states){
            stateSplit = document.createElement('div');
            stateSplit.classList = 'tabSplitter';
            stateSplit.innerHTML = i;
            stateSplit.style.marginLeft = '10%';
            eventsTab.appendChild(stateSplit);
            for(let st in states[i]){
                codes.stripped[st] = states[i][st];
                let elem = document.createElement('div');
                elem.classList = "eventTab";
                elem.innerHTML = st;
                elem.style.marginLeft = '20%';
                elem.addEventListener('click',tabInfo(st,states[i][st].get));
                eventsTab.appendChild(elem);
                if(firstObject){
                    elem.click();
                    firstObject = false;
                }
            }
        }

        let valueSplit = document.createElement('div');
        valueSplit.classList = 'tabSplitter';
        valueSplit.innerHTML = 'Attributes';
        eventsTab.appendChild(valueSplit);

        for(let i in values){
            codes.stripped[i] = values[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,values[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        let optionSplit = document.createElement('div');
        optionSplit.classList = 'tabSplitter';
        optionSplit.innerHTML = 'Flags';
        eventsTab.appendChild(optionSplit);

        for(let i in options){
            codes.stripped[i] = options[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,options[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        bb.installWatch('state','focusedObject',onFocusChange);
    }

    bb.installWatch('state','focusedObject',onFocusChange);

    let fpsCounter = document.getElementById('fpsCounter');

    function onFPSChange(newFPS){
        fpsCounter.innerHTML = "FPS:"+newFPS;
        bb.installWatch('state','FPS',onFPSChange);
    }

    bb.installWatch('state','FPS',onFPSChange);

    Engine.ScriptingManager.injectInDiv(document.getElementById('languageDiv'));
    Engine.ClockManager.callIn(showHideCodeUI,'none',200);
}