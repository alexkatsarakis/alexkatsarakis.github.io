import bb from '../../utils/blackboard.js'

class Event {
    val
    tag
    onChange
    getValue
    constructor({tag,value,onChange,getValue}){
        if(typeof tag !== 'string'
        || (typeof onChange !== 'function' && getValue !== undefined)
        || (typeof getValue !== 'function' && getValue !== undefined)){
            throw Error("Error creating value")
        }
        this.tag = tag;
        this.val = value;
        this.onChange = (onChange)?onChange:(val)=>this.val = val;
        this.getValue = getValue;
    }
}

export default class EventsFunctionality {
    _regEvents = {}

    constructor(def){
        if(def){
            this.registerEvent('onClick',{tag: 'system'});
            this.registerEvent('onRightClick',{tag: 'system'});
            this.registerEvent('onGameStart',{tag: 'system'});
            this.registerEvent('onRemove',{tag: 'system'});
            this.registerEvent('onMove',{tag: 'system'});
            this.registerEvent('onEachFrame',{tag: 'system'});
        }
    }

    registerEvent(name,{tag,code}){
        this._regEvents[name] = new Event({
            tag: (tag)?tag: 'system',
            value: (code) ? code : ""
        });
    }

    getEvents() {
        return this._regEvents;
    }

    getEvent(ev) {
        let event = this._regEvents[ev];
        if (!event) { // log.logError('Couldn\'t get event '+ev+' because it doesn\'t exists');
            return;
        }
        if (event.getValue) 
            return event.getValue();
        
        return event.val;
    }

    setEvent(ev, code) {
        let event = this._regEvents[ev];
        if (!event) {
            this.registerEvent(ev, code);
            return;
        }
        event.val = code;
        if (event.onChange) 
        event.onChange(code);
        
    }

    removeEvent(ev){
        delete this._regEvents[ev];
    }

    triggerEvent(ev) {
        if (!this._regEvents[ev]) 
            return;
        
        bb.fastGet('scripting', 'executeText')(this.getEvent(ev)); // TODO
    }

}
