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
}

const uiFactory = new UIFactory();

let games = ['Super Mario','Wiki'];

let gameList = uiFactory.createElement({
    parent: document.body,
    id: 'gamesList',
});

games.forEach( gameName => {
    let but = uiFactory.createElement({
        parent: gameList,
        id: 'goToEditorBut_'+gameName,
        classList: 'goToEditorBut',
        type: 'input',
        inputType: 'button',
        value: gameName
    });

    but.addEventListener('click',()=>{
        if(gameName === 'Wiki'){
            window.location.pathname = '/wiki.html';
        }else{
            window.location.pathname = '/editor.html';
        }
    });
});