// ==UserScript==
// @name         视频自动播放
// @namespace    hunmer.github.io/vocaloidPlayer/ helper
// @version      0.1
// @description  让bilibili/youtube/niconico/soundcloud/piapro的embed媒体自动播放
// @author       neysummer2000
// @match        https://bandcamp.com/EmbeddedPlayer/*
// @match        http://embed.nicovideo.jp/watch/*
// @match        https://www.youtube.com/embed/*
// @match        https://player.bilibili.com/player.html?*
// @match        https://w.soundcloud.com/player/?*
// @match        https://cdn.piapro.jp/mp3*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    switch(location.host){
        case "embed.nicovideo.jp":
            clickStart('button[data-reactid="41"]');
            break;

        case "www.youtube.com":
            clickStart("ytp-play-button ytp-button");
            break;

        case "bandcamp.com":
            clickStart('#big_play_button', 2000);
            break;

        case "player.bilibili.com":
            clickStart(".bilibili-player-video-recommend");
            break;

        case "w.soundcloud.com":
            clickStart(".playButton.medium", 5000);
            break;

        case "cdn.piapro.jp":
            clickStart("media");
            break;

    }


    function clickStart(seletor, dealy = 0){
        var btn = document.querySelector(seletor);
        if(btn !== null){
            setTimeout(function(){
                btn.click();}, dealy);
        }
    }
})();