/******************************* 
*
* openx_wrapper.js
*
* functions for MM devices 
*	display
*
********************************/

/*jslint browser:true*/
"use strict";

/******************************************************************

// default (global) vars for OpenX_Wrapper
// preset parseable to default in cases where a value is necessary
// should declare these with init values to determine type (int, string, etc.)

// The === operator forces comparison of values and type.

// missing parameters are set to 'undefined', to avoid:
function myFunction(x, y) {
    y = y || 0;
} 

******************************************************************/

// dev to debug, false for production
var DEBUG = true;

// template file locations
var TEMPLATE_LOCATION_MM = "templates/mm/MM_";
var TEMPLATE_LOCATION_DR = "templates/dr/DR_";

var deviceFilePU = "2015-template-PU.html";
var deviceFileSF = "2015-template-SF.html";
var deviceFileIF = "2015-template-IF.html";
var deviceFileEOA = "2015-template-EOA.html";
var defaultDeviceFile = deviceFileEOA;

var DEVICETYPE_EOA = "contentEOA";
var DEVICETYPE_PU = "contentPU";
var DEVICETYPE_SF = "contentSF";
var DEVICETYPE_IF = "contentIF";

// site specific stylesheets
var style1url = "blank";
var style2url = "blank";
var style3url = "blank";
var MMicon = "images/MM-icon.jpg";
var DRicon = "images/DR-icon.jpg";
var USERicon = "images/userIcon.jpg";

// stored version of deviceFile for edits and saves
var siteVersion = "none";
var deviceFilename = "none";
var deviceType = "none";
var siteIcon = "none";

var defaultSiteVersion = "MM_";
var userSiteVersion = "none";
var defaultUserDevice = "contentPU";
var userSelectedDevice = defaultUserDevice;

var defaultCoverUrl = "templates/defaultCover.png";
var defaultCoverFileType1 = ".png";
var defaultCoverFileType2 = ".jpg";
var setReportCoverUrl = defaultCoverUrl;

var defaultCoverWidth = 145;
var defaultCoverHeight = 195;
var setCoverWide = defaultCoverWidth;
var setCoverHigh = defaultCoverHeight;

// can have a null byline
var defaultByline = "";
var setByline = defaultByline;

var defaultHeading = "Report Heading";
var setHeading = defaultHeading;

// must have at least 1 copy paragraph?
var defaultCopyPara1 = "Copy...";
var setCopyPara1 = defaultCopyPara1;
var defaultCopyPara2 = "";
var setCopyPara2 = defaultCopyPara2;
var defaultCopyPara3 = "";
var setCopyPara3 = defaultCopyPara3;

//
var plaintextWindow;

/************************************************************************************/
//
//
// UTILITIES
//
//
/************************************************************************************/

function logger(message) {
	if (DEBUG) {
		console.log(message);
    document.getElementById("loggerMessage").innerHTML = "<em>log:</em> " + message;
	}	
}

function checkValidURL(checkableUrl) {
  // this function not correct
  var request = new XMLHttpRequest();  
  request.open("GET", checkableUrl, true);
  
  if (request.readyState === 4){
    return false;
  }
  else if (request.status === 404) {  
    logger("Error: checking valid url failed - 404: " + checkableUrl);
    return false;
  }
  
  return true;
}

function loadMMstyles() {
  // document is null, hidden from function?
  try {
    style1url = "http://www.moneymorning.com.au/wp-content/themes/shoestrap-leadgen/style.css";
    style2url = "http://www.moneymorning.com.au/wp-content/uploads/ss-style.css?ver=1424233318";
  }
  catch(e) {
    logger("Error: MM stylesheets not loaded - " + e.message);
  }
  if (checkValidURL(style1url)) {
    document.write('<link rel="stylesheet" href="' + style1url + '" type="text/css" media="all" />');
  }
  if (checkValidURL(style2url)) {
    document.write('<link rel="stylesheet" href="' + style2url + '" type="text/css" media="all" />');
  }
  logger("MM styles found.");
}

function loadDRstyles() {
  try {
    style1url = "http://www.dailyreckoning.com.au/wp-content/themes/zenko/style.css";
    style2url = "http://dailyreckoning.com.au/css/signupbox.css";
    style3url = "http://www.dailyreckoning.com.au/wp-content/themes/zenko/custom.css?ver=4.1.1";
    // add third DR style, order specific
  }
  catch(e) {
    logger("Error: DR stylesheets not loaded - " + e.message);
  }  
    
  if (checkValidURL(style1url)) {
    document.write('<link rel="stylesheet" href="' + style1url + '" type="text/css" media="all" />');
  }
  if (checkValidURL(style2url)) {    
    document.write('<link rel="stylesheet" href="' + style2url + '" type="text/css" media="all" />');
  }
  if (checkValidURL(style3url)) {    
    document.write('<link rel="stylesheet" href="' + style3url + '" type="text/css" media="all" />');
  }
  logger("DR styles found.");
}

