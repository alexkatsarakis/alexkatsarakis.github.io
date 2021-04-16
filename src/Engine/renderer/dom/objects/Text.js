import Object from './ObjectDom.js'

export default class Text extends Object {
    
    constructor({name,texture,dim,defaultText,div},id){
        super(name,id);
        
        if(div)this.div = div;
        else this.createElement({name,texture,dim,defaultText});

        this.data.valueHandler.registerValue('text',{
            tag: "x",
            onChange: (value) => this.div.innerHTML = value,
            getValue: () => {return this.div.innerHTML;}
        });

        this.data.valueHandler.registerValue('colour',{
            tag: "texture",
            onChange: (value) => this.div.style.color = value,
            getValue: () => {return this.div.style.color;}
        });

        this.data.valueHandler.registerValue('bold',{
            tag: "x",
            value: false,
            onChange: (newVal) => this.div.style.fontWeight = (newVal)?"bold":"normal"
        });

        this.data.valueHandler.registerValue('width',{
            tag: "positional",
            onChange: (value) => {this.div.style.width = value+"px";},
            getValue: () => {return this.div.offsetWidth;}
        });

        this.data.valueHandler.registerValue('height',{
            tag: "positional",
            onChange: (value) => {this.div.style.height = value+"px";},
            getValue: () => {return this.div.offsetHeight;}
        });

        this.data.valueHandler.registerValue('fontSize',{
            tag: "appearance",
            onChange: (value) => {this.div.style.fontSize = value+"px";},
            getValue: () => {return this.div.style.fontSize.slice(0,-2);}
        });

        this._category = 'Text';

    }

    createElement({name,texture,dim,defaultText}){
        this.div = document.createElement('div');
        this.div.id = name;
        this.div.innerHTML = defaultText || name;
        this.div.style.position = "absolute";
        this.div.style.fontSize = "16px";
        this.div.style.textShadow = '1px 1px 0 #444';
    }

}