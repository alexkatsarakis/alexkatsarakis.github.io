export default class AnimationFilm {
  _boxes;
  _bitmap;
  _id;
  _currentFrame;

  constructor({ id, bitmap = "", boxes = [] }) {
    this._id = id;
    this._bitmap = bitmap;
    this._boxes = boxes;
  }

  get totalFrames() {
    return this._boxes.length;
  }

  get bitmap() {
    return this._bitmap;
  }

  get id() {
    return this._id;
  }

  set bitmap(bmap) {
    this._bitmap = bmap;
  }

  append(rect) {
    this._boxes.push(rect);
  }

  getFrameBox(frameNo) {
    return this._boxes[frameNo];
  }
}
