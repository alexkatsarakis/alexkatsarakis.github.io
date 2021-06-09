import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'
import uiFactory from '../../utils/UIFactory.js'

import filmsT from './films/inventoryFilms.js'
import animsT from './animations/inventoryAnimations.js'
import objecT from './objects/inventoryObjects.js'
import clipbT from './clipboard/inventoryClipboard.js'
import collsT from './collisions/inventoryCollisions.js'
import snapsT from './snapshots/inventorySnapshots.js'
import sceneT from './scenes/inventoryScenes.js'

export default {
    name:'inventoryWindow',
    link: './src/UI/inventoryWindow/inventoryWindow.ahtml',
    cb:onSettingsInventoryLoaded,
    removable: true, 
    loadOnInstall: true
};

const inventoryTabs = {}


inventoryTabs[filmsT.name] = filmsT;
inventoryTabs[animsT.name] = animsT;
inventoryTabs[objecT.name] = objecT;
inventoryTabs[collsT.name] = collsT;
inventoryTabs[clipbT.name] = clipbT;
inventoryTabs[snapsT.name] = snapsT;
inventoryTabs[sceneT.name] = sceneT;




let lastGameState;

function closeInventoryWindow(){
    clear();
    bb.fastGet('UI','hideUI')('inventoryWindow');
    bb.fastGet('UI','removeUI')('inventoryWindow');

    if(lastGameState){
        bb.fastSet('state','mode',lastGameState);
    }
}

function focusTab(tabName){
    clear();
    const tabs = document.getElementsByClassName('inventory-window-tabs-item');
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList = 'inventory-window-tabs-item';
        if(tabs[i].value === tabName){
            tabs[i].classList += ' inventory-window-tabs-item-selected';
        }
    }
}

let body = document.getElementById('inventory-window-body');

function createTab({name,icon,callback,restriction = true}){
    
    if(!restriction)return;

    const tabDiv = document.getElementById('inventory-window-tabs');
    const tab = uiFactory.createElement({
        classList: 'inventory-window-tabs-item',
        innerHTML: name,
        value: name,
        parent: tabDiv
    });
    tab.insertAdjacentHTML('beforeend', icon);
    tab.onclick = () => {
        focusTab(name);
        callback(body);
    }
    return tab;
}

function onSettingsInventoryLoaded(){
    document.getElementById('inventory-window-background').addEventListener('click',closeInventoryWindow);
    document.getElementById('inventory-window-head-close').addEventListener('click',closeInventoryWindow);
    
    lastGameState = bb.fastGet('state','mode');
    bb.fastSet('state','mode','popUpOpen');
    
    body = document.getElementById('inventory-window-body');

    for(let i in inventoryTabs){
        const tabInfo = inventoryTabs[i];
        createTab({
            name:i,
            icon: tabInfo.svgIcon,
            callback: tabInfo.callback,
            restriction: tabInfo.restriction
        })
    }

    document.getElementsByClassName('inventory-window-tabs-item').item(0).click();

}

function clear(){
    for(let i in inventoryTabs){
        if(inventoryTabs[i].clear)inventoryTabs[i].clear();
    }
}
