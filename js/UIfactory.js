import {
    staticStrings
} from "./staticString.js"

export function createAndAppendCSS(fileURL){
    let toAdd = document.createElement('link');
    toAdd.setAttribute('rel','stylesheet');
    toAdd.setAttribute('type','text/css');
    toAdd.href = staticStrings.prefix.CSS + "/" + fileURL;
    document.head.appendChild(toAdd);
    return toAdd;
}

export function createAndAppendPageWrapper(){
    let pageWrapper = document.createElement('div');
    pageWrapper.setAttribute("id",staticStrings.pageWrapper);
    document.body.appendChild(pageWrapper);
    return pageWrapper;
}

export function Point(x,y){
    function getX(){
        return x;
    }

    function getY(){
        return y;
    }

    function moveX(to){
        x += to;
    }

    function moveY(to){
        y += to;
    }

    function setX(newX){
        x = newX;
    }

    function setY(newY){
        y = newY;
    }

    return {
        getX,
        getY,
        moveX,
        moveY,
        setX,
        setY
    };
}

export function Circle(point,r){

    let ownedDiv = undefined;

    function setDiv(div){
        ownedDiv = div;
    }

    function getDiv() {
        return ownedDiv;
    }

    function getRadius(){
        return r;
    }

    function getPoint(){
        return point;
    }

    return {
        getRadius,
        getPoint,
        setDiv,
        getDiv
    }
}

export function Square(point,w){
    let ownedDiv = undefined;

    function setDiv(div){
        ownedDiv = div;
    }

    function getDiv() {
        return ownedDiv;
    }

    function getWidth(){
        return w;
    }

    function getPoint(){
        return point;
    }

    return {
        getWidth,
        getPoint,
        setDiv,
        getDiv
    }
}

export function createAndAppendCircle(c,id,parent = staticStrings.pageWrapper){
    let circle = document.createElement('div');
    circle.setAttribute('id',id);
    circle.style.position = "relative";
    circle.style.width = c.getRadius()/2 + "px";
    circle.style.height = c.getRadius()/2 + "px";
    circle.style.borderRadius = 50 + "%";
    circle.style.left = c.getPoint().getX() + "px";
    circle.style.top = c.getPoint().getY() + "px";

    c.setDiv(circle);
    document.getElementById(parent).appendChild(circle);

    return circle;
}

export function createAndAppendSquare(c,id,parent = staticStrings.pageWrapper){
    let sq = document.createElement('div');
    sq.setAttribute('id',id);
    sq.style.position = "relative";
    sq.style.width = c.getWidth() + "px";
    sq.style.height = c.getWidth() + "px";
    sq.style.left = c.getPoint().getX() + "px";
    sq.style.top = c.getPoint().getY() + "px";

    c.setDiv(sq);
    document.getElementById(parent).appendChild(sq);

    return sq;
}