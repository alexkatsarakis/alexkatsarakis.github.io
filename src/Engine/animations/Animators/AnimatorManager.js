class AnimatorManager {
  _running = [];
  _suspended = [];

  register(anim) {
    // class Animator
    // if(this._suspended.find(anim) !== undefined) throw Error('Error while registering animation',anim);
    this._suspended.push(anim);
  }

  markAsRunning(anim) {
    let index = this._suspended.indexOf(anim);
    if (index > -1) {
      this._suspended.splice(this._suspended.indexOf(anim), 1);
    }
    this._running.push(anim);
  }

  markAsSuspended(anim) {
    const index = this._running.indexOf(anim);
    if (index > -1) {
      this._running.splice(this._running.indexOf(anim), 1);
      this._suspended.push(anim);
    } else {
      // throw Error('Error while marking animation as suspended',anim);
    }
  }

  progress(currTime) {
    for (let an in this._running) this._running[an].progress(currTime);
    this.destroyFinishedAnimators();
  }

  timeShift(dt) {
    for (let an in this._running) this._running[an].timeShift(dt);
  }

  destroyFinishedAnimators() {
    this._suspended = [];
  }

  getAnimators() {
    return [...this._running];
  }

  restoreAnimators(newAnimators) {
    this._running = newAnimators;
  }
}

const animatorManager = new AnimatorManager();
export default animatorManager;
