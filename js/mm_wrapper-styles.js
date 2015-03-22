/******************************* 
*
* mm_wrapper-styles.js
*
* styles for MM devices 
*	display
*
********************************/

// variables to be called in by html page
var font1url = "http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,900";
var font2url = "http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,300,400,600&subset=latin,latin-ext&ver=4.1.1";

var style1url = "http://mmau.staging.wpengine.com/wp-content/themes/shoestrap-leadgen/style.css";
var style2url = "http://mmau.staging.wpengine.com/wp-content/uploads/ss-style.css?ver=1424233318";

var styleOverride1 = "http://127.0.0.1/test/mm-new/mm_overrides.css";


function loadFontstyle() {
	document.write('<link href="' + font1url + '" rel="stylesheet" type="text/css">');
	document.write('<link href="' + font2url + '" rel="stylesheet" type="text/css">');
}

function loadCSSstyle() {
	document.write('<link rel="stylesheet" href="' + style1url + '" type="text/css" media="all" />');
	document.write('<link rel="stylesheet" href="' + style2url + '" type="text/css" media="all" />');
}

function loadOverrides() {
	document.write('<link rel="stylesheet" href="' + styleOverride1 + '" type="text/css" media="all" />');	
}
