import uiFactory from '../utils/UIFactory.js'

uiFactory.addHTMLfromString({
    str: `<link rel="stylesheet" href="./indexPage/informationTab/informationTab.css">`,
    parent: document.body
});

let wrapper = uiFactory.createElement({
    id: "informationTabWrapper",
    parent: document.getElementById('main-body')
});

uiFactory.createElement({
    type: 'h1',
    parent: wrapper,
    id: 'informationTabHeader',
    innerHtml: 'Information Pages for Developers'
});

let buttonWrapper = uiFactory.createElement({
    parent: wrapper,
    id: 'informationButWrapper'
});

let userWikiBut = uiFactory.createElement({
    parent: buttonWrapper,
    classList: 'informationButton',
    innerHtml: 'Wiki for Users'
});

userWikiBut.onclick = ()=>{
    window.location = `/wiki.html?mode=user`;
}

let devWikiBut = uiFactory.createElement({
    parent: buttonWrapper,
    classList: 'informationButton',
    innerHtml: 'Wiki for Developers'
});

devWikiBut.onclick = ()=>{
    window.location = `/wiki.html?mode=dev`;
}

export default {};