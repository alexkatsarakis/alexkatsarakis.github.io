import Object from './ObjectDom.js'

import Value from '../../../objects/Value.js'

import bb from '../../../utils/blackboard.js'
function pxToNumber(str){
    str.substr(1,str.length-4);
    return parseInt(str);
}
class Text extends Object {
    
    constructor({name,texture,dim,defaultText,div},id){
        super(name,id);
        
        if(div)this.div = div;
        else this.createElement({name,texture,dim,defaultText});

        this.values['text'] = new Value({
            tag: "x",
            onChange: (value) => this.div.innerHTML = value,
            getValue: () => {return this.div.innerHTML;}
        });

        this.values['colour'] = new Value({
            tag: "texture",
            onChange: (value) => this.div.style.color = value,
            getValue: () => {return this.div.style.color;}
        });

        this.values['bold'] = new Value({
            tag: "x",
            value: false,
            onChange: (newVal) => this.div.style.fontWeight = (newVal)?"bold":"normal"
        });

        this.values['width'] = new Value({
            tag: "positional",
            onChange: (value) => {this.div.style.width = value+"px";},
            getValue: () => {return this.div.offsetWidth;}
        });

        this.values['height'] = new Value({
            tag: "positional",
            onChange: (value) => {this.div.style.height = value+"px";},
            getValue: () => {return this.div.offsetHeight;}
        });

        this.values['fontSize'] = new Value({
            tag: "appearance",
            onChange: (value) => {this.div.style.fontSize = value+"px";},
            getValue: () => {return this.div.style.fontSize.slice(0,-2);}
        })

    }

    createElement({name,texture,dim,defaultText}){
        this.div = document.createElement('div');
        this.div.id = name;
        this.div.innerHTML = (defaultText)?defaultText:name;
        this.div.style.position = "absolute";
        this.div.style.fontSize = "16px";
        this.div.style.textShadow = '1px 1px 0 #444';
    }

    getCategory(){
        return "Text";
    }

    setColor(col){
        this.div.style.color = col;
    }

}


bb.fastInstall('objects','Text',Text);