function loadSiteVersion() {
	// depends on radio mm,dr,ti
	// in case user changed site but not pressed LOAD site..
	// this must load a siteVersion
	userSiteVersion = document.querySelector('input[name="siteVersionRadio"]:checked').value;

	logger(userSiteVersion);	
	if (hasVarString(userSiteVersion))
		siteVersion = userSiteVersion;
	else 
		siteVersion = defaultSiteVersion;
}

function loadSelectedDevice() {
	// this must load a device
	userSelectedDevice = document.querySelector('input[id="userDeviceType"]:checked').value;
	logger(userSelectedDevice);	
	if (hasVarString(userSelectedDevice))
		deviceType = userSelectedDevice;
	else 
		deviceType = defaultUserDevice;
}

function loadSiteStyles() {
	// depends on siteVersion...
	// storage may be undefined...
  if (localStorage.getItem("siteVersion") !== null) {
    siteVersion = localStorage.getItem("siteVersion");
  }
  else {
    siteVersion = "NO";
  }

	switch (siteVersion) {
		case "MM":
			loadMMstyles();
			siteIcon = MMicon;
			break;
		case "DR":
			loadDRstyles();
			siteIcon = DRicon;
			break;
    case "user":
      //TO BE IMPLEMENTED
      siteIcon = USERicon;
      
		default:
      // default is for local stylesheet?...or none
      logger("No stylesheets loaded.");
			break;
	} 	
}

function storeLocal() {
	loadSiteVersion(); 
  localStorage.setItem("siteVersion", siteVersion);
	logger("storing: " + siteVersion);
}

function resetAllLeftFields() {
  document.getElementById("userReportCover").value = "";
	document.getElementById("userCoverWide").value = "";
	document.getElementById("userCoverHigh").value = "";
	document.getElementById("userByline").value = "";
	document.getElementById("userHeading").value = "";
	document.getElementById("userCopyPara1").value = "";
	document.getElementById("userCopyPara2").value = "";
	document.getElementById("userCopyPara3").value = "";
}

function resetAllRightFields() {
	document.getElementById("resultByline").innerHTML = "";
	document.getElementById("resultHeading").innerHTML = "";
	document.getElementById("resultPara1").innerHTML = "";
	document.getElementById("resultPara2").innerHTML = "";
	document.getElementById("resultPara3").innerHTML = "";
}

function isValidNumber(number) {
	if (number === null)
		return false;
	// not, not a number...
	else
		return !isNaN(number);
}

function inParaRange(number) {
	return (number <= 3 && number >= 1);
}

function hasVarString(checkable) {
	/* 
	TODO 
	*/
	// refine this check...
	// if has (valid) string return true
	return checkable != null;
}



/************************************************************************************/
//
//
// FUNCTIONS CALLED FROM HTML (PUBLIC)
//
//
/************************************************************************************/

function getSiteVersion() {
	// depends on radio mm,dr,ti
	// loads the site specific css
	// as well as setting the siteVersion
	loadSiteVersion();
	loadSiteStyles();
}

function getReportCover() {
	// load form elements first
	loadUserReportCover();
	loadUserCoverWide();
	loadUserCoverHigh();
	
	document.getElementById("reportCover").src = setReportCoverUrl;
	document.getElementById("reportCover").style.width = setCoverWide;
	document.getElementById("reportCover").style.height = setCoverHigh;
	
	logger(setReportCoverUrl);	
	logger(setCoverWide);
	logger(setCoverHigh);
}

function getByline() {
	// allow user to set NO byline (null)
	// load form element first
	loadUserByline();
	
	logger(setByline);
	if (hasVarString(setByline)) {
		document.getElementById("resultByline").innerHTML = setByline;
	}
	else 
		document.getElementById("resultByline").innerHTML = "null";
}

function getHeading() {
	// allow user to set NO byline (null)
	// load form element first	
	loadUserHeading();
	
	if (hasVarString(setHeading)) {
		document.getElementById("resultHeading").innerHTML = setHeading;
	}
	else 
		document.getElementById("resultHeading").innerHTML = "null";
}

function getParaCopy(paraNumber) {
	if (isValidNumber(paraNumber)) {
		if (inParaRange(paraNumber)) {
			loadUserCopyPara(paraNumber);
		}
	}	
}

// load all fields assuming the setters have all been set.
function getAllFields() {
	//only load elements that have been set, ISSET ?
	getReportCover();
	getByline();
	getHeading();
	getParaCopy(1);
	getParaCopy(2);
	getParaCopy(3);	
}

