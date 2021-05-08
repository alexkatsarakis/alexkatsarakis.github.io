import objManager from '../../renderer/ObjectManager.js'

const colourPalette = {
    colour: 24,
    object: 190
}

Blockly.Blocks['calc_distance_obj'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('calculate')
            .appendField('distance')
            .appendField('between')
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'OBJ1')     
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'OBJ2')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setOutput(true, 'Number');
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

Blockly.JavaScript['calc_distance_obj'] = function(block) {
    let obj1 = block.getFieldValue('OBJ1');
    let obj2 = block.getFieldValue('OBJ2');
    return `AK.distanceObjects(AK.getObjectByID("${obj1}"), AK.getObjectByID("${obj2}"))`;
};

Blockly.Blocks['calc_obj_center'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('calculate')
            .appendField('object')
            .appendField('center')
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getObjects(),this.validate), 'OBJ1')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setOutput(true, 'Point');
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

Blockly.JavaScript['calc_obj_center'] = function(block) {
    let obj1 = block.getFieldValue('OBJ1');
    return `AK.getObjectCenter(AK.getObjectByID("${obj1}"))`;
};

Blockly.Blocks['calc_point_dist'] = {
    
    init: function() {
        this.appendDummyInput()
            .appendField('calculate')
            .appendField('distance')
            .appendField('of two points')
        this.appendValueInput('point1')
            .setCheck('Point')
        this.appendValueInput('point2')
            .setCheck('Point')
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object field.');
        this.setHelpUrl('none');
        this.setOutput(true, 'Number');
    }
};

Blockly.JavaScript['calc_point_dist'] = function(block) {
    let point1 = Blockly.JavaScript.valueToCode (block, 'point1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    let point2 = Blockly.JavaScript.valueToCode (block, 'point2',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return `AK.distanceTwoPoints(${point1}, ${point2})`;
};