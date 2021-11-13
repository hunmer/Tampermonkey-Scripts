// ==UserScript==
// @name        spotify music downloader
// @namespace   spotifyMusicDownloader
// @match       https://open.spotify.com/*
// @grant       GM_xmlhttpRequest
// @grant       GM_download
// @grant       unsafeWindow
// @version     0.1
// @author      -
// @license MIT
// @updateURL   https://raw.githubusercontent.com/hunmer/Tampermonkey-Scripts/main/musicDownloader/musicDownloader.meta.js
// @downloadURL https://raw.githubusercontent.com/hunmer/Tampermonkey-Scripts/main/musicDownloader/musicDownloader.user.js
// @description download spotify music with one button
// ==/UserScript==
var running;
var timer = setInterval(() => {
    var target = document.querySelector('div[data-testid="now-playing-widget"]');
    if (target) {
        clearInterval(timer);
        var btn = document.createElement('button');
        btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>`;
        btn.style.cssText = 'background-color: transparent;border: unset;margin-left: 10px;';
        btn.onclick = function() {
            if (running) {
                return alert('already running...');
            }
            running = true;
            setStatus('fetching...');
            var id = document.querySelector('a[data-testid="context-link"]').href.match(/%3Atrack%3A(\S*)/)[1];;
            if (id == '') return alert('error to get album id');
            //alert(id);
            GM_xmlhttpRequest({
                url: 'https://muffon.endorphine.by/api/v1/spotify/tracks/' + id,
                responseType: 'json',
                onload: function(res) {
                    if (res.readyState == 4 && res.response.track) {
                        setStatus('downloading...');
                        GM_download({
                            url: res.response.track.audio.link,
                            name: res.response.track.title + ' by ' + res.response.track.artist.name.replace(/[\\\/:*?"<>|]+/g, "") + '.mp3',
                            onprogress: function(res) {
                                if (res.readyState == 3) {
                                    setStatus(parseInt(res.loaded / res.total * 100) + '%');
                                }
                            },
                            onload: function(res) {
                                setResult('download success');
                            },
                            onerror: function() {
                                setResult('fetch error');

                            }
                        })

                    }
                },
                onerror: function() {
                    setResult('fetch error');
                }
            })

        }

        target.appendChild(btn);
        var span = document.createElement('span');
        span.style.cssText = 'margin-left: 10px;'
        span.id = 'musicDownloader_status';
        target.appendChild(span);

        function setStatus(text) {
            document.querySelector('#musicDownloader_status').innerHTML = text;
        }

        function setResult(msg) {
            running = false;
            setStatus('');
            alert(msg);

        }
    }



}, 1000)