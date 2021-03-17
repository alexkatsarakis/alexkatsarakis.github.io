import uiFactory from '../utils/UIFactory.js'

const delay = 6000;

const images = [
    {
        url:'./indexPage/screens1.png',
        description: "Editor example with open UIs"
    },
    {
        url:'./indexPage/screens8.png',
        description: "Editor example on play mode"
    },
    {
        url:'./indexPage/screens2.png',
        description: "Coding example with Visual Programming Language (Blockly)"
    },
    {
        url:'./indexPage/screens3.png',
        description: "Inventory example for film preview"
    },
    {
        url:'./indexPage/screens4.png',
        description: "Animation Workshop for animation creation"
    },
    {
        url:'./indexPage/screens5.png',
        description: "Optional UI while editing"
    },
    {
        url:'./indexPage/screens6.png',
        description: "Collision Object example"
    },
    {
        url:'./indexPage/screens7.png',
        description: "Input Management example"
    }
];

uiFactory.addHTMLfromString({
    str: `<link rel="stylesheet" href="./indexPage/carouselTab/carouselTab.css">`,
    parent: document.body
});

let carWrapper = uiFactory.createElement({
    id: 'carouselWrapper',
    parent: document.getElementById('main-body')
});

let leftCarBut = uiFactory.createElement({
    id: 'carouselButLeft',
    parent: carWrapper
});

let leftCarImage = uiFactory.createElement({
    id: 'carouselImageLeft',
    classList: 'carouselItem',
    parent: carWrapper
});

let midCarImage = uiFactory.createElement({
    id: 'carouselImageMid',
    classList: 'carouselItem',
    parent: carWrapper
});

let rightCarImage = uiFactory.createElement({
    id: 'carouselImageRight',
    classList: 'carouselItem',
    parent: carWrapper
});

let rightCarBut = uiFactory.createElement({
    id: 'carouselButRight',
    parent: carWrapper
});

let mainImageDesc = uiFactory.createElement({
    id: 'carouselMainImageDesc',
    parent: carWrapper,
    innerHtml: 'test'
})

let currentlyShowing = 7;

function updateImages(index){
    let leftImageIndex = Math.abs(index % images.length);
    let midImageIndex = Math.abs((index + 1) % images.length);
    let rightImageIndex = Math.abs((index + 2) % images.length);

    leftCarImage.style.backgroundImage = `url("${images[leftImageIndex].url}")`;
    midCarImage.style.backgroundImage = `url("${images[midImageIndex].url}")`;
    mainImageDesc.innerHTML = images[midImageIndex].description;
    rightCarImage.style.backgroundImage = `url("${images[rightImageIndex].url}")`;
}

updateImages(currentlyShowing);

leftCarBut.onclick = (()=>{
    updateImages(--currentlyShowing);
    restartInterval();
});

rightCarBut.onclick = (()=>{
    updateImages(++currentlyShowing);
    restartInterval();
});

let swapTimeout = setInterval(() => {
    updateImages(++currentlyShowing);
}, delay);

function restartInterval(){
    clearInterval(swapTimeout);
    swapTimeout = setInterval(() => {
        updateImages(++currentlyShowing);
    }, delay);
}


export default {};