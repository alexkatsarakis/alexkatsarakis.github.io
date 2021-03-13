import bb from '../../../utils/blackboard.js'

import AK from '../../../utils/API.js'

const colourPalette = {
    colour: 24,
    object: 190
}

import objManager from '../../renderer/ObjectManager.js'

Blockly.Blocks['console_log'] = {
    init: function() {
        this.appendValueInput('CON_LOG')
            .appendField(Blockly.Msg.AK_LOG);
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['console_log'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'CON_LOG',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'console.log('+argument0+');';
};

Blockly.Blocks['name_change_choose_object'] = {
    init: function() {
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField(Blockly.Msg.AK_OBJECT);
        this.appendValueInput('Name')
            .setCheck('String')
            .appendField('new name');
        this.setColour(colourPalette.colour);
        this.setTooltip('Change the colour of the object it refers.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['name_change_choose_object'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'Obj',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'Name',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return `AK.renameObject(${argument0},${argument1});`;
};

Blockly.Blocks['every_seconds_do'] = {
    init: function() {
        this.appendValueInput('msecs')
            .setCheck('Number')
            .appendField(Blockly.Msg.AK_EVERY)
        this.appendDummyInput()
            .appendField(Blockly.Msg.AK_MILLISECONDS);
        this.appendStatementInput('Value')
            .appendField(Blockly.Msg.AK_DO);
        this.setColour(colourPalette.colour);
        this.setTooltip('do something every');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['every_seconds_do'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'msecs',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.statementToCode(block, 'Value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    console.log('setInterval(()=>{'+argument1+'},'+argument0+');');
    return 'setInterval(()=>{'+argument1+'},'+argument0+');';
};

Blockly.Blocks['after_seconds_do'] = {
    init: function() {
        this.appendValueInput('msecs')
            .setCheck('Number')
            .appendField("after")
        this.appendDummyInput()
            .appendField(Blockly.Msg.AK_MILLISECONDS);
        this.appendStatementInput('Value')
            .appendField(Blockly.Msg.AK_DO);
        this.setColour(colourPalette.colour);
        this.setTooltip('do something every');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['after_seconds_do'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'msecs',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.statementToCode(block, 'Value',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return 'setTimeout(()=>{'+argument1+'},'+argument0+');';
};

Blockly.Blocks['create_object'] = {
    init: function() {
        this.appendValueInput('Categ')
            .setCheck('ObjectCat')
            .appendField(Blockly.Msg.AK_CATEGORY);
        this.appendValueInput('Name')
            .setCheck('String')
            .appendField(Blockly.Msg.AK_NAME);
        this.appendValueInput('PosX')
            .setCheck('Number')
            .appendField(Blockly.Msg.AK_AXISX);
        this.appendValueInput('PosY')
            .setCheck('Number')
            .appendField(Blockly.Msg.AK_AXISY);
        this.setColour(colourPalette.colour);
        this.setTooltip('Create a new object with the given arguments.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['create_object'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode  (block, 'Categ',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'Name',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument3 = Blockly.JavaScript.valueToCode(block, 'PosX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument4 = Blockly.JavaScript.valueToCode(block, 'PosY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

    return `AK.createObject({
        'category': ${argument0},
        'name':${argument1},
        'x':${argument3},
        'y':${argument4} 
        });`;
};


Blockly.Blocks['dropdown_categ'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'TESTF')
            .appendField(Blockly.Msg.AK_CATEGORY);
        this.setColour(colourPalette.object);
        this.setOutput(true, 'ObjectCat');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
      },

    getCategories(){
        let map = objManager.constr;
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_categ'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return '"' + inp_val + '"';
};

Blockly.Blocks['object_flags'] = {
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.AK_SET_OBJECT)
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField(Blockly.Msg.AK_APOSS);
        this.appendDummyInput('values')
            // .appendField(Blockly.Msg.AK_FIELD)
            .appendField("flag")
            .appendField(new Blockly.FieldDropdown([["",""]]), 'FIELD')
            .appendField(Blockly.Msg.AK_TO);
        this.appendValueInput('value')
            .setCheck("Boolean")
            .appendField(Blockly.Msg.AK_VALUE);
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('Engine','ObjectManager').getObject(newValue).getOptions();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['','']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            // .appendField(Blockly.Msg.AK_FIELD)
            .appendField("flag")
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
            .appendField(Blockly.Msg.AK_TO);
        this.appendValueInput('value')
            .setCheck("Boolean")
            .appendField(Blockly.Msg.AK_VALUE);
    },

    getObjects(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_flags'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    let val_val = Blockly.JavaScript.valueToCode (block, 'value',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.setFlag(AK.getObjectByID('${obj_val}'),'${field_val}',${val_val});`;
};

Blockly.Blocks['object_field'] = {
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.AK_SET_OBJECT)
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField(Blockly.Msg.AK_APOSS);
        this.appendDummyInput('values')
            .appendField('attribute')
            .appendField(new Blockly.FieldDropdown([["",""]]), 'FIELD')
            .appendField(Blockly.Msg.AK_TO);
        this.appendValueInput('value')
            .appendField(Blockly.Msg.AK_VALUE);
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('Engine','ObjectManager').getObject(newValue).getValues();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField('attribute')
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
            .appendField(Blockly.Msg.AK_TO);
        this.appendValueInput('value')
            .appendField(Blockly.Msg.AK_VALUE);
    },

    getObjects(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_field'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    let val_val = Blockly.JavaScript.valueToCode (block, 'value',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.setAttribute(AK.getObjectByID('${obj_val}'),'${field_val}',${val_val});`;
};

Blockly.Blocks['object_state'] = {
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.AK_SET_OBJECT)
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField(Blockly.Msg.AK_APOSS);
        this.appendDummyInput('values')
            .appendField('state to')
            .appendField(new Blockly.FieldDropdown([['','']]), 'FIELD')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('Engine','ObjectManager').getObject(newValue).getStates();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['','']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField('state to')
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
    },

    getObjects(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_state'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    return `AK.setCurrentState(AK.getObjectByID('${obj_val}'),'${field_val}');`;
};

Blockly.Blocks['get_current_state'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField(Blockly.Msg.AK_APOSS);
        this.appendDummyInput('values')
            .appendField('current state')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setOutput(true, 'String')
    },

    getObjects(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['get_current_state'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    return [`AK.getObjectByID('${obj_val}').getCurrentState()`,Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['object_event'] = {
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.AK_TRIGGER_OBJECT)
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField(Blockly.Msg.AK_APOSS);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_EVENT)
            .appendField(new Blockly.FieldDropdown([['','']]), 'FIELD')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('Engine','ObjectManager').getObject(newValue).getEvents();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['','']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_EVENT)
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
    },

    getObjects(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_event'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    return `AK.triggerEvent(AK.getObjectByID('${obj_val}'),'${field_val}');`;
};

Blockly.Blocks['dropdown_obj'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'TESTF')
            .appendField(Blockly.Msg.AK_OBJECT);
        this.setColour(colourPalette.object);
        this.setOutput(true, 'Object');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
      },

    getCategories(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_obj'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return `AK.getObjectByID('${inp_val}')`;
};

//====================================================================================

Blockly.Blocks['get_object_field'] = {
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    
    init: function() {
        this.appendDummyInput()
            .appendField('get')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField(Blockly.Msg.AK_APOSS);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_FIELD)
            .appendField(new Blockly.FieldDropdown([["",""]]), 'FIELD');
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setOutput(true,undefined);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('Engine','ObjectManager').getObject(newValue).getValues();
        
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['','']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_FIELD)
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD');
    },

    getObjects(){
        let map = objManager.objects;
        let categs = [];
        for(let i in map){
                categs.push([map[i].name,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['get_object_field'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    return [`AK.getAttribute(AK.getObjectByID('${obj_val}'),'${field_val}')`,Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['remove_object'] = {
    init: function() {
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField("remove "+Blockly.Msg.AK_OBJECT);
        this.setColour(colourPalette.colour);
        this.setTooltip('remove an object with the given arguments.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['remove_object'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'Obj',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

    return `AK.removeObject(${argument0});`;
};


///////////////////////////////////////////////////////////////////////

Blockly.Blocks['get_animation'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'TESTF')
            .appendField("animation");
        this.setColour(colourPalette.object);
        this.setOutput(true, 'Animation');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
      },

    getCategories(){
        let map = bb.fastGet('Engine','AnimationManager').getAllAnimations();

        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['get_animation'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return inp_val;
};


Blockly.Blocks['play_animation'] = {
    init: function() {
        this.appendValueInput('Anim')
            .setCheck('Animation')
            .appendField("play animation");
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField("on "+Blockly.Msg.AK_OBJECT);
        this.setColour(colourPalette.colour);
        this.setTooltip('remove an object with the given arguments.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['play_animation'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'Anim',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.statementToCode(block, 'Obj',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    argument0 = argument0.trim();
    argument1 = argument1.trim();
    return `AK.playAnimation(
        {
           object: ${argument1},
           anim: '${argument0}' 
        });`;
};

Blockly.Blocks['play_animation_extended'] = {
    init: function() {
        this.appendValueInput("Anim")
            .setCheck("Animation")
            .appendField("animation");
        this.appendValueInput("Obj")
            .setCheck("Object")
            .appendField("object");
        this.appendStatementInput("onStart")
            .setCheck(null)
            .appendField("on animation start");
        this.appendStatementInput("onEnd")
            .setCheck(null)
            .appendField("on animation end");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      }
};

Blockly.JavaScript['play_animation_extended'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'Anim',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.statementToCode(block, 'Obj',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    argument0 = argument0.trim();
    argument1 = argument1.trim();
    var statements_onstart = Blockly.JavaScript.statementToCode(block, 'onStart');
    var statements_onend = Blockly.JavaScript.statementToCode(block, 'onEnd');
    
    // const reg = /;/gi;
    // statements_onstart = statements_onstart.replace(reg,'');
    // statements_onend = statements_onend.replace(reg,'');
    
    // console.log(`bb.fastGet('actions','playAnimation')(
    //     {
    //        object: ${argument1},
    //        anim: '${argument0}',
    //        onStart: ()=>{eval(${(statements_onstart)?("\""+statements_onstart+"\""):"\'\'"})},
    //        onFinish: ()=>{eval(${(statements_onend)?("\""+statements_onend+"\""):"\'\'"})}
    //     })`);

    return `AK.playAnimation(
        {
           object: ${argument1},
           anim: '${argument0}',
           onStart: ()=>{eval(${(statements_onstart)?("\""+statements_onstart+"\""):"\'\'"})},
           onFinish: ()=>{eval(${(statements_onend)?("\""+statements_onend+"\""):"\'\'"})}
        })`;
};









//////////////////////////////////////////////////////// SOUNDS


Blockly.Blocks['play_sound'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("play sound")
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'SOUND')
            .appendField("once");
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      },

    getCategories(){
        let map = bb.fastGet('Engine','SoundManager').getSounds();
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['play_sound'] = function(block) {
    let inp_val = block.getFieldValue('SOUND');
    return `AK.playSound('${inp_val}');`;
};

Blockly.Blocks['stop_sound'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("stop sound")
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'SOUND');
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      },

    getCategories(){
        let map = bb.fastGet('Engine','SoundManager').getSounds();
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['stop_sound'] = function(block) {
    let inp_val = block.getFieldValue('SOUND');
    return `AK.stopSound('${inp_val}');`;
};

Blockly.Blocks['play_background'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("play")
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'SOUND')
            .appendField("as background music");
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      },

    getCategories(){
        let map = bb.fastGet('Engine','SoundManager').getSounds();
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['play_background'] = function(block) {
    let inp_val = block.getFieldValue('SOUND');
    return `AK.playBackground('${inp_val}');`;
};

Blockly.Blocks['stop_background'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("stop background")
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'SOUND')
            .appendField("music");
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      },

    getCategories(){
        let map = bb.fastGet('Engine','SoundManager').getSounds()
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['stop_background'] = function(block) {
    let inp_val = block.getFieldValue('SOUND');
    return `AK.stopBackground('${inp_val}');`;
};

Blockly.Blocks['stop_every_sound'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("stop all sounds and music");
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      }
};

Blockly.JavaScript['stop_every_sound'] = function(block) {
    return `AK.stopAllSounds();`;
};



Blockly.Blocks['is_key_pressed'] = {
    init: function() {
        this.appendValueInput('key')
            .appendField('is');
        this.appendDummyInput()
            .appendField('pressed')
        this.setColour(colourPalette.object);
        this.setTooltip('returns boolean if a key is pressed');
        this.setHelpUrl('none');
        this.setOutput(true, 'Boolean')
      }
};

Blockly.JavaScript['is_key_pressed'] = function(block) {
    let key = Blockly.JavaScript.valueToCode(block, 'key',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return [`AK.isKeyPressed(${key})`,Blockly.JavaScript.ORDER_FUNCTION_CALL];
};