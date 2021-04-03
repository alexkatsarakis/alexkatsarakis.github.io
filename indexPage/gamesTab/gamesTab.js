import uiFactory from '../utils/UIFactory.js'

const games = [
    {
        id: 'savedState',
        displayName: 'Super Mario Example',
        defaultParameters: {
        }
    },
    {
        id: 'savedState',
        displayName: 'Super Mario Example Play',
        defaultParameters: {
            play: 'true'
        }
    },
    {
        id: 'MortalKombat',
        displayName: 'Mortal Kombat',
        defaultParameters: {
        }
    },
    {
        id: 'EmptyMario',
        displayName: 'Empty (Mario Films)',
        defaultParameters: {
        }
    },
    {
        id: 'EmptyMortal',
        displayName: 'Empty (Mortal Films)',
        defaultParameters: {
        }
    }
];

uiFactory.addHTMLfromString({
    str: `<link rel="stylesheet" href="./indexPage/gamesTab/gamesTab.css">`,
    parent: document.body
});

let gameListWrapper = uiFactory.createElement({
    parent: document.getElementById('main-body'),
    id: 'gameListWrapper',
});

uiFactory.createElement({
    type: 'h1',
    parent: gameListWrapper,
    id: 'gameListHeader',
    innerHtml: 'Available Offline Game List'
});

let gameList = uiFactory.createElement({
    parent: gameListWrapper,
    id: 'gamesList',
});


games.forEach((game,ind)=>{
    let gameName = game.displayName;

    let but = uiFactory.createElement({
        parent: gameList,
        id: 'goToEditorBut_'+ind,
        classList: 'goToEditorBut',
        type: 'input',
        inputType: 'button',
        value: gameName
    });

    let args = '';
    for(let param in game.defaultParameters){
        args += `&${param}=${game.defaultParameters[param]}`;
    }

    but.addEventListener('click',()=>{
        window.location = `/editor.html\?game=${game.id}${args}`;
    });
});

export default games;