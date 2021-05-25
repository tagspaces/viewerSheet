/* Copyright (c) 2013-present The TagSpaces Authors.
 * Use of this source code is governed by the MIT license which can be found in the LICENSE.txt file. */
/* globals sendMessageToHost, getParameterByName, initI18N, $, isElectron */
'use strict';


const locale = getParameterByName('locale');
const filePath = getParameterByName('file');

const readFile = function(filePath) {
    const oReq = new XMLHttpRequest();
    oReq.open("GET", filePath, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (oEvent) {
        const arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            const byteArray = new Uint8Array(arrayBuffer);
            processWb(XLSX.read(byteArray, {type: 'array'}));
        }
    };

    oReq.send(null);
};

if (filePath.endsWith('.csv')) {
    sendMessageToHost({command: 'loadDefaultTextContent', preview: true});
} else {
    readFile(filePath);
}

const processWb = function (wb) {
    const HTMLOUT = document.getElementById('htmlout');
    HTMLOUT.innerHTML = "";
    wb.SheetNames.forEach(function (sheetName) {
        const htmlstr = XLSX.utils.sheet_to_html(wb.Sheets[sheetName], {editable: true});
        HTMLOUT.innerHTML += htmlstr;
    });
};

function setContent(content, fileDir) {
    processWb(XLSX.read(content, {type: 'string'}));
}

/*const readFile = function(files) {
    const f = files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        let data = e.target.result;
        data = new Uint8Array(data);
        processWb(XLSX.read(data, {type: 'array'}));
    };
    reader.readAsArrayBuffer(f);
};*/

/* document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        // const XLSX = require('xlsx');
        // processWb(XLSX.readFile(filePath));
        processWb(XLSX.read(data, {type: 'string'}));
    }
};

const data = 'uuid,name,isFile,extension,tags,size,lmdt,path,description,thumbPath\n' +
    'e8d0d031-1522-4a59-b403-0822987dab06,1C49B89[1star].jpg,true,jpg,1star,487222,1597850029652,/Users/sytolk/Documents/1C49B89[1star].jpg,jj467666666,/Users/sytolk/Documents/.ts/1C49B89[1star].jpg.jpg\n' +
    'a39d60c6-4e03-4291-90f1-56e000a7082a,animations_macos.sh,true,sh,1star,3050,1601897335917,/Users/sytolk/Documents/lambda/animations_macos.sh,,/Users/sytolk/Documents/lambda/.ts/animations_macos.sh.jpg\n' +
    '514a16be-ef07-4d08-a381-ae2281e7c306,B1BEC666-546E-48A7-99E2[ggg 1star].jpg,true,jpg,2star;ggg;1star,386528,1612430823269,/Users/sytolk/Documents/B1BEC666-546E-48A7-99E2[ggg 1star].jpg,,/Users/sytolk/Documents/.ts/B1BEC666-546E-48A7-99E2[ggg 1star].jpg.jpg\n' +
    'd2b1bfde-6cab-43ee-be23-7241115f0692,FEA163A8-5D9A-4767-86F1-B1B1B1B4A7F1[1star].jpg,true,jpg,1star,104360,1611908751214,/Users/sytolk/Documents/FEA163A8-5D9A-4767-86F1-B1B1B1B4A7F1[1star].jpg,,/Users/sytolk/Documents/.ts/FEA163A8-5D9A-4767-86F1-B1B1B1B4A7F1[1star].jpg.jpg\n' +
    'a97bf4c9-cea9-4ba9-9ba3-20573b23d7b5,id-3-1-st-edition-price-list-22072020[1star].pdf,true,pdf,1star,642586,1601905586192,/Users/sytolk/Documents/lambda/id-3-1-st-edition-price-list-22072020[1star].pdf,,/Users/sytolk/Documents/lambda/.ts/id-3-1-st-edition-price-list-22072020[1star].pdf.jpg\n' +
    '54052038-da6c-4ea1-a51d-fe014294aeab,кирилица-ренаме1.txt,true,txt,1star,0,1614864874744,/Users/sytolk/Documents/кирилица-ренаме1.txt,,\n';*/


