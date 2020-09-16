import Object from './ObjectDom.js'

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

    }

    createElement({name,texture,dim,defaultText}){
        this.div = document.createElement('div');
        this.div.id = name;
        this.div.innerHTML = (defaultText)?defaultText:name;
        this.div.style.position = "absolute";
        // this.div.style.width = (dim&&dim.width)?dim.width: "100px";
        // this.div.style.height = (dim&&dim.height)?dim.height: "100px";
    }

    getCategory(){
        return "Text";
    }

    setColor(col){
        this.div.style.color = col;
    }

}


bb.fastInstall('objects','Text',Text);