export default class Event {
    val
    tag
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