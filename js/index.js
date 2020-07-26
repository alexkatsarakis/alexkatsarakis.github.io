import {
    staticStrings
} from "./staticString.js"

import {
    Page
} from "./page.js"

import {
    translator
} from "./translator.js"

import {
    createAndAppendPageWrapper,
    createAndAppendCircle,
    createAndAppendSquare,
    Point,
    Circle,
    Square
} from "./UIfactory.js"

import {
    movingAnimator,
    tickAnimator
} from "./animator.js"


let keyMappings = {}

class IndexPage extends Page {
    requirements = {
        CSS:["main.css","index.css"]
    }
    
    constructor(_derivedPage){
        super(_derivedPage);
        this.name = staticStrings.pageNames.index;
        this.loadRequirements(this.requirements);
    }

    anim = [];


    keyPressDown = function(event){
        console.log(event);
        if(keyMappings[event.code])
            keyMappings[event.code]();
    }

    mouseClick = function(event){
        console.log(event);
        if(event.target.id === "pageWrapper"){
            let test = new Square(new Point(event.clientX,event.clientY),20);
            let t2 = createAndAppendSquare(test,'temp'+ Math.random()*100000);
            t2.style.backgroundColor = "green";
        }
    }

    
    build = function(){

        let wrap = createAndAppendPageWrapper();

        let circle = new Circle(new Point(wrap.offsetWidth - 100,25),100);
        let c = createAndAppendCircle(circle,"myCircle");
        c.style.backgroundColor = "black";

        let square = new Square(new Point(wrap.offsetWidth - 100, 100),50);
        let s = createAndAppendSquare(square,"mySquare");
        s.style.backgroundColor = "red";

        let circle2 = new Circle(new Point(wrap.offsetWidth - 100, 200),100);
        let c2 = createAndAppendCircle(circle2,"myCircle2");
        c2.style.backgroundColor = "white";


        this.anim.push(new movingAnimator(circle.getPoint(),-1,0,circle.getDiv(),100,100));
        this.anim.push(new movingAnimator(square.getPoint(),-10,0,square.getDiv(),20,100));
        this.anim.push(new movingAnimator(circle2.getPoint(),-5,0,circle2.getDiv(),20,200,(function(){console.log(1);})));
        this.anim.push(new movingAnimator(circle2.getPoint(),0,-5,circle2.getDiv(),200,20));

        window.onkeydown = this.keyPressDown;
        window.onmousedown = this.mouseClick;
        this.anim.push(new tickAnimator(5000,(function(){console.log(2);})));

        for(let keyCode in translator.left){
            keyMappings[translator.left[keyCode]] = (function(){
                p.anim.push(new movingAnimator(square.getPoint(),-5,0,square.getDiv(),20,5));
            });
        }

        for(let keyCode in translator.up){
            keyMappings[translator.up[keyCode]] = (function(){
                p.anim.push(new movingAnimator(square.getPoint(),0,-5,square.getDiv(),20,5));
            });
        }

        for(let keyCode in translator.right){
            keyMappings[translator.right[keyCode]] = (function(){
                p.anim.push(new movingAnimator(square.getPoint(),5,0,square.getDiv(),20,5));
            });
        }

        for(let keyCode in translator.down){
            keyMappings[translator.down[keyCode]] = (function(){
                p.anim.push(new movingAnimator(square.getPoint(),0,5,square.getDiv(),20,5));
            });
        }

        for(let keyCode in translator.fire){
            keyMappings[translator.fire[keyCode]] = (function(){
                console.log(square.getPoint().getX(),square.getPoint().getY());
                let test = new Square(new Point(square.getPoint().getX(),square.getPoint().getY()),20);
                let t2 = createAndAppendSquare(test,'temp'+ Math.random()*100000);
                t2.style.backgroundColor = "green";
                p.anim.push(new movingAnimator(test.getPoint(),0,5,test.getDiv(),20,100,(function(){test.getDiv().remove();})));
            });
        }

    }
    next = function(timestamp){
        let an;
        for(an in this.anim){
            if(this.anim[an].hasFinished()){
                this.anim.splice(an, 1);
            }else {
                this.anim[an].animate(timestamp);
            }
        }
    }
}

let p = new IndexPage("derivedpage");
p.build();



let lastTime;
let rRate = 17;
function step(timestamp) {
    if (lastTime === undefined)
        lastTime = timestamp;
    
    if(timestamp - lastTime > rRate){
        lastTime += rRate;
        p.next(timestamp);
    }
  
    window.requestAnimationFrame(step);
  }
  
window.requestAnimationFrame(step);