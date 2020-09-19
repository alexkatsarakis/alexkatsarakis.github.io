import bb from '../../utils/blackboard.js'

import focusedObject from '../../transitionHandlers/focusedObject.js'

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
readTextFile('./src/UI/toolbar/toolbar.ahtml',onToolbarLoaded);

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

function actionsDropdown(){
    let isVisible = false;

    function getActions(){
        let actions = [];
        for(let action in bb.getComponent('actions').itemMap){
            actions.push(action);
        }
        return actions;
    }

    function createDropdown(){
        let actions = getActions();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_actions_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_actions').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        actions.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_action_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            ddItem.addEventListener('click',()=>bb.fastGet('actions',item)());
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }

    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_actions_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}

function objectsDropdown(){
    let isVisible = false;

    function getObjects(){
        let objects = [];
        for(let object in bb.getComponent('liveObjects').itemMap){
            objects.push(object);
        }
        return objects;
    }

    function createDropdown(){
        let objects = getObjects();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_liveobjects_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_liveobjects').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        objects.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            ddItem.addEventListener('click',()=>focusedObject(item));
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }
  
    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_liveobjects_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}

function eventsDropdown(){
    let isVisible = false;

    function getEvents(){
        let events = [];
        let focused = bb.fastGet('state','focusedObject');
        if(!focused)return [];
        for(let event in bb.fastGet('liveObjects',focused).getEvents()){
            events.push(event);
        }
        return events;
    }

    function createDropdown(){
        let events = getEvents();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_events_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_events').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        events.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            ddItem.addEventListener('click',()=>bb.fastGet('liveObjects',bb.fastGet('state','focusedObject')).triggerEvent(item));
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }
  
    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_events_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}


function onToolbarLoaded(){
    let dropdown = document.getElementById('toolbar_actions_dropdown_button');
    let toggle = actionsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_actions').addEventListener('click',toggle);

    dropdown = document.getElementById('toolbar_liveobjects_dropdown_button');
    toggle = objectsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_liveobjects').addEventListener('click',toggle);

    dropdown = document.getElementById('toolbar_events_dropdown_button');
    toggle = eventsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_events').addEventListener('click',toggle);

}