function clearDeviceContent() {
	// clear any that are on screen...	
    document.getElementById(DEVICETYPE_PU).innerHTML = "";
	document.getElementById(DEVICETYPE_EOA).innerHTML = "";
	document.getElementById(DEVICETYPE_SF).innerHTML = "";
	document.getElementById(DEVICETYPE_IF).innerHTML = "";
}

function getDeviceContent() {
	loadSiteVersion();
	loadSelectedDevice();
	loadTemplateLocation();
	loadDeviceFile();
	loadDeviceContent();	
}

function updateDeviceContent() {
	getAllFields();
	// 	this gets the form content from settingsContainer
	//	and inputs it into the loadContainer
	parseForDevice();
}

function displayDeviceContent() {
	// displays the finished device in a new window,
	// ready for cut n paste into openX
  // logs a semi useless timestamp, for future versioning?
  // print the version as human readable date/time at top of output window
  
	var timestamp = new Date().getTime();
	logger("output process version: " + deviceType + " - " + timestamp);
	processDeviceToFile();
}

function loadUserStyle() {
  //called from form, user loads direct url stylesheet
  // to override any legacy or superseded styles.
  // div element: userStyleSheet
  var candidate = document.getElementById("userStyleSheet").value;
	
  if (candidate == null || candidate == "") {
		logger("Error: No user style sheet.");
	}
	else {
		// check for valid url here
		setReportCoverUrl = candidate;
	}
	//gc 
  candidate = null;
  
}

/************************************************************************************/
//
//
// INTERNAL FUNCTIONS (PRIVATE)
//
//
/************************************************************************************/


/******************************************/
// COVER IMAGE and SIZE(S)
function loadUserReportCover() {
	var candidate = document.getElementById("userReportCover").value;
	if (candidate == null || candidate == "") {
		setReportCoverUrl = defaultCoverUrl;
	}
	else {
		// check for valid url here
		setReportCoverUrl = candidate;
	}
	//gc 
  candidate = null;
}

function loadUserCoverWide() {
	var candidate = document.getElementById("userCoverWide").value;
	if (candidate == null || candidate == "") {
		setCoverWide = defaultCoverWidth;
	}
	else if (isValidNumber(candidate)) {
		setCoverWide = candidate;
	}
	//gc
	candidate = null;
}

function loadUserCoverHigh() {
	var candidate = document.getElementById("userCoverHigh").value;
	if (candidate == null || candidate == "") {
		setCoverHigh = defaultCoverHeight;
	}
	else if (isValidNumber(candidate)) {
		// check for valid int
		setCoverHigh = candidate;
	}
	candidate = null;
}


/******************************************/
// INTRO BY-LINE
function loadUserByline() {
	var candidate = document.getElementById("userByline").value;
	
	if (hasVarString(candidate)) {
		setByline = candidate;
	}
	else
		setByline = defaultByline;
	//gc	
	candidate = null;
}


/******************************************/
// HEADING
function loadUserHeading() {
	var candidate = document.getElementById("userHeading").value;
	logger("loadUserHeading, candidate: " + candidate);
	if (hasVarString(candidate)) {
		setHeading = candidate;
	}
	else 
		setHeading = defaultHeading;
	//gc
	candidate = null;
}


/******************************************/
// LOAD COPY PARAGRAPHS - numbered
function loadUserCopyPara(paraNumber) {
	var candidate;
	switch (paraNumber) {
		case 1:
			candidate = document.getElementById("userCopyPara1").value;
			if (hasVarString(candidate)) {
				setCopyPara1 = candidate;
			}
			else {
				setCopyPara1 = defaultCopyPara1;
			}
			break;
		case 2:
			candidate = document.getElementById("userCopyPara2").value;
			if (hasVarString(candidate)) {
				setCopyPara2 = candidate;
			}
			else {
				setCopyPara2 = defaultCopyPara2;
			}
			break;
		case 3:
			candidate = document.getElementById("userCopyPara3").value;
			if (hasVarString(candidate)) {
				setCopyPara3 = candidate;
			}
			else {
				setCopyPara3 = defaultCopyPara3;
			}
			break;
		default:
			logger("No loadUserCopyPara found...");
	}
	getCopyPara(paraNumber);

   //gc
   candidate = null;
}

function getCopyPara(paraNumber) {
	switch (paraNumber) {
		case 1:
			if (hasVarString(setCopyPara1)) {
				document.getElementById("resultPara1").innerHTML = setCopyPara1;
			}
			else {
				document.getElementById("resultPara1").innerHTML = defaultCopyPara1;
			}
			break;
		case 2:
			if (hasVarString(setCopyPara2)) {
				document.getElementById("resultPara2").innerHTML = setCopyPara2;
			}
			else {
				document.getElementById("resultPara2").innerHTML = defaultCopyPara2;
			}
			break;
		case 3:
			if (hasVarString(setCopyPara3)) {
				document.getElementById("resultPara3").innerHTML = setCopyPara3;
			}
			else {
				document.getElementById("resultPara3").innerHTML = defaultCopyPara3;
			}
			break;
		default:
			logger("No getCopyPara found...");
	}			
}

