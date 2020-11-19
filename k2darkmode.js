var settings = {
    debug: false,
    version: "0.0.1"
};
console.clear();
console.log("Dark JS Active\nVersion:- " + settings.version);
var defaults = {
    light       : "assets/css/light.css",
    dark        : "assets/css/dark.css",
    startAt     : '13:00',
    endAt       : '06:00',
    anyTimeDark : "1" // BY PASS TIME CHECK
};
/*
 * PURPOSE : ADD DARK CLASS ON THE HEAD SECTION
 *  PARAMS :  fileName (Can be with Path like assets/css/darkmode.css)
 * RETURNS :  True/False
 */
 function addCss(fileName) {
    let date = new Date();
    removeDarkMode();
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName + '?v=' + date.getTime();
    link.id = "darkMode_css"
    head.appendChild(link);
}
/*
 * PURPOSE : REMOVES DARK MODE
 *  PARAMS :
 * RETURNS :  Nothing
 */
 function removeDarkMode() {
    try{
        const stylesheet = document.getElementById("darkMode_css");
        stylesheet.parentNode.removeChild(stylesheet);
    }
    catch(e){
        //do nothing
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
}
/*
 * PURPOSE : Main Function which does the job
 *  PARAMS :  Valid Time like 13:00 (24Hrs Format)
 * RETURNS :  Unix Time Stamp
 */
 var darkMode = (options = defaults, debug = settings.debug) => {
    let dateObject = new Date();
    let startTime = unitTimeStamp(options.startAt);
    let endTime = unitTimeStamp(options.endAt);
    let currentTime = dateObject.getTime();
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
}
