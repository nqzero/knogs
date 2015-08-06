// chrome has changed how it handles window.open
// if the shift key is pressed, it opens a new window instead of a new tab
// work around it by overriding the key handler
// (this is injected into the page, not run as a content script)
// handle only the 'o' keypress, and propagate everything else to
// the previous handler

var handler = document.onkeydown;

keyOverride = function(evt){
    evt = evt || window.event;
    if (evt.ctrlKey || evt.altKey || evt.metaKey)return;
    var target = evt.target || evt.srcElement;

    if (target.tagName !== "INPUT"
            && evt.keyCode == 79
            && (sc.a >= 0 && sc.a < sc.d)) {
        window.open(sc.c[sc.a].m.href);
        return sc.k(evt)
    }
    else
        return handler(evt);
};


document.onkeydown = keyOverride;
