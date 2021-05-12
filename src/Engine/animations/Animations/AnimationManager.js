import FrameRangeAnimation from './AnimationCategories/FrameRangeAnimation.js'
import animationFilmHolder from './AnimationFilmHolder.js'

class AnimationManager {
    _animations = {};

    loadAll(json){
        json.animations.forEach((item)=>{
            if(!item.id || !item.film)throw Error('given animation doesn\'t have id/film');
            item.start = item.start || json.defaultValues.start;
            item.end = item.end || json.defaultValues.end;
            item.reps = item.reps || json.defaultValues.reps;
            item.dx = item.dx || json.defaultValues.dx;
            item.dy = item.dy || json.defaultValues.dy;
            item.delay = item.delay || json.defaultValues.delay;
            
            const film = animationFilmHolder.getFilm(item.film);
            item.end = (item.end !== 'max')?item.end:film.totalFrames-1;

            this._animations[item.id] = {animation: new FrameRangeAnimation(item),film: film};
        });
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
