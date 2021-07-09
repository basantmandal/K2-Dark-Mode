/*
 * k2darkmode.js 0.0.2 - 06 - July - 2021
 * Copyright (c) 2021 Basant Mandal, https://wwww.techbasant.in
 * k2darkmode.js is open sourced under the MIT license.
 * https://github.com/basantmandal/K2DarkMode
 */

"use strict";
var settings = {
    debug: false,
    version: "0.0.2"
};
var defaults = {
    light: "assets/css/light.css",
    dark: "assets/css/dark.css",
    startAt: '13:00',
    endAt: '06:00',
    darkMode_CSS_ID: "darkMode_css",
    anyTimeDark: "1" // BY PASS TIME CHECK (1 - ByPass, 0 - Based on Time)
};

/*
 * PURPOSE : ADD DARK CLASS ON THE HEAD SECTION
 *  PARAMS :  fileName (Can be with Path like assets/css/darkmode.css)
 * RETURNS :  True/False
 */
function addCss(fileName) {
    let date = new Date();
    removeDarkMode();
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName + '?v=' + date.getTime();
    link.id = defaults.darkMode_CSS_ID;
    document.head.appendChild(link);
}

/**
 * Remove the Dark Mode CSS Link
 */
function removeDarkMode() {
    try {
        const stylesheet = document.getElementById(defaults.darkMode_CSS_ID);
        stylesheet.parentNode.removeChild(stylesheet);
    }
    catch (e) {
        //Handle the error if you want....
    }
}

/*
 * PURPOSE : Converts to Unix Time Stamp
 *  PARAMS :  Valid Time like 13:00 (24Hrs Format)
 * RETURNS :  Unix Time Stamp
 */

var unitTimeStamp = function (time) {
    let date = new Date();
    let normalized = time.split(':');
    return date.setHours(normalized[0], normalized[1], 0);
};
/*
 * PURPOSE : Main Function which does the job
 *  PARAMS :  Options & Debug
 * RETURNS :  Unix Time Stamp
 */
var darkMode = (options = defaults, debug = settings.debug) => {
    let dateObject = new Date();
    let startTime = unitTimeStamp(options.startAt);
    let endTime = unitTimeStamp(options.endAt);
    let currentTime = dateObject.getTime();
    //Automatic Apply of Css based on Time, If Applicable
    let status = (endTime < currentTime && currentTime > startTime) || (startTime > currentTime && currentTime < endTime) || options.anyTimeDark == "1" ? addCss(options.dark) : addCss(options.light);
    if (debug) {
        console.clear();
        console.log("Dark JS Active\nVersion:- " + settings.version + " Debug Mode Enabled\n");
        console.log("Start Time :- " + options.startAt);
        console.log("End Time :- " + options.endAt);
        console.log("Current Time :- " + dateObject.toDateString());
        let mode = (endTime < currentTime && currentTime > startTime) || (startTime > currentTime && currentTime < endTime) ? "Dark Mode" : "Normal Mode";
        console.log("Mode :- " + mode);
    }
};
