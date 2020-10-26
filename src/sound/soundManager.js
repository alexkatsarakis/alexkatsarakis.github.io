class SoundManager {
    prefix = './assets/sounds/';
    postfix = '.wav';
    sounds = {};
    playingOnRepeat = {};
    playingOnce = {};

    restart = true;

    addSound(tag,url){
        if(this.sounds[tag])throw Error('Tried to add a sound that already exists');
        
        this.sounds[tag] = new Audio(this.prefix+url+this.postfix);
        
    };

    getSounds(){
        return this.sounds;
    }

    removeSound(tag){
        if(!this.sounds[tag])throw Error('Tried to remove a sound that doesn\'t exists');

        delete this.sounds[tag];
    };

    playSoundOnRepeat(sound='demo'){
        if(this.playingOnRepeat[sound]){
            if(this.restart)this.sounds[sound].currentTime = 0;
            return;
        }
        this.sounds[sound].loop = true;
        this.sounds[sound].play();
        this.playingOnRepeat[sound] = this.sounds[sound];
    };

    stopSoundOnRepeat(sound='demo'){
        if(!this.playingOnRepeat[sound])throw Error('tried to stop a sound that isn\'t playing');

        this.playingOnRepeat[sound].pause();
        delete this.playingOnRepeat[sound];
        this.sounds[sound].loop = false;
        this.sounds[sound].currentTime = 0;
    }

    playSound(sound='demo'){
        if(!this.sounds[sound])throw Error('Tried to play a sound that doesn\'t exists');

        if(this.playingOnce[sound]){
            if(this.restart)this.sounds[sound].currentTime = 0;
            return;
        }
        this.sounds[sound].onended = ()=>{
            this.stopSound(sound);
        };
        this.sounds[sound].play();

        this.playingOnce[sound] = this.sounds[sound];
    }

    stopSound(sound='demo'){
        if(!this.playingOnce[sound])throw Error('tried to stop a sound that isn\'t playing');

        this.playingOnce[sound].pause();
        delete this.playingOnce[sound];
        delete this.sounds[sound].onended;
        this.sounds[sound].currentTime = 0;
    }

    stopAllSounds(){
        for(let i in this.playingOnRepeat){
            this.stopSoundOnRepeat(i);
        }
        for(let i in this.playingOnce){
            this.stopSound(i);
        }
    }

}

const soundManager = new SoundManager();

export default soundManager;