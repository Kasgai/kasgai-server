"use strict";

// extend Blockly.JavaScript for HTML
var BlockGenerator = Blockly.JavaScript;

const generateTag = (tagName, content, isIndented = true) => {
  if (isIndented) {
    return `<${tagName}>\n${content}</${tagName}>\n`;
  }
  return `<${tagName}>${content.trim()}</${tagName}>\n`;
};

BlockGenerator["html"] = function (block) {
  const statements_content = BlockGenerator.statementToCode(block, "content");
  const code = "<!DOCTYPE HTML>\n<html>\n" + statements_content + "</html>\n";
  return code;
};

BlockGenerator["body"] = function (block) {
  const statements_content = BlockGenerator.statementToCode(block, "content");
  const code = "<body>\n" + statements_content + "</body>\n";
  return code;
};

BlockGenerator["head"] = function (block) {
  const statements_content = BlockGenerator.statementToCode(block, "content");
  const code =
    '<head>\n  <meta charset="utf-8">\n' + statements_content + "</head>\n";
  return code;
};

BlockGenerator["title"] = function (block) {
  const statements_content = BlockGenerator.statementToCode(block, "content");

  if (statements_content != "")
    document.getElementById("title").innerText = statements_content;
  else document.getElementById("title").innerText = "untitled web page";

  const code = "<title>" + statements_content.trim() + "</title>\n";
  return code;
};

BlockGenerator["p"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("p", content);
};

BlockGenerator["plaintext"] = function (block) {
  const content = block.getFieldValue("content");
  const code = content + "\n";
  return code;
};

BlockGenerator["attribute_text"] = function (block) {
  const value = block.getFieldValue("value");
  const code = ` ${value}`;
  return [code, BlockGenerator.ORDER_NONE];
};

BlockGenerator["div"] = function (block) {
  const attribute = BlockGenerator.valueToCode(
    block,
    "attribute",
    BlockGenerator.ORDER_NONE
  );
  const content = BlockGenerator.statementToCode(block, "content");
  const code = `<div${attribute}>\n${content}</div>\n`;
  return code;
};

BlockGenerator["style"] = function (block) {
  const style = BlockGenerator.statementToCode(block, "style");
  const code = ' style="' + style.trim() + '"';
  return [code, BlockGenerator.ORDER_NONE];
};

BlockGenerator["color"] = function (block) {
  const color = block.getFieldValue("color");
  const code = "color: " + color + ";";
  return code;
};

BlockGenerator["background_color"] = function (block) {
  const colour_name = block.getFieldValue("NAME");
  const code = "background-color: " + colour_name + ";";
  return code;
};

BlockGenerator["generic_style"] = function (block) {
  const text_property = block.getFieldValue("property");
  const text_value = block.getFieldValue("value");
  const code = text_property + ": " + text_value + ";";
  return code;
};

BlockGenerator["generictag"] = function (block) {
  const text_name = block.getFieldValue("NAME");
  const value_name = BlockGenerator.valueToCode(
    block,
    "NAME",
    BlockGenerator.ORDER_NONE
  );
  const statements_content = BlockGenerator.statementToCode(block, "content");
  const code =
    "<" +
    text_name +
    value_name +
    ">\n" +
    statements_content +
    "</" +
    text_name +
    ">\n";
  return code;
};

BlockGenerator["more_attributes"] = function (block) {
  const value_name1 = BlockGenerator.valueToCode(
    block,
    "NAME1",
    BlockGenerator.ORDER_NONE
  );
  const value_name2 = BlockGenerator.valueToCode(
    block,
    "NAME2",
    BlockGenerator.ORDER_NONE
  );
  const value_name3 = BlockGenerator.valueToCode(
    block,
    "NAME3",
    BlockGenerator.ORDER_NONE
  );
  const code = value_name1 + value_name2 + value_name3;
  return [code, BlockGenerator.ORDER_NONE];
};

BlockGenerator["generic_attribute"] = function (block) {
  const text_attribute = block.getFieldValue("attribute");
  const text_value = block.getFieldValue("value");
  const code = " " + text_attribute + '="' + text_value + '"';
  return [code, BlockGenerator.ORDER_NONE];
};

BlockGenerator["a_href"] = function (block) {
  const target = block.getFieldValue("target");
  const content = BlockGenerator.statementToCode(block, "content");
  const code = `<a href="${target}">${content.trim()}</a>\n`;
  return code;
};

BlockGenerator["span"] = function (block) {
  const attribute = BlockGenerator.valueToCode(
    block,
    "attribute",
    BlockGenerator.ORDER_NONE
  );
  const content = BlockGenerator.statementToCode(block, "content");
  const code = `<span${attribute}>${content.trim()}</span>\n`;
  return code;
};

BlockGenerator["img"] = function (block) {
  const source = block.getFieldValue("source");
  const alt = block.getFieldValue("alt");
  const code = `<img src="${source}" alt="${alt}">\n`;
  return code;
};

BlockGenerator["em"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("em", content, false);
};

BlockGenerator["strong"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("strong", content, false);
};

BlockGenerator["h"] = function (block) {
  const level = block.getFieldValue("level");
  const content = BlockGenerator.statementToCode(block, "content");
  const code = `<${level}>${content.trim()}</${level}>\n`;
  return code;
};

BlockGenerator["br"] = function (block) {
  const code = "<br>\n";
  return code;
};

BlockGenerator["hr"] = function (block) {
  const code = "<hr>\n";
  return code;
};

BlockGenerator["ul"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("ul", content, false);
};

BlockGenerator["ol"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("ol", content, false);
};

