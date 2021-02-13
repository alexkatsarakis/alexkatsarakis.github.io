import bb from '../../utils/blackboard.js'

export default {name:'hud',link: './src/UI/hud/hud.ahtml',cb:onHudLoaded};

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


function onHudLoaded(){
    document.getElementById('hudToggle').addEventListener('click',hudState());

    let codes;


    let tabOpen = "onClick";
    document.getElementById('playScriptButton').addEventListener('click',()=>{
        let code = bb.invoke('scripting','currentScriptAsCode');
        bb.invoke('scripting','executeCode',code);
    });

    document.getElementById('saveScriptButton').addEventListener('click',()=>{
        let text = bb.invoke('scripting', 'currentScriptAsText');
        let code = bb.invoke('scripting', 'currentScriptAsCode');
        codes.stripped[tabOpen].set({text:text,code:code});
    });

    function tabInfo(id,cb){
        return ()=>{
            let text = cb();
            bb.invoke('scripting','clearAndLoadFromText',text);
            // codeAnalysis(bb.fastGet('scripting','currentScriptAsCode')());
            tabOpen = id;
            document.getElementById('openTab').innerHTML = tabOpen;
        };
    }

    let consoleArea = document.getElementById('consoleArea');
    function onActionChange(newMessage){
        consoleArea.value += '\n'+newMessage;
        consoleArea.scrollTop = consoleArea.scrollHeight;
        // logAllActions += newMessage+'\n';
        bb.installWatch('state','lastAction',onActionChange);
    }

    bb.installWatch('state','lastAction',onActionChange);
    
    function onFocusChange(obj){
        let eventsTab = document.getElementById('eventsTab');
        let infoBar = document.getElementById('infoBar');
        eventsTab.innerHTML = "";
        if(obj === undefined){
            document.getElementById('openTab').innerHTML = "";
            document.getElementById('focusedObjText').innerText = 'Stage';
            bb.invoke('scripting','clearAndLoadFromText','');
            bb.installWatch('state','focusedObject',onFocusChange);
            return;
        }
        let firstObject = true;

        document.getElementById("focusedObjText").innerText = obj.name;
        infoBar.innerHTML = 'Currently Focused Object is '+obj.name;

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

    bb.invoke('scripting','injectInDiv',document.getElementById('languageDiv'));

}