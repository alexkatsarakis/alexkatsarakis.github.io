import Engine from '../Engine.js';
import Manager from '../Engine/Manager.js'

import bb from '../utils/blackboard.js'

export default class TutorialManager extends Manager{


    _steps
    _currentStep

    constructor() {
        super();
        this._steps = [
            {
                id: 'addObject',
                title: 'Create object',
                description: 'Press "+" on toolbar and create an object'
            },
            {
                id: 'renameObject',
                title: 'Rename object',
                description: 'Rename an object using the right panel'
            },
            {
                id: 'setValue_width',
                title: 'Change width of an object',
                description: 'Focus an object and change the width value'
            },
            {
                id: 'setValue_y',
                title: 'Move object',
                description: 'Drag an object to move it'
            }
        ];
        
        this._currentStep = 0;
    }


    onLoad(){
        if(this._steps.length === 0)return;
        
        bb.installWatch('events','startTutorial',()=>this.showStep(0));
    }

    showStep(index){
        const length = this._steps.length;
        if(index >= 0 && index < length){
            const step = this._steps[index];
            bb.fastSet('events','newContent',{
                title: step.title,
                description: step.description,
                index: index+1,
                length: length
            });
            
            bb.installWatch('events', step.id, this.reactor.bind(this));
        }
    }

    finishTutorial(){
        bb.fastSet('events','finishTutorial','succesful');
    }

    reactor(x){
        console.log(x);
        this._currentStep++;
        if(!this._steps[this._currentStep]){
            this.finishTutorial();
            return;
        }
        this.showStep(this._currentStep);
    }

}