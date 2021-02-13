import bb from '../../utils/blackboard.js'

class Option {
    val
    tag
    constructor({tag,value,onChange = {text: "", code: ""}}){
        // if(typeof tag !== 'string'
        // || (typeof onChange !== 'function' && onChange !== undefined)
        // || (typeof getValue !== 'function' && getValue !== undefined)){
        //     throw Error("Error creating value")
        // }
        this.tag = tag;
        this.val = value;
        this.onChange = onChange;
    }
}


export default class OptionManager{
    _regOptions = {};
    _parent

    constructor(def,parent){
        if(def){
            this.registerOption('isMovable', 'system',true);
            this.registerOption('isRemovable', 'system', true);
            this.registerOption('isVisible', 'visibility', true);
            this.registerOption('isSolid', 'physics', false);
            this.registerOption('isCollidable', 'collision', true);
        }
        this._parent = parent;
    }

    getOptions() {
        return this._regOptions;
    }

    registerOption(opt, tag = 'user' ,value = true) {
        this._regOptions[opt] = new Option({
            value: value,
            tag: tag,
        });
    }

    hasOption(opt){
        return (this._regOptions[opt] !== undefined);
    }

    getOption(opt) {
        if(!this._regOptions[opt]) return true;
        return this._regOptions[opt].val;
    }

    setOption(opt, val) {
        if(!this._regOptions[opt]) throw Error('set an option that doesn\'t exist');
        this._regOptions[opt].val = val;
        if(this._regOptions[opt].onChange.code !== "")
            bb.fastGet('scripting', 'executeCode')(this._regOptions[opt].onChange.code, this._parent); // TODO
    }

    setOptionCode(opt, code) {
        if(this._regOptions[opt])
            this._regOptions[opt].onChange = code;
    }

    getOptionCode(opt) {
        let option = this._regOptions[opt];
        if(option)
            return option.onChange;
        return {text: "", code: ""}
    }

    removeOption(opt){
        if(!this._regOptions[opt]) throw Error('remove an option that doesn\'t exist');
        delete this._regOptions[opt];
    }

    getOptionTag(opt){
        if(!this._regOptions[opt]) throw Error('get an option that doesn\'t exist');
        return this._regOptions[opt].tag;
    }
}