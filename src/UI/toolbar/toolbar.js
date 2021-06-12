import bb from '../../utils/blackboard.js'

import focusedObject from '../../utils/focusedObject.js'

import Engine from '../../Engine.js'

import uiFactory from '../../utils/UIFactory.js'
import tr from '../../utils/translator.js'

export default {
    name:'toolbar',
    link: './src/UI/toolbar/toolbar.ahtml',
    cb:onToolbarLoaded,
    removable: false, 
    loadOnInstall: true
};

function actionsDropdown(){

    function getActions(){
        const actions = [];
        for(let action in bb.getComponent('actions').itemMap){
            actions.push(action);
        }
        return actions;
    }

    function createDropdown(){
        const actions = getActions();
        const dropdown = document.createElement('div');
        dropdown.id = 'toolbar_actions_dropdown';
        dropdown.classList += 'hudChild toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_actions').getBoundingClientRect().x + 'px'; 
        document.body.appendChild(dropdown);
        actions.forEach((item)=>{
            const ddItem = document.createElement('div');
            ddItem.id = 'toolbar_action_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            ddItem.addEventListener('click',()=>bb.fastGet('actions',item)());
            dropdown.appendChild(ddItem);
        });
    }

    function toggleDropdown(forceClose){
        const dropdowns = document.getElementsByClassName('toolbar_dropdown');
        const isOpen = document.getElementById('toolbar_actions_dropdown');
        for(let i = 0; i < dropdowns.length; i++){
            dropdowns.item(i).remove();
        }
        if(!isOpen && forceClose)createDropdown();
    }

    return toggleDropdown;
}

function objectsDropdown(){

    function getObjects(){
        const objects = [];
        const liveObjects = Engine.ObjectManager.objects;
        for(let object in liveObjects){
            objects.push(liveObjects[object]);
        }
        return objects;
    }

    function createDropdown(){
        const objects = getObjects();
        const dropdown = document.createElement('div');
        dropdown.id = 'toolbar_liveobjects_dropdown';
        dropdown.classList += 'hudChild toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_liveobjects').getBoundingClientRect().x + 'px'; 
        document.body.appendChild(dropdown);
        objects.forEach((item)=>{
            const ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item.id;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item.name;
            ddItem.addEventListener('click',()=>focusedObject(item.id));
            dropdown.appendChild(ddItem);
        });
    }

    function toggleDropdown(forceClose){
        const dropdowns = document.getElementsByClassName('toolbar_dropdown');
        const isOpen = document.getElementById('toolbar_liveobjects_dropdown');
        for(let i = 0; i < dropdowns.length; i++){
            dropdowns.item(i).remove();
        }
        if(!isOpen && forceClose)createDropdown();
    }

    return toggleDropdown;
}

function objCreationDropdown(){

    function getConstructors(){
        const consts = [];
        for(let constr in Engine.ObjectManager._constructors){
            consts.push(constr);
        }
        return consts;
    }

    function createDropdown(){
        const constructors = getConstructors();
        const dropdown = document.createElement('div');
        dropdown.id = 'toolbar_objCreation_dropdown';
        dropdown.classList += 'hudChild toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_objCreation').getBoundingClientRect().x + 'px'; 
        document.body.appendChild(dropdown);
        constructors.forEach((item)=>{
            const ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = tr.get(item);
            ddItem.addEventListener('click',()=>{
                bb.fastGet('actions','createObject')({
                    category:item,
                    name:'unnamed'+'('+Math.floor(Math.random() * 1000000)+')',
                    colour: 'white',
                    position:{
                        x:700,
                        y:700
                    }
                });
            });
            dropdown.appendChild(ddItem);
        });
    }

    function toggleDropdown(forceClose){
        const dropdowns = document.getElementsByClassName('toolbar_dropdown');
        const isOpen = document.getElementById('toolbar_objCreation_dropdown');
        for(let i = 0; i < dropdowns.length; i++){
            dropdowns.item(i).remove();
        }
        if(!isOpen && forceClose)createDropdown();
    }

    return toggleDropdown;
}

import setWindow from '../settingsWindow/settingsWindow.js'

function openSettings(){
    bb.fastGet('UI','installUI')({name:setWindow.name,link:setWindow.link,cb:setWindow.cb});
    bb.fastGet('UI','loadUI')(setWindow.name);
}

import invWindow from '../inventoryWindow/inventoryWindow.js'

