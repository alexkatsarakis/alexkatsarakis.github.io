const colourPalette = {
    colour: 24,
    object: 40
}



Blockly.Blocks['colour_change'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('Colour')
            .appendField('Change Colour');
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

Blockly.Blocks['move_right'] = {
    init: function() {
        this.appendValueInput('Number')
            .appendField('Move Right');
        this.setColour(colourPalette.object);
        this.setTooltip('Move an object right.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['move_right'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'Number',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    argument0 /= 100;
    return 'bb.fastGet("actions","move")(undefined,'+argument0 + ');';
};

Blockly.Blocks['get_object'] = {
    init: function() {
        this.appendValueInput('Object')
            .setCheck('String')
            .appendField('Get Object');
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
            .setCheck('Object')
            .appendField('Log');
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['console_log'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'CON_LOG',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'console.log('+argument0+');';
};


Blockly.Blocks['colour_change_choose_object'] = {
    init: function() {
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField('Object');
        this.appendValueInput('Colour')
            .setCheck('Colour')
            .appendField('Change Colour');
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

Blockly.Blocks['create_object'] = {
    init: function() {
        this.appendValueInput('Categ')
            .setCheck('ObjectCat')
            .appendField('Category');
        this.appendValueInput('Name')
            .setCheck('String')
            .appendField('Name');
        this.appendValueInput('Colour')
            .setCheck('Colour')
            .appendField('Colour');
        this.appendValueInput('PosX')
            .setCheck('Number')
            .appendField('X:');
        this.appendValueInput('PosY')
            .setCheck('Number')
            .appendField('Y:');
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
return 'bb.fastGet("actions","createObject")({\
"category":'+argument0+',\
"name":'+argument1+',\
"colour":'+argument2+',\
"position":{"x":'+argument3+',"y":'+ argument4 +'} \
});\n';
};

import bb from '../utils/blackboard.js'

Blockly.Blocks['dropdown_categ'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'TESTF')
            .appendField('Category');
        this.setColour(colourPalette.object);
        this.setOutput(true, 'ObjectCat');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
      },

    getCategories(){
        let map = bb.getComponent('objects').itemMap;
        let categs = [];
        for(let i in map){
            if(i !== "camera" 
            && i !== "scene")
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_categ'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return '"' + inp_val + '"';
};

Blockly.Blocks['dropdown_obj'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getCategories()), 'TESTF')
            .appendField('Object');
        this.setColour(colourPalette.object);
        this.setOutput(true, 'Object');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
      },

    getCategories(){
        let map = bb.getComponent('liveObjects').itemMap;
        let categs = [];
        for(let i in map){
            if(i !== "camera" 
            && i !== "scene")
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_obj'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return 'bb.fastGet("liveObjects","' + inp_val + '")';
};