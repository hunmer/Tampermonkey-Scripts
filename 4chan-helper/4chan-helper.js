// ==UserScript==
// @name         4chan/f fitler
// @namespace    https://greasyfork.org/zh-CN/scripts/412639-4chan-f-fitler
// @version      0.2
// @description  remove viewed swf
// @description  ctrl+<- prev swf
// @description  ctrl+-> next swf
// @author       Neysummer2000
// @match        https://boards.4chan.org/f/
// @updateURL https://raw.githubusercontent.com/hunmer/Tampermonkey-Scripts/main/4chan-helper/4chan-helper.js
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
        var parent =  d.parentElement.parentElement;
        if (g_viewed.indexOf(d.href) != -1){
            parent.remove();
        }else{
            d.addEventListener("click", function(ev) {
                g_viewed.push(d.href);
                g_viewing = parent;
                // console.log(g_viewing);
                localStorage.setItem("4chan_viewed", JSON.stringify(g_viewed));

                var iframe = document.getElementById('swf-embed-header');
                var span = document.createElement("span");
                span.innerText = "   " + parent.children[6].innerText;
                iframe.appendChild(span);

                var a = document.createElement("a");
                a.target = "_blank";
                a.href = d.href;
                a.innerText = "download";
                a.style.cssText = "float: right; margin-right: 10px;";
                iframe.appendChild(a);
                //console.log(d.href);

            });
        }
    })


})();