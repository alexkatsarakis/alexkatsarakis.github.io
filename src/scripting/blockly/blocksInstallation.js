import bb from '../../utils/blackboard.js'

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

Blockly.Blocks['move_object'] = {
    init: function() {
        this.appendValueInput('Obj')
            .setCheck('Object')
            .appendField('Object');
        this.appendValueInput('valX')
            .setCheck('Number')
            .appendField('Move X:');
        this.appendValueInput('valY')
            .setCheck('Number')
            .appendField('Move Y:');
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
    argument1 /= 10;
    argument2 /= 10;
    return 'bb.fastGet("actions","move")('+argument0+','+argument1 + ','+ argument2 +');';
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

Blockly.Blocks['every_seconds_do'] = {
    init: function() {
        this.appendValueInput('msecs')
            .setCheck('Number')
            .appendField('Every')
        this.appendDummyInput()
            .appendField('Milliseconds');
        this.appendStatementInput('Value')
            .appendField('Do');
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
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_categ'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return '"' + inp_val + '"';
};

Blockly.Blocks['object_field'] = {
    validate: function(newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },
    
    init: function() {
        this.appendDummyInput()
            .appendField('Set object')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField("'s");
        this.appendDummyInput('values')
            .appendField('field')
            .appendField(new Blockly.FieldDropdown([["field","field"]]), 'FIELD')
            .appendField('to');
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
        
        if(toAdd.length === 0)toAdd = [['field','field']];
        this.removeInput('values', /* no error */ true);
        this.removeInput('value',true);
        this.appendDummyInput('values')
            .appendField('field')
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD')
            .appendField('to');
        this.appendValueInput('value')
            .appendField('Value');
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
    console.log('bb.fastGet("liveObjects","'+obj_val+'").setValue("'+field_val+'",'+val_val+');');
    // return 'console.log("' + obj_val + "->"+field_val + " = " + val_val+'")';
    return 'bb.fastGet("liveObjects","'+obj_val+'").setValue("'+field_val+'",'+val_val+');';
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
                categs.push([i,i]);
        }
        return categs;
    }
};

Blockly.JavaScript['dropdown_obj'] = function(block) {
    let inp_val = block.getFieldValue('TESTF');
    return 'bb.fastGet("liveObjects","' + inp_val + '")';
};