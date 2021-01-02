export default class Value {
    val
    tag
    constructor({tag,value,onChange,getValue}){
        if(typeof tag !== 'string'
        || typeof onChange !== 'function' || (typeof getValue !== 'function' && getValue !== undefined)){
            throw Error("Error creating value")
        }
        this.tag = tag;
        this.val = value;
        this.onChange = onChange;
        this.getValue = getValue;
    }
}