import json from '../../../assets/json/AnimationFilmHolderJSON.js'

import AnimationFilm from './AnimationFilm.js'

class AnimationFilmHolder {
    _films = {}; // id -> animationFilm
    _assetsToLoad = new Set();

    loadAll(){
        for(let i in json.boxes){
            let id = i.split("_");
            id.length = id.length -1;
            id = id.join("_");
            let item = json.boxes[i];
            if(!this._films[id]){
                let animFilm = new AnimationFilm({
                    id: id,
                    bitmap: item.sprite_url,
                });
                this._films[id] = animFilm;
            }
            this._assetsToLoad.add(item.sprite_url);
            this._films[id].append({x:item.x,y:item.y,width:item.width,height:item.height});
        }
    }

    cleanUp(){
        this._films = {};
    }

    getFilm(id){
        return this._films[id];
    }

    getAssetsToLoad(){
        return this._assetsToLoad;
    }

};

const animationFilmHolder = new AnimationFilmHolder();

export default animationFilmHolder;