
function loadPUstyle() {
	// AJAX example to be called by index.html
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
			document.getElementById("ajaxDiv").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "ajax-info.txt", true);
	xmlhttp.send();
}

function loadSFstyle() {
	// AJAX example to be called by index.html
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
			document.getElementById("ajaxDiv").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "ajax-info.txt", true);
	xmlhttp.send();
}

function loadIFstyle() {
	// AJAX example to be called by index.html
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
			document.getElementById("ajaxDiv").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "ajax-info.txt", true);
	xmlhttp.send();
}