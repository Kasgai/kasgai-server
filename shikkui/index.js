"use strict";

let workspace = null;

// XML setup
const loadXml = async (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => data)
    .catch((error) => console.error(error));
};

const makeWorkspace = (htmlToolbox) => {
  const htmlBlocklyArea = document.getElementById("blocklyArea");

  workspace = Blockly.inject(htmlBlocklyArea, makeOption(htmlToolbox));

  const htmlBlockXmlCode = localStorage.getItem("blockly-html-code");
  if (htmlBlockXmlCode) {
    workspace.clear();
    const xml = Blockly.Xml.textToDom(htmlBlockXmlCode);
    Blockly.Xml.domToWorkspace(xml, workspace);
  }

  Blockly.svgResize(workspace);

  const updateWorkspace = () => {
    const code = BlockGenerator.workspaceToCode(workspace);
    document.getElementById("htmlSourcecode").innerText = code;
    document.getElementById(
      "website"
    ).src = `data:text/html;charset=utf-8,${encodeURIComponent(code)}`;

    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem("blockly-html-code", xmlText);
  };

  workspace.addChangeListener(updateWorkspace);
};

const makeOption = (toolbox) => {
  return {
    toolbox: toolbox,
    collapse: true,
    maxBlocks: Infinity,
    trashcan: true,
    tooltips: true,
    css: true,
    media: "https://blockly-demo.appspot.com/static/media/",
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
  };
};

// import Files
const importBlockXml = (e) => {
  const file = e.files[0];
  if (!file) {
    console.error("file was not found");
    return;
  }
  if (!workspace) {
    console.error("workspace was not found");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const xmlText = e.target.result;
    if (xmlText) {
      workspace.clear();
      const xml = Blockly.Xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xml, workspace);
    }
  };
  reader.readAsText(file);
};

// export Files
const exportBlockXml = () => {
  if (workspace) {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    const blob = new Blob([xmlText], { type: "text/xml;charset=utf-8" });
    document.getElementById("exportBlockXml").href = window.URL.createObjectURL(
      blob
    );
  } else {
    console.error("cannot export Block XML");
  }
};

const exportHtml = () => {
  if (workspace) {
    const code = BlockGenerator.workspaceToCode(workspace);
    downloadArchivedPage(code).then(function (response) {
      const blob = new Blob([response], { type: "application/zip" });
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = window.URL.createObjectURL(blob);
      link.download = "MyPage.zip";
      link.click();
      document.body.removeChild(link);
    });
  } else {
    console.error("cannot export HTML");
  }
  return false;
};

const downloadArchivedPage = (code) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://kasgai-kura.herokuapp.com");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "blob";
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(xhr.response);
    };
    xhr.send(JSON.stringify({ html: code }));
  });
};

// main logic
(async () => {
  const requestUrl = "toolbox.xml";

  loadXml(requestUrl).then((toolbox) => makeWorkspace(toolbox));
})();
