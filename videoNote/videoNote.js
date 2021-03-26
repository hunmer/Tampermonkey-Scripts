// ==UserScript==
// @name        video Note
// @namespace   Violentmonkey Scripts
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       unsafeWindow
// @version     1.0
// @match       https://www.youtube.com/*
// @match       http://127.0.0.1/test/
// @author      neysummer2000
// @description 2021/3/5 上午10:22:27
// ==/UserScript==

(function() {
    var editor;
    var _son;
    var _res = [
        /*{ url: "https://code.jquery.com/jquery-3.4.0.min.js", type: "js" },
        { url: "https://raw.githack.com/hunmer/hunmer.github.io/master/cdn/float-module/float-module.min.css", type: "css" },
        { url: "https://raw.githack.com/hunmer/hunmer.github.io/master/cdn/float-module/font-awesome.min.css", type: "css" },
        { url: "https://unpkg.com/wangeditor@4.6.8/dist/wangEditor.min.js", type: "js" },
        { url: "https://greasyfork.org/scripts/412159-mydrag/code/MyDrag.js?version=858320", type: "js" },
        { url: "https://greasyfork.org/scripts/401025-%E6%82%AC%E6%B5%AE%E8%8F%9C%E5%8D%95%E6%8C%89%E9%92%AE/code/%E6%82%AC%E6%B5%AE%E8%8F%9C%E5%8D%95%E6%8C%89%E9%92%AE.js?version=793227", type: "js" },*/
        { url: "http://127.0.0.1/Tampermonkey-Scripts/videoNote/jquery-3.4.0.min.js", type: "js" },
        { url: "http://127.0.0.1/Tampermonkey-Scripts/videoNote/float-module.min.css", type: "css" },
        { url: "http://127.0.0.1/Tampermonkey-Scripts/videoNote/font-awesome.min.css", type: "css" },
        { url: "http://127.0.0.1/Tampermonkey-Scripts/videoNote/wangEditor.min.js", type: "js" },
        { url: "http://127.0.0.1/Tampermonkey-Scripts/videoNote/MyDrag.js", type: "js" },
        { url: "http://127.0.0.1/Tampermonkey-Scripts/videoNote/float-module.min.js", type: "js" },
    ];
    var _lastUrl = '';
    var _inited = false;
    setInterval(() => {
        let url = location.href;
        if (url != _lastUrl) {
            _lastUrl = url;
            main();
        }
    }, 1000)

    function main() {
        if (_inited) {
            $('.fm-slide-in, #_videoNote').hide();
        }
        var _selectedDom;
        var _lastSaved = '';
        var _timer = setInterval(() => {
            _video = document.querySelector('video');

            if (_video) {
                clearInterval(_timer);

                if (_inited) {
                    // 如果已经初始化过，则只展示悬浮图标
                    $('.fm-slide-in').show();
                    readNoteData();
                    return;
                }

                _inited = true;

                function loadRes(files, callback, _window = unsafeWindow) {
                    var i = 0;
                    for (var file of files) {
                        if (file.type == "js") {
                            var fileref = _window.document.createElement('script');
                            fileref.setAttribute("type", "text/javascript");
                            fileref.setAttribute("src", file.url)
                        } else if (file.type == "css" || file.type == "cssText") {
                            var fileref = _window.document.createElement("link");
                            fileref.setAttribute("rel", "stylesheet");
                            fileref.setAttribute("type", "text/css");
                            fileref.setAttribute("href", file.url)
                        }
                        _window.document.getElementsByTagName("head")[0].appendChild(fileref).onload = function() {
                            if (++i == files.length) {
                                if (typeof callback == 'function') callback();
                            }
                        }
                    }
                }

                loadRes(_res, () => {

                    var fm = new FloatModule({
                        radius: '50%',
                        theme_color: '#56b4f8',
                        theme_content_color: '#fff',
                        font_size: '18px',
                        width_height: '50px',
                        margin_screen_x: '50px',
                        margin_screen_y: '50px',
                        margin_li: '10px',
                        animation: 'slide-in',
                        position: 'right-bottom',
                        icon_css_path: '',

                        btn_config: [{
                            icon: 'fa fa-th-large'
                        }, {
                            icon: 'fa fa-sign-out',
                            title: '新窗口笔记',
                            click: function() {
                                _son = window.open('', '_blank', 'width=380px,height=770px');
                                unsafeWindow._son = _son;
                                unsafeWindow.onbeforeunload = function() {
                                    if (_son && !_son.closed) return "你确定要离开页面吗?"; // 有子页面存在
                                }

                                unsafeWindow.onunload = function() {
                                    if (_son && !_son.closed) _son.close();
                                }

                                loadRes(_res, () => {
                                    init(_son);

                                }, _son);
                                let w = 1920;
                                unsafeWindow.moveTo(0, 0);
                                unsafeWindow.resizeTo((w - 100) / 2, 1080);
                                _son.moveTo(w / 2, 0);
                                _son.resizeTo(w / 2, 1080);
                            }
                        }, {
                            icon: 'fa fa-pencil-square-o',
                            title: '笔记',
                            click: function() {
                                $ = unsafeWindow.jQuery;

                                if (!_son || _son.closed) {
                                    if ($('#_videoNote').length == 0) {
                                        init(unsafeWindow);

                                    } else {
                                        if ($('#_videoNote').css('display') == 'none') {
                                            $('#_videoNote').css('display', 'unset');
                                            if (editor.txt.html() == '') {
                                                $('#_videoNote_title b').html(document.title);
                                            }
                                            $('#_text-container').css('height', $('#_videoNote').height() - $('#_text-container')[0].offsetTop + 'px');
                                        } else {
                                            $('#_videoNote').css('display', 'none');

                                        }
                                    }
                                }

                            }

                        }, {
                            icon: 'fa fa-list-alt',
                            title: '笔记列表',
                            click: function() {
                                var html = '',
                                    detail;
                                for (let url of GM_listValues()) {
                                    detail = GM_getValue(url);
                                    html += '<li data-action="openNote" data-value="' + url + '">' + detail.title + '<i class="fa fa-times fa-lg" style="position: absolute;right: 5px;" aria-hidden="true" data-action="removeNote"></i></li>';
                                }
                                if (html == '') {
                                    alert('还没有保存任何笔记');
                                } else {
                                    $('#_noteList').show().find('ol').html(html);

                                }


                            }
                        }]
                    });
                    $('.fm-li').css("cssText", "right: 70px !important;bottom: 65px !important;");




                    function init(_window) {
                        $ = _window.jQuery;
                        _document = _window.document;

                        let isSon = !(_window == unsafeWindow);
                        console.log(isSon);

                        $(`<div id="_noteList" style="display:none; width: fit-content;position: absolute;background: rgba(0, 0, 0, .4);z-index: 9999999999;color: white;right: 10px;top:10px;">
					   <div style="width: 100%;display: block;padding: 10px;"><b>笔记列表</b><i class="fa fa-times fa-lg" style="position: absolute;right: 5px;" aria-hidden="true" onclick="$('#_noteList').hide();"></i></div>
						            <div>
	              <ol style="padding-left: 16px;margin: 4px;cursor: pointer;">
	              </ol>
	            </div>`).appendTo(_document.body);

                        let div = $(`<div id='_videoNote' style='` + (isSon ? 'height: 100%;width: 100%;' : 'height: 400px;width:300px;') + `border: 3px solid black;background-color: #fff;'>
				            <div id="_rightMenu" style="display:none; width: fit-content;position: absolute;background: rgba(0, 0, 0, .4);z-index: 9999999999;color: white;">
				              <ol style="padding: 0;margin: 4px;list-style: none;cursor: pointer;">
				                <li data-action="insertPos"><i class="fa fa-plus" style="margin-right: 5px"></i>插入播放位置</li>
				                <li data-action="deletePos"><i class="fa fa-minus-square" style="margin-right: 5px"></i>删除位置</li>
				                <li data-action="capture"><i class="fa fa-camera" style="margin-right: 5px"></i>截图</li>
				              </ol>
				            </div>

				            <div id="_videoNote_title" style="width: 100%;display: block;padding: 10px;"><span></span><b>笔记</b><i class="fa fa-times fa-lg" style="` + (isSon ? 'display:none;' : '') + `position: absolute;right: 5px;" aria-hidden="true" onclick="$('#_videoNote').hide();saveNote();"></i></div>
				            <div>
				              <div id="toolbar-container" class="toolbar"></div>
				              <div>
				                <button id="_switchBtn" style="width: 100%;" onclick="switchNoteBtns(this);">↓</button>
				              </div>
				              <div id="_text-container" class="text"></div>
				            </div>
				          </div>
	          		  `).appendTo(_document.body);

                        editor = new _window.wangEditor("#toolbar-container", "#_text-container");
                        //_window.editor = editor;
                        editor.config.excludeMenus = [
                            'lineHeight',
                            'undo',
                            'indent'
                        ];
                        editor.config.onchange = function(newHtml) {
                            let changed = newHtml != _lastSaved;
                            $('#_videoNote_title span').html(changed ? '*' : '');
                        };
                        editor.create();

                        if (!isSon) {
                            new MyDrag(_document.querySelector('#_videoNote'), {
                                handle: _document.querySelector('#_videoNote_title'),
                                right: 10,
                                bottom: 10,
                                position: 'fixed',
                                limit: false
                            });

                        }

                        unsafeWindow.readNoteData = () => {
                            let data = GM_getValue(location.href);
                            console.log(location.href, data);
                            if (data && data.content) {
                                $('#_videoNote_title b').html(data.title);
                                editor.txt.setJSON(data.content);
                                _lastSaved = editor.txt.html();
                            } else {
                                editor.txt.clear();
                                console.log(unsafeWindow.document.title);
                                $('#_videoNote_title b').html(''); // 先清空.
                            }
                        }



                        // event 
                        $(_document).on('click', '[data-action]', (e) => {
                            let src = $(e.target);
                            var hide = true;
                            switch (src.attr('data-action')) {
                                case 'capture':
                                    var captureImage = function() {
                                        var canvas = _document.createElement("canvas");
                                        canvas.width = _video.videoWidth;
                                        canvas.height = _video.videoHeight;
                                        canvas.getContext('2d')
                                            .drawImage(_video, 0, 0, canvas.width, canvas.height);
                                        return canvas.toDataURL();
                                    }

                                    let img = captureImage();
                                    editor.cmd.do('insertHTML', '<img src="' + img + '" style="width: 100%;height: auto;">');
                                    break;
                                case 'openNote':
                                    window.open(src.attr('data-value'));
                                    $('#_noteList').hide();
                                case 'setTime':
                                    _video.currentTime = src.attr('data-time');
                                    break;
                                case 'removeNote':
                                    let url = src.parent().attr('data-value');
                                    src.parent().remove();
                                    GM_deleteValue(url);
                                    break;
                                case 'insertPos':
                                    let time = _video.currentTime;
                                    editor.cmd.do('insertHTML', '<span>  </span><h5 data-action="setTime" title="' + time + '" data-time=' + time + '>▶    </h5><span>  </span>');
                                    editor.cmd.do('insertHTML', '');
                                    break;

                                case 'deletePos':
                                    if (_selectedDom) {
                                        _selectedDom.remove();
                                    }
                                    break;
                            }
                            if (hide) $('#_rightMenu').hide();
                        });

                        $('#_text-container')[0].addEventListener('contextmenu', (e) => {
                            let src = $(e.srcElement);
                            if (src.attr('data-time')) {
                                _selectedDom = src;
                                $('[data-action="insertPos"]').hide();
                                $('[data-action="deletePos"]').show();
                            } else {
                                $('[data-action="insertPos"]').show();
                                $('[data-action="deletePos"]').hide();
                            }

                            let par = $('#_text-container');
                            if ($('#_rightMenu').css('display') == 'none') {
                                var w = $('#_rightMenu').width();
                                var x = e.layerX + 10;
                                if (x + w > par.width()) {
                                    x = par.width() - w - 10;
                                }
                                var h = $('#_rightMenu').height();
                                var y = e.layerY + par[0].offsetTop + 10;
                                /* if (y + h > par.height()) {
                                     y = par[0].offsetTop + par[0].offsetHeight - h;
                                 }*/
                                $('#_rightMenu').css({
                                    left: x + 'px',
                                    top: y + 'px',
                                    display: 'block',
                                })
                            } else {
                                $('#_rightMenu').css('display', 'none');
                            }
                            e.preventDefault();
                        });

                        $('#_text-container')[0].addEventListener('keydown', (e) => {
                            if (e.ctrlKey && e.keyCode == 83) {
                                saveNote();
                                e.preventDefault();
                            }
                        });

                        // methods
                        _window.switchNoteBtns = (btn) => {
                            let show = _document.querySelector('.w-e-menu:nth-child(8)').style.display == 'none';
                            btn.innerHTML = show ? '↑' : '↓';
                            $('.w-e-menu:gt(6)').css('display', show ? 'unset' : 'none');
                            // 调整输入框高度
                            $('#_text-container').css('height', $('#_videoNote').height() - $('#_text-container')[0].offsetTop + 'px');
                        }
                        switchNoteBtns($('#_switchBtn')[0]);

                        _window.saveNote = () => {
                            _lastSaved = editor.txt.html();
                            $('#_videoNote_title span').html('');
                            if (_lastSaved != '') {
                                GM_setValue(location.href, {
                                    title: document.title,
                                    content: editor.txt.getJSON()
                                });
                            }
                        }

                        readNoteData();
                        //setInterval(() => {_window.saveNote();}, 5000);
                    }

                });
            }
        }, 1000);
    }
})();