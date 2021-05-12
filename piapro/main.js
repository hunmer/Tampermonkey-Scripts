// ==UserScript==
// @name        piapro 連続再生
// @namespace   https://greasyfork.org/zh-CN/scripts/426346-piapro-%E9%80%A3%E7%B6%9A%E5%86%8D%E7%94%9F
// @match       https://piapro.jp/
// @grant       none
// @grant       GM_addStyle
// @version     1.0
// @updateURL   
// @author      -
// @description 2021/5/12下午4:16:43
// ==/UserScript==

(function() {
    GM_addStyle('._active{background-color: deepskyblue;}');

  
    var isPC = unsafeWindow.piapro_play_music == undefined;
    if (isPC) {
        unsafeWindow.piapro_play_music = function(contentId, createDate) {
            var prefix = contentId.substr(0, 2);
            var audio_src = 'https://cdn.piapro.jp/mp3_a/' + prefix + '/' + contentId + '_' + createDate + '_audition.mp3';
            if (unsafeWindow.audio == undefined) {
                unsafeWindow.audio = new Audio();
            }
            unsafeWindow.audio.src = audio_src;
            unsafeWindow.autoplay = true;
            console.log(audio_src)
            unsafeWindow.audio.play();
            registerEvent();
            setActive(document.querySelector('#_item_' + unsafeWindow.now_playing))
        }
        unsafeWindow.playCard = function(p1, contentId, createDate) {
            unsafeWindow.now_playing = contentId;
            unsafeWindow.piapro_play_music(contentId, createDate);
        }
    } else {
        var fun = unsafeWindow.piapro_play_music;
        unsafeWindow.piapro_play_music = function(contentId, createDate) {
            fun(contentId, createDate);
            setActive(document.getElementById('button_' + now_playing).parentElement.parentElement);
        }
        registerEvent();
    }
  

    function registerEvent() {
        var next, btnClass;
        unsafeWindow.audio.onended = function() {
            if (isPC) {
                next = document.querySelector('#_item_' + unsafeWindow.now_playing).nextElementSibling;
                btnClass = 'a';
            } else {
                var next = document.getElementById('button_' + now_playing).parentElement.parentElement.nextElementSibling;
                btnClass = '.btn_play';

            }
            if (next != undefined) {
                if (isPC) {
                    registerTimeupdate();
                }
                next.querySelector(btnClass).click();
              
            }

        }
    }

    function getTimeString(s) {
        function _s(s, j = '') {
            s = parseInt(s);
            return (s == 0 ? '' : (s < 10 ? '0' + s : s) + j);
        }

        function _s1(s, j = '', d = '') {
            s = parseInt(s);
            return s < 10 ? '0' + s : s;
        }

        s = Number(s);
        var h = 0,
            m = 0;
        if (s >= 3600) {
            h = parseInt(s / 3600);
            s %= 3600;
        }
        if (s >= 60) {
            m = parseInt(s / 60);
            s %= 60;
        }
        return '▶ [' + _s(h, ':') + _s(m, ':') + _s1(s, '') + '] ';
    }

    function setActive(dom) {
        var actived = document.querySelector('._active');
        if (actived != undefined) {
            actived.classList.remove('_active');
        }else{
            unsafeWindow.audio.ontimeupdate = function() {
              if(this.paused){
                status = 'paused';
              }else
              if(this.ended){
                status = 'ended';
              }else
              if(this.currentTime <= 0){
                status = 'loading';
              }else{
                status = getTimeString(this.duration - this.currentTime);
              }
              document.title = status;
          }
        }
        if (dom != undefined) {
            dom.classList.add('_active');
        }
    }


})();