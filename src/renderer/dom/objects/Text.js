import Object from './ObjectDom.js'
<<<<<<< HEAD

import Value from '../../../objects/Value.js'
=======
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611

import bb from '../../../utils/blackboard.js'
function pxToNumber(str){
    str.substr(1,str.length-4);
    return parseInt(str);
}
class Text extends Object {
    
    constructor({name,texture,dim,defaultText,div}){
        super(name);
        
        if(div)this.div = div;
        else this.createElement({name,texture,dim,defaultText});

<<<<<<< HEAD
        this.values['text'] = new Value({
            onChange: (value) => this.div.innerHTML = value,
            getValue: () => {return this.div.innerHTML;}
        });

        this.values['colour'] = new Value({
            onChange: (value) => this.div.style.color = value,
            getValue: () => {return this.div.style.color;}
        });

        this.values['bold'] = new Value({
            value: false,
            onChange: (newVal) => this.div.style.fontWeight = (newVal)?"bold":"normal"
        });
=======
        this.values['text'] = {
            val: this.div.innerHTML,
            onChange: (newVal) => {
                this.div.innerHTML = newVal;
            }
        }

        this.values['bold'] = {
            val: false,
            onChange: (newVal) => {
                if(newVal)this.div.style.fontWeight = "bold";
                else this.div.style.fontWeight = "normal";
            }
        }
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611

    }

    createElement({name,texture,dim,defaultText}){
        this.div = document.createElement('div');
        this.div.id = name;
        this.div.innerHTML = (defaultText)?defaultText:name;
        this.div.style.position = "absolute";
    }

    getCategory(){
        return "Text";
    }

    setColor(col){
        this.div.style.color = col;
    }

}


bb.fastInstall('objects','Text',Text);