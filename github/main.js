// ==UserScript==
// @name        New script - github.com
// @namespace   Violentmonkey Scripts
// @match       https://github.com/hunmer/*
// @grant       GM_notification
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      -
// @description 2021/8/15 上午12:54:53
// ==/UserScript==
if(location.href == 'https://github.com/hunmer/listen-toggle/tree/main/video'){
    var btn = document.createElement('button');
  btn.id='btn_check';
  btn.className = 'dropdown-item menu-item-primary btn-link';
  btn.innerHTML = 'check';
  btn.onclick = (event) => {
     event.preventDefault(true);
     event.stopPropagation();
    var s;
    var ret = "";
    var max = parseInt(prompt('max'));
    if(max > 0){
      for(var i = 0; i < max; i++){
        s = i;
        if(i < 10){
          s = '0' + s;
        }
        if(i < 100){
          s = '0' + s;
        }
        if(document.querySelector('a[title="'+s+'.ts"]') == null){
          ret += i + ".ts\n";
        }
      }
    }
    alert(ret);
  }
  document.querySelector("#repo-content-pjax-container > div > div.file-navigation.mb-3.d-flex.flex-items-start > div.d-flex > details:nth-child(3) > div > ul > li > form").appendChild(btn);
}else
if(location.pathname.indexOf('/upload/main') != -1){

  
  var uploading = false;
  setInterval(() => {
  var div = document.querySelector('.js-upload-progress');
  if(div != null){
    if(!div.hidden){
      if(uploading === false){
        uploading = true;
        console.log('upload start');
      }
    }else{
      if(uploading){
          console.log('upload over');
          GM_setValue('updated', true);
        setTimeout(() => {document.querySelector('button[data-pull-text="Propose changes"]').click()}, 3000);
      }
    }
  }
}, 1000);
}else{
  if(GM_getValue('updated', false)){
    GM_setValue('updated', false);
    var tab = window.open("","_blank");
    tab.setTimeout(() => {window.close()}, 2000);
    // GM_notification({
    //     text: 'github',
    //     title: '上传完成',
    // });
  }
}