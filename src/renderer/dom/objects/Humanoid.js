import Object from './ObjectDom.js'
<<<<<<< HEAD

import Value from '../../../objects/Value.js'
=======
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611

import bb from '../../../utils/blackboard.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Humanoid extends Object {
    
    constructor({name,texture,dim}){
        super(name);
        
        this.div = document.createElement('div');
        this.div.id = name;
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:10,(dim&&dim.height)?dim.height: 10);
        this.div.style.width = X+"px";
        this.div.style.height = X+"px";
        this.div.style.position = "absolute";

        let head = document.createElement('div');
        head.id = name+"_head";
        head.style.position = "absolute";
        head.style.width = "40%";
        head.style.paddingTop = "50%";
        head.style.left = "30%";
        head.style.borderRadius = "50px";

        this.div.appendChild(head);

        let body = document.createElement('div');
        body.id = name+"body";
        body.style.position = "absolute";
        body.style.width = "50%";
        body.style.paddingTop = "80%";
        body.style.top = "20%";
        body.style.left = "25%";
        body.style.borderRadius = "40px";

        this.div.appendChild(body);

        let leftArm = document.createElement('div');
        leftArm.id = name+"leftArm";
        leftArm.style.position = "absolute";
        leftArm.style.width = "20%";
        leftArm.style.paddingTop = "20%";
        leftArm.style.top = "25%";
        leftArm.style.left = "10%";
        leftArm.style.borderRadius = "30px";

        this.div.appendChild(leftArm);

        let rightArm = document.createElement('div');
        rightArm.id = name+"rightArm";
        rightArm.style.position = "absolute";
        rightArm.style.width = "20%";
        rightArm.style.paddingTop = "20%";
        rightArm.style.top = "25%";
        rightArm.style.left = "70%";
        rightArm.style.borderRadius = "30px";

        this.div.appendChild(rightArm);

        let leftLeg = document.createElement('div');
        leftLeg.id = name+"leftLeg";
        leftLeg.style.position = "absolute";
        leftLeg.style.width = "20%";
        leftLeg.style.paddingTop = "20%";
        leftLeg.style.top = "80%";
        leftLeg.style.left = "10%";
        leftLeg.style.borderRadius = "30px";

        this.div.appendChild(leftLeg);

        let rightLeg = document.createElement('div');
        rightLeg.id = name+"rightLeg";
        rightLeg.style.position = "absolute";
        rightLeg.style.width = "20%";
        rightLeg.style.paddingTop = "20%";
        rightLeg.style.top = "80%";
        rightLeg.style.left = "70%";
        rightLeg.style.borderRadius = "30px";

        this.div.appendChild(rightLeg);
        
        if(texture){
            this.div.style.backgroundImage = "url('"+texture+"')";
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }

<<<<<<< HEAD

        this.values['colour'] = new Value({
            onChange: (value) => this.setColor(value),
            getValue: () => {return this.div.children[0].style.backgroundColor;}
        });

=======
>>>>>>> a5ca5a27f76984fd1fd99012c95e43c993ce6611
    }


    getCategory(){
        return "Humanoid";
    }

    setColor(col){
        let children = [ ...this.div.children ];
        children.map(child => {
            child.style.backgroundColor = col;
        })
    }

}


bb.fastInstall('objects','Humanoid',Humanoid);