import FrameRangeAnimation from './AnimationCategories/FrameRangeAnimation.js'
import animationFilmHolder from './AnimationFilmHolder.js'

class AnimationManager {
    _animations = {};
    _defValues = {        
        "start": 0,
        "end": "max",
        "reps": -1,
        "dx": 0,
        "dy": 0,
        "delay": 80
    }

    loadAll(json){
        json.animations.forEach((item)=>{
            this.load(item);
        });
    }

    load(item){
        if(!item.id || !item.film)throw Error('given animation doesn\'t have id/film');
        item.start = item.start || this._defValues.start;
        item.end = item.end || this._defValues.end;
        item.reps = item.reps || this._defValues.reps;
        item.dx = item.dx || this._defValues.dx;
        item.dy = item.dy || this._defValues.dy;
        item.delay = item.delay || this._defValues.delay;
        
        const film = animationFilmHolder.getFilm(item.film);
        item.end = (item.end !== 'max')?item.end:film.totalFrames-1;

        this._animations[item.id] = {animation: new FrameRangeAnimation(item),film: film};
    }

    register(anim,film){ // class Animation
        this._animations[anim.id] = {animation:anim,film:animationFilmHolder.getFilm(film)};
    }

    getAnimation(id){
        return this._animations[id];
    }

}

const animationManager = new AnimationManager();

export default animationManager;
