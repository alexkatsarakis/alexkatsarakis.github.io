export default class Value {
    val

    constructor({value,onChange,getValue}){
        if(typeof onChange !== 'function' || (typeof getValue !== 'function' && getValue !== undefined)){
            throw Error("Error creating value")
        } 
        this.val = value;
        this.onChange = onChange;
        this.getValue = getValue;
    }
}