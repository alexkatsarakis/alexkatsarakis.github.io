const gameStates = {
    IDLE: 0,
    RUNNING: 1,
    FINISHED: 2,
    PAUSED: 3
};

export default class Game {
    _gameState = gameStates.IDLE
    _actions;

    constructor(){
        this._gameState = gameStates.RUNNING;
        this._actions = {
            animation: [],
            ai: [],
            physics: [],
            collisions: [],
            render: [],
            input: [],
            userCode: [],
            extra: []
        };
    }

    get gameState(){
        return this._gameState;
    }

    /**
     * Adds an item to render array
     * @param {Function} render - Item to be rendered
     */
    set render(render){
        this._actions.render.push(render);
    }

    /**
     * Adds an item to render array
     * @param {Function} inp - Item to be rendered
     */
    set input(inp){
        this._actions.input.push(inp);
    }

    /**
     * Adds an item to render array
     * @param {Function} anim - Item to be rendered
     */
    set animation(anim){
        this._actions.animation.push(anim);
    }

    /**
     * Adds an item to render array
     * @param {Function} artInt - Item to be rendered
     */
    set ai(artInt){
        this._actions.ai.push(artInt);
    }

    /**
     * Adds an item to render array
     * @param {Function} phy - Item to be rendered
     */
    set physics(phy){
        this._actions.physics.push(phy);
    }

    /**
     * Adds an item to render array
     * @param {Function} coll - Item to be rendered
     */
    set collisions(coll){
        this._actions.collisions.push(coll);
    }

    /**
     * Adds an item to render array
     * @param {Function} uc - Item to be rendered
     */
    set userCode(uc){
        this._actions.userCode.push(uc);
    }

    /**
     * Adds an item to render array
     * @param {Function} ex - Item to be rendered
     */
    set extra(ex){
        this._actions.extra.push(ex);
    }


    mainLoop(){
        if(this._gameState !== gameStates.FINISHED)requestAnimationFrame(this.mainLoop.bind(this));

        this.mainLoopIteration();
    }

    mainLoopIteration() {
        this.invoke(this._actions.render);
        this.invoke(this._actions.input);
        if (this._gameState !== gameStates.PAUSED) {
            this.invoke(this._actions.animation);
            this.invoke(this._actions.ai);
            this.invoke(this._actions.physics);
            this.invoke(this._actions.collisions);
            this.invoke(this._actions.userCode);
        }
        this.invoke(this._actions.extra);
    }
    
    /**
     * Takes an array of functions and invokes all of them with 0 arguments
     * @param {Array} arrayOfFuncs 
     */
    invoke(arrayOfFuncs){
        arrayOfFuncs.forEach((func)=>func());
    }

    pause(){
        this._gameState = gameStates.PAUSED;
    }

    unpause(){
        this._gameState = gameStates.RUNNING;
    }

    stop(){
        this._gameState = gameStates.FINISHED;
    }

};