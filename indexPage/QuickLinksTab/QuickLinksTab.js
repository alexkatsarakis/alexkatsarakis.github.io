import uiFactory from '../utils/UIFactory.js'

uiFactory.addHTMLfromString({
    str: `<link rel="stylesheet" href="./indexPage/QuickLinksTab/QuickLinksTab.css">`,
    parent: document.body
});

let wrapper = uiFactory.createElement({
    id: "quickLinksTabWrapper",
    parent: document.getElementById('main-body')
});

uiFactory.createElement({
    type: 'h1',
    parent: wrapper,
    id: 'quickLinksTabHeader',
    innerHtml: 'Quick Links'
});

let buttonWrapper = uiFactory.createElement({
    parent: wrapper,
    id: 'quickLinksButWrapper'
});

let repoBut = uiFactory.createElement({
    parent: buttonWrapper,
    classList: 'quickLinksTabButton',
    innerHtml: 'Repository'
});

repoBut.onclick = ()=>{
    window.open('https://github.com/alexkatsarakis/GameEnvironment');
}

let myCVBut = uiFactory.createElement({
    parent: buttonWrapper,
    classList: 'quickLinksTabButton',
    innerHtml: 'About Me'
});

myCVBut.onclick = ()=>{
    window.open('https://alexkatsarakis.github.io/katsarakis-personal-page/');
}

export default {};