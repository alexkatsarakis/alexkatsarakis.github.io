import serverCommuncator from '../../utils/serverCommunication.js'
import httpRequest from '../../utils/httpRequest.js'

import Engine from '../../Engine.js'

export default class SaveManager {
    _DBName = 'superMarioReal';
    // _DBName = 'myPersonalPage';
    _loadRemote = false;

    _localState = './assets/json/savedState.json'; 
    _localPreSettedAnim = './assets/json/AnimationManager.json';
    _localAnimationFilms = './assets/json/AnimationFilmHolder.json';

    constructor(){
    }

    getPreSettedAnim(){
        return new Promise((resolve, reject) => {
            httpRequest('GET',this._localPreSettedAnim,null).then((resp)=>{
                resolve(JSON.parse(resp));
            });
        });
    }

    getAnimationFilms(){
        return new Promise((resolve, reject) => {
            httpRequest('GET',this._localAnimationFilms,null).then((resp)=>{
                resolve(JSON.parse(resp));
            });
        });
    }

    getObjects(){
        if(this._loadRemote) return this.getObjectsDB();
        return this.getObjectsLocal();
    }

    getObjectsLocal(){
        return new Promise((resolve, reject) => {
                httpRequest('GET',this._localState,null).then((resp)=>{
                    let res;
                    try{
                        res = JSON.parse(resp);
                    }catch(err){
                        res = [];
                    }
                    let arr = [];
            
                    for(let i in res){
                        arr.push(res[i]);
                    }
                    resolve(arr);
                });
        });
    }

    getObjectsDB(){
        serverCommuncator.tableName = this._DBName;
        return new Promise((resolve, reject) => {
            serverCommuncator.getTable(serverCommuncator.tableName,(res)=>{
                if(res !== ''){
                    res = JSON.parse(res);
                    res.forEach( element => {
                        element.objectInfo = element.objectInfo.replace(/'/g,'"').replace(/~/g,"'");
                        element.objectInfo = JSON.parse(element.objectInfo);
                    })
                    res = res.map(item => item.objectInfo);
                    resolve(res);
                }else{
                    resolve([]);
                }
            });
        });
    }

    saveObjectsDB(){
        let tableName = serverCommuncator.tableName;
        let objects = Engine.ObjectManager.objects;
        
        console.log(objects);
        
        serverCommuncator.clearTable(tableName).then( () => {
            for(let i in objects){
                let obj = objects[i];
                for(let i in obj.getValues()){
                    obj.setValue(i,obj.getValue(i));
                }
                
                serverCommuncator.updateItemToTable(tableName,{
                    key: "id",
                    value: '"'+i+'"',
                },
                [
                    {
                        name: 'id',
                        type: 'TEXT',
                        value: obj.id
                    },
                    {
                        name: 'objectInfo',
                        type: 'TEXT',
                        value: obj.toString().replace(/'/g,"~").replace(/"/g,"'")
                    }
                ])
            }    
        })
    }

    saveObjectsLocal(){
        let liveObj = Engine.ObjectManager.objects;
        let toSave = {};
        for(let i in liveObj){
            toSave[i] = JSON.parse(liveObj[i].toString());
        }
    
        console.log(toSave);
        var textFileAsBlob = new Blob([JSON.stringify(toSave)], {type:'application/json'}); 
        var downloadLink = document.createElement("a");
        downloadLink.download = "savedState.json";
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

    saveObjects(){
        if(this._loadRemote) return this.saveObjectsDB();
        return this.saveObjectsLocal();
    }

    getSavedAnimations(){
        return new Promise((resolve, reject) => {
            httpRequest('GET',this._localState,null).then((resp)=>{
                let res = JSON.parse(resp);
                let arr = [];
        
                for(let i in res){
                    arr.push(res[i]);
                }
                resolve(arr);
            });
        });
    }

    async setEngine(callback){

        let promise1 = this.getObjects();
        let promise2 = this.getAnimationFilms();
        let promise3 = this.getPreSettedAnim();

        let preSetAnimations = await promise3;
        let animationBundle = await promise2;
        let objects = await promise1;

        //We do the above technique to start loading all at the same time
        // ------ wait        instead of -------wait
        // ----------- wait                         ---------wait
        // ----------------- wait                                -----------wait
        // 

        Engine.initInfo = {
            objects: objects
        };

        Engine.preSetAnimations = preSetAnimations;
        Engine.animationBundle = animationBundle;
        Engine.AnimationManager.setAnimationFilms(animationBundle);
        Engine.AnimationManager.setAnimationManagement(preSetAnimations);
        callback();
    }

}