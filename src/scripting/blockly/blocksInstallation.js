import bb from '../../utils/blackboard.js'

const colourPalette = {
    colour: 24,
    object: 190
}

Blockly.Blocks['colour_change'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('Colour')
            .appendField(Blockly.Msg.AK_COLOUR);
        this.setColour(colourPalette.colour);
        this.setTooltip('Change the colour of the object it refers.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['colour_change'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return 'bb.fastGet("actions","changeColor")(undefined,'+argument0 + ');';
};

Blockly.Blocks['move_object'] = {
    init: function() {
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField(Blockly.Msg.AK_OBJECT);
        this.appendValueInput('valX')
            .setCheck('Number')
            .appendField(Blockly.Msg.AK_MOVEX);
        this.appendValueInput('valY')
            .setCheck('Number')
            .appendField(Blockly.Msg.AK_MOVEY);
        this.setColour(colourPalette.object);
        this.setTooltip('Move an object.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['move_object'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'Obj',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'valX',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    var argument2 = Blockly.JavaScript.valueToCode(block, 'valY',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    argument1 = eval(argument1);
    argument2 = eval(argument2);
    return 'bb.fastGet("actions","move")('+argument0+','+argument1 + ','+ argument2 +');';
};

Blockly.Blocks['get_object'] = {
    init: function() {
        this.appendValueInput('Object')
            .setCheck('String')
            .appendField(Blockly.Msg.AK_GET)
            .appendField(Blockly.Msg.AK_OBJECT);
        this.setColour(colourPalette.object);
        this.setOutput(true, 'Object');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        return 0;
    }
};

Blockly.JavaScript['get_object'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'Object',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return 'bb.fastGet("liveObjects",' + argument0 + ')';
};

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


Blockly.Blocks['colour_change_choose_object'] = {
    init: function() {
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField(Blockly.Msg.AK_OBJECT);
        this.appendValueInput('Colour')
            .setCheck('Colour')
            .appendField(Blockly.Msg.AK_COLOUR);
        this.setColour(colourPalette.colour);
        this.setTooltip('Change the colour of the object it refers.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['colour_change_choose_object'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'Obj',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'Colour',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return 'bb.fastGet("actions","changeColor")('+argument0+','+argument1 + ');';
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
    return 'bb.fastGet("actions","renameObject")('+argument0+','+argument1 + ');';
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
        this.appendValueInput('Colour')
            .setCheck('Colour')
            .appendField(Blockly.Msg.AK_COLOUR);
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
    var argument2 = Blockly.JavaScript.valueToCode(block, 'Colour',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument3 = Blockly.JavaScript.valueToCode(block, 'PosX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument4 = Blockly.JavaScript.valueToCode(block, 'PosY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

    return `bb.fastGet("actions","createObject")({
        "category": ${argument0},
        "name":${argument1},
        "colour":${argument2},
        "position":{"x":${argument3},"y":${argument4}} 
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
        let map = bb.getComponent('objects').itemMap;
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

Blockly.Blocks['object_attr'] = {
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
            .appendField("attribute")
            .appendField(new Blockly.FieldDropdown([["log me","log me"]]), 'FIELD')
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
        let values = bb.fastGet('liveObjects',newValue).getOptions();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['log me','log me']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            // .appendField(Blockly.Msg.AK_FIELD)
            .appendField("attribute")
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
            .appendField(Blockly.Msg.AK_TO);
        this.appendValueInput('value')
            .setCheck("Boolean")
            .appendField(Blockly.Msg.AK_VALUE);
    },

    getObjects(){
        let map = bb.getComponent('liveObjects').itemMap;
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_attr'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    let val_val = Blockly.JavaScript.valueToCode (block, 'value',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'bb.fastGet("liveObjects","'+obj_val+'").setOption("'+field_val+'",'+val_val+');';
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
            .appendField(Blockly.Msg.AK_FIELD)
            .appendField(new Blockly.FieldDropdown([["log me","log me"]]), 'FIELD')
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
        let values = bb.fastGet('liveObjects',newValue).getValues();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['log me','log me']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_FIELD)
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
            .appendField(Blockly.Msg.AK_TO);
        this.appendValueInput('value')
            .appendField(Blockly.Msg.AK_VALUE);
    },

    getObjects(){
        let map = bb.getComponent('liveObjects').itemMap;
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_field'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    let val_val = Blockly.JavaScript.valueToCode (block, 'value',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'bb.fastGet("liveObjects","'+obj_val+'").setValue("'+field_val+'",'+val_val+');';
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
            .appendField(new Blockly.FieldDropdown([['onClick','onClick']]), 'FIELD')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('liveObjects',newValue).getEvents();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['onClick','onClick']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_EVENT)
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
    },

    getObjects(){
        let map = bb.getComponent('liveObjects').itemMap;
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['object_event'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    return 'bb.fastGet("liveObjects","'+obj_val+'").triggerEvent("'+field_val+'");';
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
        let map = bb.getComponent('liveObjects').itemMap;
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_obj'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return 'bb.fastGet("liveObjects","' + inp_val + '")';
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
            .appendField(new Blockly.FieldDropdown([["log me","log me"]]), 'FIELD');
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setOutput(true,undefined);
    },

    updateConnections: function(newValue) {
        let values = bb.fastGet('liveObjects',newValue).getValues();
        let toAdd = [];
        
        for(let i in values){
            toAdd.push([i,i])
        }
        
        if(toAdd.length === 0)toAdd = [['log me','log me']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField(Blockly.Msg.AK_FIELD)
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD');
    },

    getObjects(){
        let map = bb.getComponent('liveObjects').itemMap;
        let categs = [];
        for(let i in map){
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['get_object_field'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    let field_val = block.getFieldValue('FIELD');
    return [`bb.fastGet("liveObjects","${obj_val}").getValue("${field_val}")`,Blockly.JavaScript.ORDER_FUNCTION_CALL];
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

    return `bb.fastGet("actions","removeObject")(${argument0});`;
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
        let map = bb.fastGet('gameEngine','animationManager')._animations;
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
    return `bb.fastGet('actions','playAnimation')(
        {
           object: ${argument1},
           anim: '${argument0}' 
        });`;
};