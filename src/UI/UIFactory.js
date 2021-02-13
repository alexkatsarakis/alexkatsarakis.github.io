export default class UIFactory {
    _settings
    _defaultSettings

    constructor() {
        this._settings = {
            popUpWidth: 80,
            popUpHeight: 80,
            headerFont: 16
        }
        this._defaultSettings = this.settings;
    }

    updateSettings({
        popUpWidth,
        popUpHeight,
        headerFont
    }){
        if(popUpWidth)this._settings.popUpWidth = popUpWidth;
        if(popUpHeight)this._settings.popUpHeight = popUpHeight;
        if(headerFont)this._settings.headerFont = headerFont;
    }

    get settings() {
        return JSON.parse(JSON.stringify(this._settings));
    }


    createPopup(id,settings){
        let popUpWrapper = this.createDiv({
            id: `${id}_popUp_wrapper`,
            parent: document.body
        });
        popUpWrapper.style.width = '100%';
        popUpWrapper.style.height = '100%';
        popUpWrapper.style.position = 'absolute';
        popUpWrapper.style.left = '0';
        popUpWrapper.style.top = '0';

        popUpWrapper.style.backgroundColor = '#00000080';


        return popUpWrapper;
    }

    createDiv({classList,id,parent,elementType = 'div'}){
        let div = document.createElement(elementType);
        if(id)div.id = id;
        if(classList)div.classList += ' '+classList;
        if(parent)parent.appendChild(div);
        return div;
    }
}

const uiFactory = new UIFactory();

let a = uiFactory.settings;
console.log(a);