function openInventory(){
    bb.fastGet('UI','installUI')({name:invWindow.name,link:invWindow.link,cb:invWindow.cb});
    bb.fastGet('UI','loadUI')(invWindow.name);
}

function onSearch(ev){
    document.getElementById('toolbar_search_result')?.remove();
    const query = ev.target.value;

    if(query === '')return;

    const objects = Engine.ObjectManager.objects;

    const arr = [];
    const tempArray = [];
    const onlyObjects = bb.fastGet('settings','Only show objects in search');
    for(let i in objects){
        const obj = objects[i];
        if(obj.name.toLowerCase().includes(query.toLowerCase()))arr.push(obj.name);
        if(onlyObjects)continue;
        const states = obj.getStates();
        for(let j in states){
            if(j.toLowerCase().includes(query.toLowerCase()))tempArray.push(obj.name+'#'+j);
        }
        const values = obj.getValues();
        for(let j in values){
            if(j.toLowerCase().includes(query.toLowerCase()))tempArray.push(obj.name+'#'+j);
        }
        const events = obj.getEvents();
        for(let j in events){
            if(j.toLowerCase().includes(query.toLowerCase()))tempArray.push(obj.name+'#'+j);
        }
        const options = obj.getOptions();
        for(let j in options){
            if(j.toLowerCase().includes(query.toLowerCase()))tempArray.push(obj.name+'#'+j);
        }
    }



    arr.push(...tempArray);

    const searchRes = uiFactory.createElement({
        parent: document.body,
        id: 'toolbar_search_result',
        classList: 'toolbar_dropdown'
    });

    const searchBar = document.getElementById('toolbar_search');

    searchRes.style.top = searchBar.offsetTop + searchBar.offsetHeight + 'px';
    searchRes.style.left = searchBar.offsetLeft + 'px';

    arr.forEach((name)=>{
        const item = uiFactory.createElement({
            parent: searchRes,
            classList: 'toolbar_dropdown_item',
        });

        item.insertAdjacentHTML('beforeend',name.replace(query,'<b style="color:var(--secondary-color);">'+escape(query)+'</b>'));

        item.onclick = ()=>{
            searchRes.remove();
            searchBar.value = '';
            if(name.includes('#'))name = name.split('#')[0];
            const obj = Engine.ObjectManager.getObjectByName(name);
            focusedObject(obj.id);
        };
    });
}

function onToolbarLoaded(){
    const backBut = document.getElementById('toolbar-logo-img');
    backBut.onclick = (() => {
        if(bb.fastGet('settings','Show Prompt On Actions')){
            bb.fastSet('events','openPrompt',{
                title: 'Go To Homepage',
                description: `If you accept you will be redirected and you will lose all the progress if you haven't saved`,
                onAccept: ()=>{
                    window.location = '/';
                }
            });
        }else{
            window.location = '/';
        }
    });

    let dropdown = document.getElementById('toolbar_actions_dropdown_button');
    let toggle = actionsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_actions').addEventListener('click',toggle);

    dropdown = document.getElementById('toolbar_liveobjects_dropdown_button');
    toggle = objectsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_liveobjects').addEventListener('click',toggle);

    dropdown = document.getElementById('toolbar_objCreation_dropdown_button');
    toggle = objCreationDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_objCreation').addEventListener('click',toggle);

    document.getElementById('toolbar_settings').addEventListener('click',openSettings);
    document.getElementById('toolbar_inventory').addEventListener('click',openInventory);

    const searchBar = document.getElementById('toolbar_search');
    searchBar.onkeyup = onSearch;
    searchBar.placeholder = tr.get('Search');
    searchBar.onkeypress = (key)=>{
        if(key.code === 'Enter'){
            const res = document.getElementsByClassName('toolbar_dropdown_item');
            res.item(0)?.click();
        }
    }

    document.getElementById('toolbar_saveLocal').style.cursor = 'pointer';
    document.getElementById('toolbar_saveLocal').onclick = ()=>{
        bb.fastGet('actions','Save(locally)')()
        bb.fastSet('events','showFeedback',`Saved Game Locally`);
    };
    
    document.getElementById('toolbar_downloadState').style.cursor = 'pointer';
    document.getElementById('toolbar_downloadState').onclick = ()=>{
        bb.fastGet('actions','Save(Remote)')();
        bb.fastSet('events','showFeedback',`Game Downloaded`);
    };
}