import Game from './game.js'

export default class App {
    _game; // Class Game

    _init = [];
    _load = [];
    _stat = [];

    constructor(){
        this._game = new Game();
    }

    addInitialiseFunction(func){
        this._init.push(func);
    }

    addLoadFunction(func){
        this._load.push(func);
    }

    addStatisticsFunction(func){
        this._stat.push(func);
    }

    initialise(){
        this._init.forEach((func)=>func());
    }

    load(){
        this._load.forEach((func)=>func());
    }

    run(){
        this._game.mainLoop();
    }
    
    statistics(){
        this._stat.forEach((func)=>func());
    }

    /**
     * Start the application.
     */
    main(){
        this.initialise();
        this.load();
        this.run();
    }
    
    get game(){
        return this._game;
    }

    set game(g){
        this._game = g;
    }
    
};
