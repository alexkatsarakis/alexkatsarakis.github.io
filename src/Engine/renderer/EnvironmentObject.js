import Object from '../objects/Object.js'

class EnvironmentObject extends Object {

    renderer = 'None';
    name = 'Stage';
    
    _x;
    _y;
    _width;
    _height;

    constructor(){
        super('Stage','BpAoTcBMfklfGm6');

        this._x = 0;
        this._y = 0;
        this._width = 8000;
        this._height = 1080;

        this._windowWidth = window.innerWidth;
        this._windowHeight = window.innerHeight;

        this.data.valueHandler.registerValue('x',{
            tag: "positional",
            onChange: (value) => {
                this._x = value;
                if(this._x + this._windowWidth > this._width)
                    this._x = this._width - this._windowWidth;
                if(this._x < 0)this._x = 0;
            },
            getValue: () => {return this._x;}
        });

        this.data.valueHandler.registerValue('y',{
            tag: "positional",
            // onChange: (value) => {log.logError('Can\'t change y value of Stage');},
            onChange: (value) => {
                this._y = value;
                if(this._y + this._windowHeight > this._height)
                    this._y = this._height - this._windowHeight;
                if(this._y < 0)this._y = 0;
            },
            getValue: () => {return this._y;}
        });

        this.data.valueHandler.registerValue('width',{
            tag: "positional",
            onChange: (value) => {
                // log.logError('Can\'t change width value of Stage');
            },
            getValue: () => {return this._width;}
        });

        this.data.valueHandler.registerValue('height',{
            tag: "positional",
            onChange: (value) => {
                // log.logError('Can\'t change height value of Stage');
            },
            getValue: () => {return this._height;}
        });
        this.data.valueHandler.registerValue('windowWidth',{
            tag: "positional",
            onChange: (value) => {
                // log.logError('Can\'t change width value of Stage');
            },
            getValue: () => {return this._windowWidth;}
        });
        this.data.valueHandler.registerValue('windowHeight',{
            tag: "positional",
            onChange: (value) => {
                // log.logError('Can\'t change height value of Stage');
            },
            getValue: () => {return this._windowHeight;}
        });

        this.data.valueHandler.registerValue('color',{
            tag: "texture",
            value: '#ffffff',
            onChange: (value) => {
                document.body.style.backgroundColor = value;
            }
        });

        this.data.valueHandler.registerValue('background',{
            tag: "texture",
            onChange: (value) => {
                if(value === '')
                    document.body.style.backgroundImage = '';    
                else
                    document.body.style.backgroundImage = `url('../assets/textures/${value}')`;
            }
        });


        // this.data.optionHandler.removeOption('isMovable');
        this.data.optionHandler.removeOption('isRemovable');
        this.data.optionHandler.removeOption('isVisible');
        this.data.optionHandler.removeOption('isSolid');

        this.data.optionHandler.setOption('isCollidable',false);


        this.data.eventHandler.removeEvent('onCollision');
        this.data.eventHandler.removeEvent('onRemove');
        this.data.eventHandler.removeEvent('onMove');
        this.data.eventHandler.removeEvent('onClick');
        this.data.eventHandler.removeEvent('onRightClick');


        this._category = 'Stage';
    }

    move(x,y){
        if(!this.getOption('isMovable'))return;
        this.setValue('x',this._x + x);
        this.setValue('y',this._y + y);
    }

    setPosition(x,y){
        this.setValue('x', x);
        this.setValue('y', y);
    }

    add(){}

    remove(){
        throw Error('Environment Object cannot be removed!');
    }
    setAnimator(animator){
        if(this._animator !== undefined)this._animator.stop();
        this._animator = animator;
    }
}


const environmentObject = new EnvironmentObject();

export default environmentObject;