/**********************************************/

// DEVICE EMULATORS
function loadTemplateLocation() {
	switch (siteVersion) {
		case "MM":
			deviceFilename = TEMPLATE_LOCATION_MM;
			break;
		case "DR":
			deviceFilename = TEMPLATE_LOCATION_DR;
			break;
		default:
			deviceFilename = TEMPLATE_LOCATION_MM;			
			break;
	}
	logger("deviceFilename 1: " + deviceFilename);
}

function loadDeviceFile() {
	// build device filename here
	logger("deviceType: " + deviceType);
	switch (deviceType) {
		case DEVICETYPE_PU:
			deviceFilename = deviceFilename.concat(deviceFilePU);
			break;
		case DEVICETYPE_SF:
			deviceFilename = deviceFilename.concat(deviceFileSF);
			break;
		case DEVICETYPE_IF:
			deviceFilename = deviceFilename.concat(deviceFileIF);
			break;
		case DEVICETYPE_EOA:
			deviceFilename = deviceFilename.concat(deviceFileEOA);
			break;
		default:
			deviceFilename = deviceFilename.concat(defaultDeviceFile);
			break;	
	}
}

function loadDeviceContent() {	
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById(deviceType).innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", deviceFilename, true);
	xmlhttp.setRequestHeader('Content-type', 'text/html');
	xmlhttp.send();
}

function parseForDevice() {
	//
  // TO BE PROPERED
	// check for set vars before trying to parse them into the device
	// some Devices per site will NOT require some elements.. need to allow null.

  var element1 = document.getElementById("templateByline");
  if (element1 === null) {
    //skip it
  }
  else {
    if (typeof element1 !== "undefined") {
      if (setByline != null) {   
        document.getElementById("templateByline").innerHTML = setByline;
      }
    }
  }
	//
  var element2 = document.getElementById("templateHeading");
  if (element2 === null) {
    //skip it
    logger("templateHeading null");
  }
  else {
    if (typeof element2 !== "undefined") {
      if (setHeading != null) {   
        document.getElementById("templateHeading").innerHTML = setHeading;
      }
    }
  }
	// reportCover
	if (setReportCoverUrl != null) {
    document.getElementById("templateCover").src = setReportCoverUrl;
  }
	if (setCoverWide != null) {
    document.getElementById("templateCover").style.width = setCoverWide;
  }
  if (setCoverHigh != null) {	
    document.getElementById("templateCover").style.height = setCoverHigh;
  }
	//
	// each line of text has a <p> </p>
	//
	// copyParas
  
  var element3 = document.getElementById("templatePara1");
  if (element3 === null) {
    //skip it
  }
  else {
    if (typeof element3 !== "undefined") {
      if (setCopyPara1 != null) {   
        document.getElementById("templatePara1").innerHTML = setCopyPara1;
      }
    }
  }  

  var element4 = document.getElementById("templatePara2");
  if (element4 === null) {
    //skip it
  }
  else {
    if (typeof element4 !== "undefined") {
      if (setCopyPara2 != null) {   
        document.getElementById("templatePara2").innerHTML = setCopyPara2;
      }
    }
  }  

  var element5 = document.getElementById("templatePara3");
  if (element5 === null) {
    //skip it
  }
  else {
    if (typeof element5 !== "undefined") {
      if (setCopyPara3 != null) {   
        document.getElementById("templatePara3").innerHTML = setCopyPara3;
      }
    }
  }
  // gc
  element1 = null;
  element2 = null;
  element3 = null;
  element4 = null;
  element5 = null;
}

/**********************************************/

// PROCESS DEVICE

function processDeviceToFile() {
	// get finished device template and content,
	// save to plaintext file suitable for use
	// in openX.	
	var contents;
	contents = document.getElementById(deviceType).innerHTML;
	//open the plaintext in new window:	
	plaintextWindow = window.open("OpenX_plaintext.html", 
				"_blank", 
				"toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=900, height=800");
	plaintextWindow.document.open();
	// get it to not render as html but as visible code
	// this is where the html entities need to be kept as such
	var safe = "<pre>";
	safe += contents.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	safe += "</pre>";
	plaintextWindow.document.write(safe);
	//plaintextWindow.document.write(document.getElementById(deviceType).innerHTML);	
	plaintextWindow.document.close();
  //gc
  contents = null;
}

/**********************************************/

// LOAD HELP WINDOW

function openHelpWindow() {
  helpWindow = window.open("OpenX_wrapper-help.html", 
				"_blank", 
				"toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=630, height=800");
	helpWindow.document.open();
  
}