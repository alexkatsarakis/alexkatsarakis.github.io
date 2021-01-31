export default class OptionManager{
    _regOptions = {};

    constructor(def){
        if(def){
            this.registerOption('isMovable',true);
            this.registerOption('isRemovable', true);
            this.registerOption('isVisible', true);
            this.registerOption('isSolid', false);
            this.registerOption('isCollidable', true);
        }
    }

    getOptions() {
        return this._regOptions;
    }

    registerOption(opt) {
        this._regOptions[opt] = true;
    }

    getOption(opt) {
        return this._regOptions[opt];
    }

    setOption(opt, val) {
        this._regOptions[opt] = val;
    }

    removeOption(opt){
        delete this._regOptions[opt];
    }
}