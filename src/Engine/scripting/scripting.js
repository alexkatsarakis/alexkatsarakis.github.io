import blScr from './blockly/blockly.js'
import pureJS from './pureJS/pureJS.js'
// import './pyodide/pyodide.js'

import bb from '../../utils/blackboard.js'

import Manager from '../Manager.js'

export default class ScriptingManager extends Manager{
    _installedMechanisms
    _currentEditor

    constructor(){
        super();
        this._installedMechanisms = {};
        this._installedMechanisms[blScr.id] = blScr;
        this._installedMechanisms[pureJS.id] = pureJS;
        this._currentEditor = blScr;
    }

    currentScriptAsText(){
        return this._currentEditor.currentScriptAsText();
    }

    currentScriptAsCode() {
        return this._currentEditor.currentScriptAsCode();
    }

    executeCode(codes,currentObject) {
        if(bb.fastGet('state','mode') === 'paused')return;
        this._currentEditor.executeCode(codes, currentObject);
    }

    clearAndLoadFromText(codes) {
        this._currentEditor.clearAndLoadFromText(codes);
    }

    injectInDiv(div) {
        this._currentEditor.injectInDiv(div);
    }

}
