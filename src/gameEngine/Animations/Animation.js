export default class Animation {
    _id;

    constructor(id){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    set id(newId){
        this._id = newId;
    }
}