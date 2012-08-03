// ==UserScript==
// @name           keyboard navigation on google search (knogs)
// @description    keybindings for search: j/k: up/down, enter or (shift) o to open (in a new tab)
//                 based on the google's (now defunct) experimental keyboard shortcuts
//                 places the cursor above the items (as opposed to on the far left)
//                 known to work on:
//                     chrome 17 on linux/64-bit
//                       occassional problems with focus during load
//                 works partially:
//                     firefox 8.0 on linux/64-bit - focus gets screwed up
//                 bugs: opening an item and then using the back button doesn't set the cursor
// @match          *://*.google.com/search*
// @version        1.00
// @creator        seth lytle (nqzero), copyright 2011
// @license        mit/x
// ==/UserScript==
//
// Quick Usage Instructions
// ========================
// Implement keybindings for google search
// loads the javascript from google
// note: google may delete this in the future - you can save the js file
//   and reference it directly if you want. see "local copy" below
// this was originally a google experiment at http://www.google.com/experimental/
// but was discontinued in 2011

// Google Keyboard Shortcut JS code
var shortcut_js = "https://www.google.com/js/shortcuts.5.js"

// use a local copy ...
// shortcut_js = chrome.extension.getURL( "googleKeyboard.js" );




// Force loading of Google Shortcuts JS functions
function addJavaScript( id, inner, js, onload ) {
   var head;
   head = document.getElementsByTagName('head')[0];
   if (!head) {return;}
   script = document.createElement('script');
   script.type = 'text/javascript';
   script.id = id;
   if (js) script.src = js;
   else    script.innerHTML = inner;
   if (onload) script.addEventListener( "load", onload, false );
   head.appendChild(script);
}

// for the most part focus works without modifying the google script
// occassionally focus gets screwed up, requiring a reload
//   seems to happen primarily when the input is selected while a load is ongoing
//   but could be more complicated

// there's some bit rot in google's javascript - polish it
function shortcut_onload() {
    var x = document.getElementsByClassName("mbEnd")[0];
    x && x.parentNode.removeChild(x);
    x = document.getElementsByClassName("g");
    // align the arrows
    if (x) for (ii=0; ii < x.length; ii++) {
      x[ii].style.position = "relative";
      x[ii].children[0].style.position = "absolute";
      x[ii].children[0].style.marginTop = "0";
      x[ii].children[0].style.left = "-16px";
      x[ii].children[0].style.top = "4px";
    }
    x = document.getElementsByClassName("tas");
    if (x) for (ii=0; ii < x.length; ii++) {
      x[ii].style.position = "relative";
      x[ii].children[0].style.position = "absolute";
      x[ii].children[0].style.marginTop = "0";
      x[ii].children[0].style.left = "-16px";
      x[ii].children[0].style.top = "4px";
    }
}

    


// the google code sets the hash, but doesn't seem to clean it up on back ... delete it
if (window.location.hash) {
    window.location.hash = "";
    var a = document.URL;
    window.location = a.replace( "#", "" );
}


addJavaScript(  'nqMain', null, shortcut_js, shortcut_onload );

