import bb from '../utils/blackboard.js'


import Engine from '../Engine.js'

if(Engine.hasManager('ClipboardManager')){
    bb.fastInstall('actions','Copy',()=>Engine.ClipboardManager.copy(undefined,true));
    bb.fastInstall('actions','Paste',()=>Engine.ClipboardManager.paste());
}