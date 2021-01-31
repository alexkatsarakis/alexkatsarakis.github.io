import bb from '../utils/blackboard.js'

import keyboard from './keyboard/keyboard.js'
import objInfo from './objectInfo/objectInfo.js'
import toolbar from './toolbar/toolbar.js'
import objMenu from'./objectMenu/objectMenu.js'
import createObjMenu from './createObjectMenu/createObjectMenu.js'
import aninPrev from './animationPreview/animationPreview.js'
import colPrev from './collisionPreview/collisionPreview.js'
import hud from './hud/hud.js'

class UIManager {
    _UILoaded = [];
    _removable = {};
    _UIInstalled = {};

    constructor(){
        this.installUI({name:hud.name,link:hud.link,cb:hud.cb},false);
    }

    getUIs(){
        return Object.keys(this._removable);
    }

    loadAll(){
        for(let i in this._UIInstalled){
            this.loadUI(i);
        }
    }

    getLoaded(){
        return this._UILoaded;
    }

    installUI({name,link,cb},removable = true){
        if(this._UIInstalled[name])return;
        this._UIInstalled[name] = {link:link,cb:cb};
        if(removable)this._removable[name] = true;
    }

    removeUI(name){
        if(!this._UIInstalled[name])return;
        delete this._UIInstalled[name];
        if(this._removable[name])delete this._removable[name];
    }

    loadUI(name) {
        let index = this._UILoaded.findIndex(item => item === name);
        if(!this._UIInstalled[name] || index !== -1)return;
        let info = this._UIInstalled[name];
        this._UILoaded.push(name);
        this.readTextFile(name,info.link,info.cb);
    }

    hideUI(name) {
        let index = this._UILoaded.findIndex(item => item === name);
        if(!this._UIInstalled[name] || index === -1)return;
        document.getElementById('_UIWRAPPER_'+name).remove();
        this._UILoaded.splice(index,1);
    }
    
    readTextFile(name,file,onFinish){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    let UIwrapper = document.createElement('div');
                    UIwrapper.id = '_UIWRAPPER_'+name;
                    UIwrapper.insertAdjacentHTML('beforeend',allText);
                    document.body.appendChild(UIwrapper);
                    onFinish();
                }
            }
        }
        rawFile.send(null);
    }

    convertHTMLtoObjects(){
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
}

const uiManager = new UIManager();

uiManager.installUI({name:keyboard.name,link:keyboard.link,cb:keyboard.cb});
uiManager.installUI({name:objInfo.name,link:objInfo.link,cb:objInfo.cb});
uiManager.installUI({name:toolbar.name,link:toolbar.link,cb:toolbar.cb},false);
uiManager.installUI({name:objMenu.name,link:objMenu.link,cb:objMenu.cb});
uiManager.installUI({name:createObjMenu.name,link:createObjMenu.link,cb:createObjMenu.cb});
uiManager.installUI({name:aninPrev.name,link:aninPrev.link,cb:aninPrev.cb});
uiManager.installUI({name:colPrev.name,link:colPrev.link,cb:colPrev.cb});

uiManager.loadAll();

bb.fastInstall('UI','getUIs',()=>{return uiManager.getUIs()});
bb.fastInstall('UI','installUI',({name,link,cb})=>uiManager.installUI({name,link,cb}));
bb.fastInstall('UI','removeUI',(name)=>uiManager.removeUI(name));
bb.fastInstall('UI','loadUI',(name)=>uiManager.loadUI(name));
bb.fastInstall('UI','loadAll',()=>uiManager.loadAll());
bb.fastInstall('UI','hideUI',(name)=>uiManager.hideUI(name));
bb.fastInstall('UI','getLoadedUIs',()=>uiManager.getLoaded());

uiManager.convertHTMLtoObjects();