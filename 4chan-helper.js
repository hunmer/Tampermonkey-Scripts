// ==UserScript==
// @name         4chan/f fitler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  remove viewed swf
// @description  ctrl+<- prev swf
// @description  ctrl+-> next swf
// @author       Neysummer2000
// @match        https://boards.4chan.org/f/
// @updateURL
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var g_viewing; // dom
    var g_viewed = localStorage.getItem("4chan_viewed");
    if (g_viewed == null)
        g_viewed = "[]";
    g_viewed = JSON.parse(g_viewed);
    //console.log(g_viewed);

    var dom;
    for (var url of g_viewed) {
        dom = document.querySelector('a[href="' + url + '"]');
        if (dom !== null) {
            dom.parentElement.parentElement.remove();
            //console.log("remove " + url);
        }
    }

    window.addEventListener("keydown", function(ev){
        if(g_viewing === undefined) return;
        if(ev.ctrlKey){
            switch(ev.key){
                case "ArrowRight":
                    var prev = g_viewing.nextElementSibling;
                    if(prev !== null){
                        document.getElementById('swf-embed').remove()
                        prev.children[3].children[0].click();
                    }
                    break;

                case "ArrowLeft":
                    var next = g_viewing.previousElementSibling;
                    if(next !== null){
                        document.getElementById('swf-embed').remove()
                        next.children[3].children[0].click();
                    }
                    break;

            }
        }
    });

    document.querySelectorAll('.flashListing td:nth-child(4) a').forEach(function(d) {
        d.addEventListener("click", function(ev) {
            if (g_viewed.indexOf(d.href) === -1)
                g_viewed.push(d.href);

            g_viewing = d.parentElement.parentElement;
            console.log(g_viewing);
            localStorage.setItem("4chan_viewed", JSON.stringify(g_viewed));
            var a = document.createElement("a");
            a.href = "javascript: window.open('" + d.href + "');";
            a.innerText = "download";
            a.style.cssText = "float: right; margin-right: 10px;";
            document.getElementById('swf-embed-header').appendChild(a);
            //console.log(d.href);
        });
    })


})();