/******************************* 
*
* mm_wrapper.js
*
* functions for MM devices 
*	display
*
********************************/

// template file locations
var deviceFilePU = "templates/MM_2015-template-Optin-PU.html";
var deviceFileSF = "templates/MM_2015-template-SF.html";
var deviceFileIF = "templates/MM_2015-template-IF.html";
var deviceFileEOA = "templates/MM_2015-template-EOA.html";

/******************************************************************

// default vars for forms from MM_DeviceWrapper
// preset parseable to default in cases where a value is necessary
// should declare these with init values to determine type (int, string, etc.)

// The === operator forces comparison of values and type.

// missing parameters are set to 'undefined', to avoid:
function myFunction(x, y) {
    y = y || 0;
} 

******************************************************************/
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

/******************************************/
// UTILITIES

function clearContentDiv(elementID) {
    document.getElementById(elementID).innerHTML = "";
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
	if (number == null) 
		return false;
	// not, not a number...
	else 
		return !isNaN(number);
}

function hasVarString(checkable) {
	/* 
	TODO 
	*/
	// refine this check...
	// if has (valid) string return true
	return checkable != null;
}

/******************************************/



/******************************************/
// COVER IMAGE


function getReportCover() {
	document.getElementById("reportCover").src = setReportCoverUrl;
	document.getElementById("reportCover").style.width = setCoverWide;
	document.getElementById("reportCover").style.height = setCoverHigh;
	
	console.log(setReportCoverUrl);	
	console.log(setCoverWide);
	console.log(setCoverHigh);
}

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

function getByline() {
	// allow user to set NO byline (null)
	console.log(setByline);
	if (hasVarString(setByline)) {
		document.getElementById("resultByline").innerHTML = setByline;
	}
	else 
		document.getElementById("resultByline").innerHTML = "null";
}

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

function getHeading() {
	// allow user to set NO byline (null)	
	if (hasVarString(setHeading)) {
		document.getElementById("resultHeading").innerHTML = setHeading;
	}
	else 
		document.getElementById("resultHeading").innerHTML = "null";
}

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
	// set/get range ( 1 - 3 )?
	if (isValidNumber(paraNumber)) {
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
				console.log("No loadUserCopyPara found...");
		}
		getCopyPara(paraNumber);
	}
	else {
		console.log("not valid loadUserCopyPara number or out of range");
	}	
}


function getCopyPara(paraNumber) {
	// set/get range ( 1 - 3 )?
	if (isValidNumber(paraNumber)) {
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
				console.log("No getCopyPara found...");
		}
	}
	else {
		console.log("not valid setCopyPara number or out of range");
	}	
}

/**********************************************/

// DEVICE EMULATORS

function loadDevice(deviceType) {
	// check deviceType..
	var deviceElementId = "none";
	var deviceFile = "none";
	
	if (deviceType != null) {
		deviceElementId = deviceType;
	}
	
	switch (deviceType) {
		case "contentPU":
			deviceFile = deviceFilePU;
			break;
		case "contentSF":
			deviceFile = deviceFileSF;
			break;
		case "contentIF":
			deviceFile = deviceFileIF;
			break;
		case "contentEOA":
			deviceFile = deviceFileEOA;
			break;
		default:
			break;	
	}

	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} 
	else {
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById(deviceElementId).innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", deviceFile, true);
	xmlhttp.setRequestHeader('Content-type', 'text/html');
	xmlhttp.send();
}

function parseForDevice(deviceType) {
	if (deviceType == null) {
		//blah
	}
	//
	// check for set vars before trying to parse them into the device
	//
	// byline
	console.log( "setByline: " + setByline);
	document.getElementById("templateByline").innerHTML = setByline;
	//
	// heading - (EOA temp2-title-text)
	console.log( "setHeading: " + setHeading);
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

