// ==UserScript==
// @name         AttendPro
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  test for attendance project
// @author       litheubbe
// @match        https://meet.google.com/*
// @include      https://meet.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// ==/UserScript==

(function() {
    'use strict';

    let clearIntervalID = setInterval(addAttendanceButton, 1000);

    function addAttendanceButton() {
        console.log("restarted function");
        let pplListActions = document.getElementsByClassName("KWsfzd");
        if (pplListActions[0] == undefined) {
            console.log("LogicError: variable pplListActions is null");
            console.log(typeof(pplListActions));
            console.log(pplListActions.length);
            return;
        } else if (document.getElementById("btn_Attendance") != undefined) {
            console.log("Button already there");
            clearInterval(clearIntervalID);
            return;
        } else {
            console.log("Adding the button");
            let AttendanceButton = document.createElement("button");
            AttendanceButton.innerText = "attendance";
            AttendanceButton.setAttribute("id", "btn_Attendance");
            AttendanceButton.addEventListener("click", getAllNames);
            pplListActions[0].appendChild(AttendanceButton);
        }
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