class UIFactory {
    constructor(){}

    createElement({parent,id,classList,type,innerHtml,inputType,value}){
        let div = document.createElement((type)?type:'div');

        if(id) div.id = id;
        if(classList) div.classList = classList;
        if(innerHtml) div.innerText = innerHtml;
        if(type === 'input' && inputType) div.type = inputType;
        if(value) div.value = value;

        if(parent) parent.appendChild(div);
        return div;
    }

    addHTMLfromString({str,parent}){
        parent.insertAdjacentHTML('afterbegin',str);
    }
}

const uiFactory = new UIFactory();

export default uiFactory;