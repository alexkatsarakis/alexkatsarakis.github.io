import Manager from "../Manager.js";

export default class SoundManager extends Manager {
  prefix = "./assets/sounds/";
  postfix = ".mp3";
  sounds = {};
  playingOnRepeat = {};
  playingOnce = {};

  restart = true;

  constructor() {
    super();
    // this.addSound('demo','demoSound');
    this.addSound("coin_pick", "coin-pick");
  }

  addSound(tag, url) {
    if (this.sounds[tag])
      throw Error("Tried to add a sound that already exists");

    this.sounds[tag] = new Audio(this.prefix + url + this.postfix);
    this.sounds[tag].volume = 0.1;
  }

  getSounds() {
    return this.sounds;
  }

  removeSound(tag) {
    if (!this.sounds[tag])
      throw Error("Tried to remove a sound that doesn't exists");

    delete this.sounds[tag];
  }

  playSoundOnRepeat(sound) {
    if (this.playingOnRepeat[sound]) {
      if (this.restart) this.sounds[sound].currentTime = 0;
      return;
    }
    this.sounds[sound].loop = true;
    this.sounds[sound].play();
    this.playingOnRepeat[sound] = this.sounds[sound];
  }

  stopSoundOnRepeat(sound) {
    if (!this.playingOnRepeat[sound])
      throw Error("tried to stop a sound that isn't playing");

    this.playingOnRepeat[sound].pause();
    delete this.playingOnRepeat[sound];
    this.sounds[sound].loop = false;
    this.sounds[sound].currentTime = 0;
  }

  playSound(sound) {
    if (!this.sounds[sound])
      throw Error("Tried to play a sound that doesn't exists");

    if (this.playingOnce[sound]) {
      if (this.restart) this.sounds[sound].currentTime = 0;
      return;
    }
    this.sounds[sound].onended = () => {
      this.stopSound(sound);
    };
    this.sounds[sound].play();

    this.playingOnce[sound] = this.sounds[sound];
  }

  stopSound(sound) {
    if (!this.playingOnce[sound])
      throw Error("tried to stop a sound that isn't playing");

    this.playingOnce[sound].pause();
    delete this.playingOnce[sound];
    delete this.sounds[sound].onended;
    this.sounds[sound].currentTime = 0;
  }

  stopAllSounds() {
    for (let i in this.playingOnRepeat) {
      this.stopSoundOnRepeat(i);
    }
    for (let i in this.playingOnce) {
      this.stopSound(i);
    }
  }
}
