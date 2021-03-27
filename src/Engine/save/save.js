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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let gameName = urlParams.get('game');
        if(gameName){
            this._DBName = gameName;
            this._localState = `./assets/json/${gameName}.json`
        }
    }

    getPreSettedAnim(url){
        return new Promise((resolve, reject) => {
            httpRequest('GET',url,null).then((resp)=>{
                resolve(JSON.parse(resp));
            });
        });
    }

    getAnimationFilms(url){
        return new Promise((resolve, reject) => {
            httpRequest('GET',url,null).then((resp)=>{
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
                    resolve(res);
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
    
        return toSave;
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

    async getGame(){
        let gameInfo = await this.getObjects();

        let all = {
            objects: gameInfo.objects,
            films: [],
            preSet: []
        };
        
        let films = gameInfo.info.films;
        for(let i in films){
            let f = await this.getAnimationFilms(films[i]);
            all.films.push(f);
        }

        let preSet = gameInfo.info.preSet;
        for(let i in preSet){
            let f = await this.getPreSettedAnim(preSet[i]);
            all.preSet.push(f);
        }

        return all;
    }

    saveGame(){
        let toSave = {};
        toSave.objects = this.saveObjects();
        toSave.info = {
            name: this._DBName,
            preSet: [
                this._localPreSettedAnim
            ],
            films: [
                this._localAnimationFilms
            ]
        }

        var textFileAsBlob = new Blob([JSON.stringify(toSave)], {type:'application/json'}); 
        var downloadLink = document.createElement("a");
        downloadLink.download = "savedState.json";
        if (window.webkitURL != null){
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
    
        downloadLink.click();
    }

    async setEngine(callback){

        let game = await this.getGame();
        
        //We do the above technique to start loading all at the same time
        // ------ wait        instead of -------wait
        // ----------- wait                         ---------wait
        // ----------------- wait                                -----------wait
        // 
        
        Engine.initInfo = {
            objects: game.objects
        };

        game.films.forEach((film)=>{
            Engine.AnimationManager.setAnimationFilms(film);
        });

        game.preSet.forEach((preSet)=>{
            Engine.AnimationManager.setAnimationManagement(preSet);
        });
        

        if(game.films.length === 0){
            Engine.AnimationManager.setAnimationFilms(this._localAnimationFilms);
            Engine.AnimationManager.setAnimationManagement(this._localPreSettedAnim);
        }

        callback();
    }

}