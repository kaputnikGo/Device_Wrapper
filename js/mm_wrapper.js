/******************************* 
*
* mm_wrapper.js
*
* functions for MM devices 
*	display
*
********************************/

/*jslint browser:true*/
"use strict";

/******************************************************************

// default (global) vars for MM_DeviceWrapper
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
var TEMPLATE_LOCATION_TI = "templates/ti/TI_";

var deviceFilePU = "2015-template-PU.html";
var deviceFileSF = "2015-template-SF.html";
var deviceFileIF = "2015-template-IF.html";
var deviceFileEOA = "2015-template-EOA.html";
var defaultDeviceFile = deviceFileEOA;

// stored version of deviceFile for edits and saves
var siteVersion = "none";
var deviceFilename = "none";
var deviceType = "none";

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
	}	
}

function loadSiteVersion() {
	// depends on radio mm,dr,ti
	// then deviceType
	// this must load a siteVersion
	userSiteVersion = document.querySelector('input[id="siteVersion"]:checked').value;
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

function elementIsDefined(checkable) {
	// checkable null can equal defined...
	return (typeof checkable != 'undefined');
}

/************************************************************************************/
//
//
// FUNCTIONS CALLED FROM HTML (PUBLIC)
//
//
/************************************************************************************/

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
    document.getElementById(deviceType).innerHTML = "";
}

function getDeviceContent() {
	loadSiteVersion();
	loadSelectedDevice();
	loadTemplateLocation();
	loadDeviceFile();
	loadDeviceContent();	
}

function updateDeviceContent() {
	// in case (?):
	//loadSelectedDevice();
	/*
	// needed?
	switch (deviceType) {
		case "contentPU":
			break;
		case "contentSF":
			break;
		case "contentIF":
			break;
		case "contentEOA":
			break;
		default:
			break;
	}
	*/	
	parseForDevice();
}

function processDeviceContent() {
	// check have all the content and deviceType
	
	// singular point of naming saveFile
	var timestamp = new Date().getTime();
	logger(deviceType.concat(timestamp));
	
	// will call this at end
	processDeviceToFile();
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
}

function loadUserCoverWide() {
	var candidate = document.getElementById("userCoverWide").value;
	if (candidate == null || candidate == "") {
		setCoverWide = defaultCoverWidth;
	}
	else if (isValidNumber(candidate)) {
		setCoverWide = candidate;
	}
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
	
	candidate = null;
}


/******************************************/
// HEADING
function loadUserHeading() {
	var candidate = document.getElementById("userHeading").value;
	
	if (hasVarString(candidate)) {
		setHeading = candidate;
	}
	else 
		setHeading = defaultHeading;
	
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
		case "TI":
			deviceFilename = TEMPLATE_LOCATION_TI;
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
		case "contentPU":
			deviceFilename = deviceFilename.concat(deviceFilePU);
			break;
		case "contentSF":
			deviceFilename = deviceFilename.concat(deviceFileSF);
			break;
		case "contentIF":
			deviceFilename = deviceFilename.concat(deviceFileIF);
			break;
		case "contentEOA":
			deviceFilename = deviceFilename.concat(deviceFileEOA);
			break;
		default:
			deviceFilename = deviceFilename.concat(defaultDeviceFile);
			break;	
	}
	logger("deviceFilename 2: " + deviceFilename);
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
	// check for set vars before trying to parse them into the device
	//
	// byline
	logger("setByline: " + setByline);
	document.getElementById("templateByline").innerHTML = setByline;
	//
	// heading - (EOA temp2-title-text)
	logger("setHeading: " + setHeading);
	document.getElementById("templateHeading").innerHTML = setHeading;
	
	// reportCover
	document.getElementById("templateCover").src = setReportCoverUrl;
	document.getElementById("templateCover").style.width = setCoverWide;
	document.getElementById("templateCover").style.height = setCoverHigh;
	//
	// each line of text has a <p> </p>
	//
	// copyParas
	document.getElementById("templatePara1").innerHTML = setCopyPara1;
	document.getElementById("templatePara2").innerHTML = setCopyPara2;
	document.getElementById("templatePara3").innerHTML = setCopyPara3;
	//
}

/**********************************************/

function saveDeviceFile() {
	// based upon template, save it and any edits to 
	// /saves/ folder.
	// save file as prefix devicename + timestamp.txt text file to the saves folder
	var timestamp = new Date().getTime();
	var fileName = deviceType.concat(timestamp);
	logger(fileName);	
}

// PROCESS DEVICE

function processDeviceToFile() {
	// get finished device template and content,
	// save to plaintext file suitable for use
	// in openX.
	
	// get the content from the div id , ie. <div id="contentEOA">
	// and send it to 
	var contents = document.getElementById(deviceType).innerHTML.value;
	
	//open the plaintext in new window:	
	var OpenWindow = window.open("MM_plaintext.html", 
				"_blank", 
				"toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=900, height=800");
	OpenWindow.deviceContents = contents;
    OpenWindow.init();
}

