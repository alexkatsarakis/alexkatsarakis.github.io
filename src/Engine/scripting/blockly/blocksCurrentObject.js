import bb from "../../../utils/blackboard.js";

const colourPalette = {
  colour: 24,
  object: 190,
};

Blockly.Blocks["this_obj"] = {
  init: function () {
    this.appendDummyInput().appendField("this");
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setOutput(true, "Object");
  },
};

Blockly.JavaScript["this_obj"] = function (block) {
  return `AK.getObjectByID(currObject)`;
};

Blockly.Blocks["this_object_flags"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("set")
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values")
      // .appendField(Blockly.Msg.AK_FIELD)
      .appendField("flag")
      .appendField(new Blockly.FieldDropdown(this.getFlags()), "FIELD")
      .appendField(Blockly.Msg.AK_TO);
    this.appendValueInput("value")
      .setCheck("Boolean")
      .appendField(Blockly.Msg.AK_VALUE);
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },

  getFlags: function () {
    const opts = bb.fastGet("state", "focusedObject").getOptions();
    const categs = [];
    for (let i in opts) {
      categs.push([i, i]);
    }
    return categs;
  },
};

Blockly.JavaScript["this_object_flags"] = function (block) {
  const field_val = block.getFieldValue("FIELD");
  const val_val =
    Blockly.JavaScript.valueToCode(
      block,
      "value",
      Blockly.JavaScript.ORDER_NONE
    ) || "''";
  return `AK.getObjectByID(currObject).setOption('${field_val}',${val_val});`;
};

Blockly.Blocks["this_object_value"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("set")
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values")
      .appendField("attribute")
      .appendField(new Blockly.FieldDropdown(this.getFields()), "FIELD")
      .appendField(Blockly.Msg.AK_TO);
    this.appendValueInput("value").appendField(Blockly.Msg.AK_VALUE);
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },

  getFields: function () {
    const opts = bb.fastGet("state", "focusedObject").getValues();
    const categs = [];
    for (let i in opts) {
      categs.push([i, i]);
    }
    return categs;
  },
};

Blockly.JavaScript["this_object_value"] = function (block) {
  const field_val = block.getFieldValue("FIELD");
  const val_val =
    Blockly.JavaScript.valueToCode(
      block,
      "value",
      Blockly.JavaScript.ORDER_NONE
    ) || "''";
  return `AK.getObjectByID(currObject).setValue('${field_val}',${val_val});`;
};

Blockly.Blocks["this_object_state"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("set")
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values")
      .appendField("state to")
      .appendField(new Blockly.FieldDropdown(this.getStates()), "FIELD");
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },

  getStates: function () {
    const opts = bb.fastGet("state", "focusedObject").getStates();
    const categs = [];
    for (let i in opts) {
      categs.push([i, i]);
    }
    return categs;
  },
};

Blockly.JavaScript["this_object_state"] = function (block) {
  const field_val = block.getFieldValue("FIELD");
  return `AK.getObjectByID(currObject).setCurrentState('${field_val}');`;
};

Blockly.Blocks["this_object_event"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.AK_TRIGGER_OBJECT)
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values")
      .appendField(Blockly.Msg.AK_EVENT)
      .appendField(new Blockly.FieldDropdown(this.getEvents()), "FIELD");
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },

  getEvents() {
    const opts = bb.fastGet("state", "focusedObject").getEvents();
    const categs = [];
    for (let i in opts) {
      categs.push([i, i]);
    }
    return categs;
  },
};

Blockly.JavaScript["this_object_event"] = function (block) {
  const field_val = block.getFieldValue("FIELD");
  return `AK.getObjectByID(currObject).triggerEvent('${field_val}');`;
};

Blockly.Blocks["get_this_object_value"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("get")
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values")
      .appendField("attribute")
      .appendField(new Blockly.FieldDropdown(this.getFields()), "FIELD");
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setOutput(true, undefined);
  },

  getFields: function () {
    const opts = bb.fastGet("state", "focusedObject").getValues();
    const categs = [];
    for (let i in opts) {
      categs.push([i, i]);
    }
    return categs;
  },
};

Blockly.JavaScript["get_this_object_value"] = function (block) {
  const field_val = block.getFieldValue("FIELD");
  return [
    `AK.getObjectByID(currObject).getValue('${field_val}')`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};

Blockly.Blocks["get_this_object_flags"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("get")
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values")
      .appendField("flag")
      .appendField(new Blockly.FieldDropdown(this.getFlags()), "FIELD");
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setOutput(true, undefined);
  },

  getFlags: function () {
    const opts = bb.fastGet("state", "focusedObject").getOptions();
    const categs = [];
    for (let i in opts) {
      categs.push([i, i]);
    }
    return categs;
  },
};

Blockly.JavaScript["get_this_object_flags"] = function (block) {
  const field_val = block.getFieldValue("FIELD");
  return [
    `AK.getObjectByID(currObject).getOption('${field_val}')`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};

Blockly.Blocks["get_this_object_state"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("get")
      .appendField(bb.fastGet("state", "focusedObject").name, "MODE")
      .appendField(Blockly.Msg.AK_APOSS);
    this.appendDummyInput("values").appendField("current").appendField("state");
    this.setColour(colourPalette.object);
    this.setTooltip("Get an object field.");
    this.setHelpUrl("none");
    this.setOutput(true, undefined);
  },
};

Blockly.JavaScript["get_this_object_state"] = function (block) {
  return [
    `AK.getObjectByID(currObject).getCurrentState()`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};
