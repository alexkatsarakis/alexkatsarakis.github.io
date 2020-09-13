import './blocksInstallation.js'

import bb from '../../utils/blackboard.js'


bb.fastInstall('scripting','currentScriptAsText',()=>{
    return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
});

bb.fastInstall('scripting','currentScriptAsCode',()=>{
    return Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
});

bb.fastInstall('scripting','fromTextToCode',(text) => {
    text = Blockly.Xml.textToDom(text);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(text,Blockly.mainWorkspace);
    return Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
});

bb.fastInstall('scripting','clearAndLoadFromText',(text)=>{
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(text),Blockly.mainWorkspace);
});