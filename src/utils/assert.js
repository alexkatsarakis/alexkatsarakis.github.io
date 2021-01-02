
class Assert {
    _assertionState = true;

    check(state, errMessage){
        if(this._assertionState === true && !state)
            throw Error((errMessage)?errMessage:'Error on Assertion');
    }

}

const assert = new Assert();

export default assert;