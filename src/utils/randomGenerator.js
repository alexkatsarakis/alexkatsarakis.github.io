
import assert from './assert.js'

class Randomizer {
    _numberOfKeysProvided;
    _data;

    constructor(){
        this._numberOfKeysProvided = 0;
        this._data = {};
        this._data['capitalChars'] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this._data['smallChars'] = 'abcdefghijklmnopqrstuvwxyz';
        this._data['numbers'] = '0123456789';
        this._data['specialChars'] ='\`@#$%^&*()_+-=;\\/.,:"\'[]{}|';
        this._data['hex'] = '0123456789abcdef'
   
    }

    randomNumber({min = 0, max = 9, length = 10}){
        assert.check(min < max,'max of random number must be greater than min');
        assert.check(length > 0,'length of random number must be greater than 0');
        let accum = "";
        for(let i = 0; i < length; i++) {
            accum += Math.floor(Math.random() * (max - min + 1) + min);
        }
        return Number.parseInt(accum);
    }

    randomString({capital = false,small = false,number = false,special = false,length = 10} = {capital:false,small:true,number:false,special:false,length:10}){
        assert.check(length > 0,'length of random string must be greater than 0');

        let fromStringToChoose = "";
        if(capital)fromStringToChoose += this._data['capitalChars'];
        if(small)fromStringToChoose += this._data['smallChars'];
        if(number)fromStringToChoose += this._data['numbers'];
        if(special)fromStringToChoose += this._data['specialChars'];
        assert.check(fromStringToChoose.length > 0, 'you didn\'t choose any char set');
        let accum = "";
        for(let i = 0; i < length; i++) {
            accum += fromStringToChoose[Math.floor(Math.random() * fromStringToChoose.length)];
        }
        return accum;
    }

    randomHex({length = 6}){
        assert.check(length > 0,'length of random string must be greater than 0');

        let accum = "";
        for(let i = 0; i < length; i++) {
            accum += this._data['hex'][Math.floor(Math.random() * this._data['hex'].length)];
        }
        return accum;
    }

    generateGameID(){
        this._numberOfKeysProvided++;
        return rand.randomString({capital: true, small:true, number:true, length:15})
    }

}

const rand = new Randomizer();

export default rand;