import bb from "../../utils/blackboard.js";

import animatorManager from "./Animators/AnimatorManager.js";
import MovingAnimator from "./Animators/AnimatorCategories/MovingAnimator.js";
import FrameRangeAnimator from "./Animators/AnimatorCategories/FrameRangeAnimator.js";

import animationManager from "./Animations/AnimationManager.js";
import animationFilmHolder from "./Animations/AnimationFilmHolder.js";
import MovingAnimation from "./Animations/AnimationCategories/MovingAnimation.js";
import FrameRangeAnimation from "./Animations/AnimationCategories/FrameRangeAnimation.js";

import Manager from "../Manager.js";

import Engine from "../../Engine.js";

export default class AnimationManager extends Manager {
  _animationFilms;
  _animationManagement;
  _animationCategories;
  _animatorCategories;

  constructor() {
    super();
    this._animationFilms = [];
    this._animationManagement = [];
    this._animationCategories = {
      MovingAnimation: MovingAnimation,
      FrameRangeAnimation: FrameRangeAnimation,
    };
    this._animatorCategories = {
      MovingAnimator: MovingAnimator,
      FrameRangeAnimator: FrameRangeAnimator,
    };
  }

  setAnimationFilms(anFilms) {
    this._animationFilms.push(anFilms);
  }

  setAnimationManagement(anMan) {
    this._animationManagement.push(anMan);
  }

  getAnimationCategory(cat) {
    return this._animationCategories[cat];
  }

  getAnimatorCategory(cat) {
    return this._animatorCategories[cat];
  }

  getAnimators() {
    return animatorManager.getAnimators();
  }

  restoreAnimators(newAnimators) {
    animatorManager.restoreAnimators(newAnimators);
  }

  onLoad() {
    this._animationFilms.forEach((films) => {
      animationFilmHolder.loadAll(films);
    });
    this._animationManagement.forEach((manag) => {
      animationManager.loadAll(manag);
    });

    animationFilmHolder.getAssetsToLoad().forEach((asset) => {
      if (!bb.fastGet("assets", asset)) {
        let img = new Image();
        img.src = asset;
        bb.fastInstall("assets", asset, img);
      }
    });
  }

  onSave() {
    const allAnimations = animationManager._animations;
    return JSON.stringify(allAnimations);
  }

  onRetrieve(data) {
    const anims = JSON.parse(data);
    const items = {
      animations: [],
    };
    for (let i in anims) {
      const anim = anims[i];
      const newF = {
        id: anim.animation._id,
        film: anim.film._id,
        start: anim.animation._start,
        end: anim.animation._end,
        reps: anim.animation._reps,
        dx: anim.animation._dx,
        dy: anim.animation._dy,
        delay: anim.animation._delay,
      };
      items.animations.push(newF);
    }
    this.setAnimationManagement(items);
  }

  progress(gameTime) {
    animatorManager.progress(gameTime);
  }

  timeShift(gameTime) {
    animatorManager.timeShift(gameTime);
  }

  getAllFilms() {
    return animationFilmHolder._films;
  }

  getFilm(film) {
    return animationFilmHolder.getFilm(film);
  }

  getAnimation(animID) {
    return animationManager.getAnimation(animID);
  }

  getAllAnimations() {
    return animationManager._animations;
  }

  removeAnimation(animID) {
    const installed = animationManager.getAnimation(animID);
    if (!installed) return;
    animationManager.remove(animID);
  }

  registerNewAnimation(anim, filmID) {
    const installed = animationManager.getAnimation(anim.id);
    if (installed) {
      const runningAnims = animatorManager.getAnimators();
      runningAnims.forEach((animator) => {
        if (animator.animation.id === anim.id) {
          animator.animation = anim;
        }
      });
    }
    return animationManager.register(anim, filmID);
  }

  playAnimation = ({
    object,
    anim,
    onStart,
    onFinish,
    animator = "FrameRangeAnimator",
  }) => {
    if (!anim) return;
    if (!object) return;

    const Animator = this.getAnimatorCategory(animator);
    if (!Animator) return;

    const an = new Animator();
    const animation = this.getAnimation(anim);

    let oldFilm;
    an.onStart = (animator, ani) => {
      if (!object.isAlive) {
        object = Engine.ObjectManager.objects[object.id];
      }
      if (onStart) {
        if (typeof onStart === "function") onStart();
        else if (typeof onStart === "string")
          Engine.ScriptingManager.executeCode({ code: onStart }, object.id);
      }
      object.setAnimator(animator);
      oldFilm = object.getValue("film");
      const anim = Engine.AnimationManager.getAnimation(ani.id);
      object.setValue("film", anim.film.id, {
        explanation: `Action from animation ${an.animation._id}`,
      });
    };
    an.onAction = (animator) => {
      object.setValue("frame", animator.currentFrame, {
        explanation: `Action from animation ${an.animation._id}`,
      });
      const x = animator.animation.dx;
      const y = animator.animation.dy;
      if (x !== 0)
        object.setValue("x", object._x + x, {
          explanation: `Action from animation ${animator.animation._id}`,
        });
      if (y !== 0)
        object.setValue("y", object._y + y, {
          explanation: `Action from animation ${animator.animation._id}`,
        });
      // object.move(animator.animation.dx,animator.animation.dy);
    };
    an.onFinish = () => {
      object.setValue("frame", 0, {
        explanation: `Action from animation ${an.animation._id}`,
      });
      object.setValue("film", oldFilm, {
        explanation: `Action from animation ${an.animation._id}`,
      });
      if (onFinish) {
        if (typeof onFinish === "function") onFinish();
        else if (typeof onFinish === "string")
          Engine.ScriptingManager.executeCode({ code: onFinish }, object.id);
      }
    };

    an.start({
      animation: animation.animation,
      timestamp: bb.fastGet("state", "gameTime"),
    });
  };
}
