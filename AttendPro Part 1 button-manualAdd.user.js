// ==UserScript==
// @name         AttendPro Part 1 Button-Manual-Add version
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  test for attendance project
// @author       Prysmycal
// @match        https://meet.google.com/*
// @include      https://meet.google.com/*
// @run-at       context-menu
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// ==/UserScript==

(function() {
    'use strict';

    let pplListActions = document.getElementsByClassName("KWsfzd");
    if (pplListActions[0] == null) {
        console.log("LogicError: variable pplListActions is null");
        console.log(typeof(pplListActions));
        console.log(pplListActions.length);
    } else {
        let AttendanceButton = document.createElement("button");
        AttendanceButton.innerText = "attendance";
        pplListActions[0].appendChild(AttendanceButton);
        pplListActions[0].lastChild.onclick = function() {getAllNames()};
    }

    function getAllNames() {
        const nametags = document.getElementsByClassName("zWGUib");
        let csvNames = "data:text/csv;charset=utf-8,";
        let nametagL = nametags.length;

        for (let i = 0; i < nametagL; i++) {
            //names.push(nametags[i].innerHTML);
            csvNames += nametags[i].innerText + ',';
            console.log(nametags[i].innerText);
        }
        
        let date = new Date(); 
        let filename = `Attendance ${date.getDate()}_${date.getMonth()}_${date.getFullYear()} ${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.csv`;

        let encodedUri = encodeURI(csvNames);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link); // Required for FF

        // Fire click event to download the csv
        link.click();
    }
})();
