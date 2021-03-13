import bb from '../../../utils/blackboard.js'

import objManager from '../../renderer/ObjectManager.js'

const colourPalette = {
    colour: 24,
    object: 190
}

Blockly.Blocks['moveBy_object'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('move')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField('by')
        this.appendValueInput('FIELDX')
            .appendField('x axis: ')
            .setCheck('Number')
        this.appendValueInput('FIELDY')
            .appendField('y axis: ')
            .setCheck('Number')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
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

Blockly.JavaScript['moveBy_object'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    var argument1 = Blockly.JavaScript.valueToCode(block, 'FIELDX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument2 = Blockly.JavaScript.valueToCode(block, 'FIELDY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.moveBy(AK.getObjectByID("${obj_val}"), ${argument1}, ${argument2})`;
};

Blockly.Blocks['moveTo_object'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('move')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField('to')
        this.appendValueInput('FIELDX')
            .appendField('x axis: ')
            .setCheck('Number')
        this.appendValueInput('FIELDY')
            .appendField('y axis: ')
            .setCheck('Number')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
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

Blockly.JavaScript['moveTo_object'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    var argument1 = Blockly.JavaScript.valueToCode(block, 'FIELDX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument2 = Blockly.JavaScript.valueToCode(block, 'FIELDY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.moveTo(AK.getObjectByID("${obj_val}"), ${argument1}, ${argument2})`;
};


Blockly.Blocks['moveByMS_object'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('move')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField('by')
        this.appendValueInput('FIELDX')
            .appendField('x axis: ')
            .setCheck('Number')
        this.appendValueInput('FIELDY')
            .appendField('y axis: ')
            .setCheck('Number')
        this.appendValueInput('FIELDMS')
            .appendField('in milliseconds: ')
            .setCheck('Number')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
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

Blockly.JavaScript['moveByMS_object'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    var argument1 = Blockly.JavaScript.valueToCode(block, 'FIELDX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument2 = Blockly.JavaScript.valueToCode(block, 'FIELDY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument3 = Blockly.JavaScript.valueToCode(block, 'FIELDMS',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.moveByInMSeconds(AK.getObjectByID("${obj_val}"), ${argument1}, ${argument2}, ${argument3})`;
};

Blockly.Blocks['moveToMS_object'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('move')
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'MODE')
            .appendField('to')
        this.appendValueInput('FIELDX')
            .appendField('x axis: ')
            .setCheck('Number')
        this.appendValueInput('FIELDY')
            .appendField('y axis: ')
            .setCheck('Number')
        this.appendValueInput('FIELDMS')
            .appendField('in milliseconds: ')
            .setCheck('Number')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
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

Blockly.JavaScript['moveToMS_object'] = function(block) {
    let obj_val = block.getFieldValue('MODE');
    var argument1 = Blockly.JavaScript.valueToCode(block, 'FIELDX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument2 = Blockly.JavaScript.valueToCode(block, 'FIELDY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument3 = Blockly.JavaScript.valueToCode(block, 'FIELDMS',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.moveToInMSeconds(AK.getObjectByID("${obj_val}"), ${argument1}, ${argument2}, ${argument3})`;
};