BlockGenerator["li"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("li", content, false);
};

BlockGenerator["ins"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("ins", content, false);
};

BlockGenerator["del"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("del", content, false);
};

BlockGenerator["sup"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("sup", content, false);
};

BlockGenerator["sub"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("sub", content, false);
};

BlockGenerator["code"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("code", content);
};

BlockGenerator["q"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("q", content, false);
};

BlockGenerator["blockquote"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("blockquote", content);
};

BlockGenerator["samp"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("samp", content);
};

BlockGenerator["kbd"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("kbd", content);
};

BlockGenerator["form"] = function (block) {
  const statements_content = BlockGenerator.statementToCode(block, "content");
  const code = "<form>\n" + statements_content + "</form>\n";
  return code;
};

BlockGenerator["table"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("table", content);
};

BlockGenerator["tr"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("tr", content);
};

BlockGenerator["td"] = function (block) {
  const content = BlockGenerator.statementToCode(block, "content");
  return generateTag("td", content, false);
};

BlockGenerator["input_text"] = function (block) {
  const text_default = block.getFieldValue("default");
  const code = '<input value="' + text_default + '">\n';
  return code;
};

BlockGenerator["button"] = function (block) {
  const attribute = BlockGenerator.valueToCode(
    block,
    "attribute",
    BlockGenerator.ORDER_NONE
  );
  const content = BlockGenerator.statementToCode(block, "content");
  const code = `<button ${attribute}>\n${content}</button>\n`;
  return code;
};

BlockGenerator["input"] = function (block) {
  const dropdown_type = block.getFieldValue("type");
  const text_value = block.getFieldValue("value");
  const value_text = BlockGenerator.valueToCode(
    block,
    "text",
    BlockGenerator.ORDER_NONE
  );
  const code =
    '<input type="' +
    dropdown_type +
    '" value="' +
    text_value +
    '"' +
    value_text +
    " />\n";
  return code;
};

BlockGenerator["script"] = function (block) {
  const code = Blockly.JavaScript.statementToCode(block, "code");
  return generateTag("script", code);
};

BlockGenerator["onclick"] = function (block) {
  const code = Blockly.JavaScript.statementToCode(block, "code");
  const output = ` onclick='${code.trim()}'`;
  return [output, BlockGenerator.ORDER_NONE];
};

BlockGenerator["id"] = function (block) {
  const statements_name = block.getFieldValue("id");
  const code = ` id="${statements_name}"`;
  return [code, BlockGenerator.ORDER_NONE];
};

// Node control scripts

BlockGenerator["getelementbyid"] = function (block) {
  const id = block.getFieldValue("id");
  const domCode = Blockly.JavaScript.statementToCode(block, "dom_code");
  const code = `document.getElementById("${id}")${domCode.trim()}\n`;
  return code;
};

BlockGenerator["innerhtml"] = function (block) {
  const assigned_value = Blockly.JavaScript.valueToCode(
    block,
    "assigned_value",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  if (assigned_value === "") {
    return `.innerHTML`;
  }
  // for inline code
  const escape_code = assigned_value.replace(/(^\'|\'$)/g, '"');
  const code = `.innerHTML = ${escape_code};\n`;
  return code;
};

BlockGenerator["dom_value"] = function (block) {
  const assigned_value = Blockly.JavaScript.valueToCode(
    block,
    "assigned_value",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  if (assigned_value === "") {
    return `.value`;
  }
  const code = `.value = ${assigned_value}\n`;
  return code;
};

BlockGenerator["select_image"] = function (block) {
  const source = block.getFieldValue("source");
  const width = block.getFieldValue("width");
  const height = block.getFieldValue("height");
  const code = `<img src="${source}" width="${width}" height="${height}">\n`;
  return code;
};

// JavaScript

BlockGenerator["var"] = function (block) {
  const var_name = block.getFieldValue("NAME");
  const assigned_value = Blockly.JavaScript.valueToCode(
    block,
    "assigned_value",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  if (assigned_value === "") {
    return `var ${var_name};\n`;
  }
  return `var ${var_name} = ${assigned_value.trim()};\n`;
};

BlockGenerator["assign"] = function (block) {
  const var_name = block.getFieldValue("NAME");
  const assigned_value = Blockly.JavaScript.valueToCode(
    block,
    "assigned_value",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return `${var_name} = ${assigned_value.trim()};\n`;
};

BlockGenerator["assign_value"] = function (block) {
  const var_name = block.getFieldValue("NAME");
  return [var_name, BlockGenerator.ORDER_ATOMIC];
};

BlockGenerator["assign_statement"] = function (block) {
  const statements = Blockly.JavaScript.statementToCode(
    block,
    "input_statement"
  );
  const code = `${statements}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

BlockGenerator["function"] = function (block) {
  const text_name = block.getFieldValue("NAME");
  const statements_statement = Blockly.JavaScript.statementToCode(
    block,
    "STATEMENT"
  );
  const code = `function ${text_name}() {
${statements_statement}
}\n`;
  return code;
};

BlockGenerator["return"] = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(
    block,
    "NAME",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  const code = `return ${value_name};`;
  return code;
};

BlockGenerator["call_function"] = function (block) {
  const text_function_name = block.getFieldValue("FUNCTION_NAME");
  const text_function_argument = block.getFieldValue("FUNCTION_ARGUMENT");
  const code = `${text_function_name}(${text_function_argument})`;
  return code;
};

BlockGenerator["date"] = function (block) {
  const code = "new Date()";
  return [code, BlockGenerator.ORDER_NONE];
};
