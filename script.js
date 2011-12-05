// ==UserScript==
// @name           keyboard navigation on google search (knogs)
// @description    keybindings for search: j/k: up/down, enter or (shift) o to open (in a new tab)
//                 based on the google's (now defunct) experimental keyboard shortcuts
//                 places the cursor above the items (as opposed to on the far left)
//                 known to work on:
//                     chrome 17 on linux/64-bit
//                     firefox 8.0 on linux/64-bit
//                 bugs: opening an item and then using the back button doesn't set the cursor
// @match          *://*.google.com/search*
// @version        0.99
// @creator        seth lytle (nqzero)
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


function dummyScript() {
    a=document.getElementsByName('q')[0];
    b=document.getElementById('nqHelper');
    var txt = a.onfocus;
    txt = txt.toString();
    b.onfocus=a.onfocus;
    console.log( 'yyy --- yyy ' + txt);
}



// Force loading of Google Shortcuts JS functions
function addJavaScript( js, onload ) {
   var head;
   head = document.getElementsByTagName('head')[0];
   if (!head) {return;}
   helper = document.createElement('input');
   helper.id = 'nqHelper';
   helper.style.visibility = "hidden";
   document.body.appendChild( helper );

   dummy = document.createElement('script');
//   var inputs = document.getElementsByName("q");
//   if (inputs.length > 0)  dummy.onfocus = inputs[0].onfocus;
//   dummy.innerHTML = "a=document.getElementsByName('q')[0]; b=document.getElementById('nqHelper'); var txt = a.onfocus; txt = txt.toString(); b.onfocus=a.onfocus; console.log(txt);";
   dummy.innerHTML = "a=document.getElementsByName('q')[0]; a.oncut=a.onfocus";
//   dummy.innerHTML = dummyScript.toString();
   dummy.id = "nqDummy";
   dummy.style.visibility = "hidden";
   document.body.appendChild( dummy );
   script = document.createElement('script');
   script.type = 'text/javascript';
   script.id = 'nqGokena';
   script.src = js;
   script.addEventListener( "load", onload, false );
   head.appendChild(script);
}

// there's some bit rot in google's javascript - polish it
function shortcut_onload() {
    var x = document.getElementsByClassName("mbEnd")[0];
    x && x.parentNode.removeChild(x);
    x = document.getElementsByClassName("g");
    if (x) for (ii=0; ii < x.length; ii++) x[ii].children[0].style.position = "relative";
    x = document.getElementsByClassName("tas");
    if (x) for (ii=0; ii < x.length; ii++) x[ii].children[0].style.position = "relative";
    var sch = document.getElementsByName("q");
    var nqfocus = document.getElementById("nqHelper");
    for(var c=0;c<sch.length;c++)
        sch[c].onfocus = undefined; // sch[0].oncut;
    sch[0].oncut = undefined;
}

    


nqxxx = "hellow world";
console.log("stuff2 " + document.readyState);

// the google code sets the hash, but doesn't seem to clean it up on back ... delete it
if (window.location.hash) {
    window.location.hash = "";
    var a = document.URL;
    window.location = a.replace( "#", "" );
}



addJavaScript( shortcut_js, shortcut_onload );

