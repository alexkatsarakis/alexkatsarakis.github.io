import bb from '../utils/blackboard.js'

const UIs = [
    'keyboard',
    'objectInfo',
    'objectMenu',
    'createObjectMenu',
    'animationPreview',
    'collisionPreview',
    'hud',
    'toolbar',
    'gridView',
    'objectFloatingInfo'
]

function getFile(id,cb){
    import(`./${id}/${id}.js`).then((res)=>{
        cb(res.default);
    }).catch(err =>{
        throw Error(err + ' Loading File on UIs');
    });
}

class UIManager {
    _UILoaded = [];
    _removable = {};
    _UIInstalled = {};

    constructor(){
        UIs.forEach((item)=>{
            getFile(item,(val) => uiManager.installUI(val));
        })
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

    installUI({name,link,cb,removable,loadOnInstall}){
        if(this._UIInstalled[name]) throw Error('Installing an already installed UI');
        this._UIInstalled[name] = {link:link,cb:cb};
        if(removable)this._removable[name] = true;
        if(loadOnInstall)this.loadUI(name);
    }

    removeUI(name){
        if(!this._UIInstalled[name]) throw Error('Removing a UI that doesn\'t exist');
        delete this._UIInstalled[name];
        if(this._removable[name])delete this._removable[name];
    }

    loadUI(name) {
        let index = this._UILoaded.findIndex(item => item === name);
        if(!this._UIInstalled[name] || index !== -1) throw Error('Trying to load a UI that isn\'t installed');
        let info = this._UIInstalled[name];
        this._UILoaded.push(name);
        this.readTextFile(name,info.link,info.cb);
    }

    hideUI(name) {
        let index = this._UILoaded.findIndex(item => item === name);
        if(!this._UIInstalled[name] || index === -1) throw Error('Trying to hide a UI that isn\'t installed');
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
        //TODO: UPDATE THIS FUNCTION
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

bb.fastInstall('UI','getUIs',()=>{return uiManager.getUIs()});
bb.fastInstall('UI','installUI',({name,link,cb})=>uiManager.installUI({name,link,cb}));
bb.fastInstall('UI','removeUI',(name)=>uiManager.removeUI(name));
bb.fastInstall('UI','loadUI',(name)=>uiManager.loadUI(name));
bb.fastInstall('UI','loadAll',()=>uiManager.loadAll());
bb.fastInstall('UI','hideUI',(name)=>uiManager.hideUI(name));
bb.fastInstall('UI','getLoadedUIs',()=>uiManager.getLoaded());