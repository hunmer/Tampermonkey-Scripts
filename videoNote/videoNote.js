// ==UserScript==
// @name        video Note
// @namespace   Violentmonkey Scripts
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// @version     1.0
// @author      neysummer2000
// @description 2021/3/5 上午10:22:27
// ==/UserScript==

(function() {
    var _selectedDom;
    var _lastSaved = '';
    var _timer = setInterval(() => {
        _video = document.querySelector('video');
        if (_video) {
            clearInterval(_timer);

            function loadRes(files, callback) {
                var i = 0;
                for (var file of files) {
                    if (file.type == "js") {
                        var fileref = document.createElement('script');
                        fileref.setAttribute("type", "text/javascript");
                        fileref.setAttribute("src", file.url)
                    } else if (file.type == "css" || file.type == "cssText") {
                        var fileref = document.createElement("link");
                        fileref.setAttribute("rel", "stylesheet");
                        fileref.setAttribute("type", "text/css");
                        fileref.setAttribute("href", file.url)
                    }
                    document.getElementsByTagName("head")[0].appendChild(fileref).onload = function() {
                        if (++i == files.length) {
                            if (typeof callback == 'function') callback();
                        }
                    }
                }
            }

            loadRes([
                { url: "https://code.jquery.com/jquery-3.4.0.min.js", type: "js" },
                { url: "https://raw.githack.com/hunmer/hunmer.github.io/master/cdn/float-module/float-module.min.css", type: "css" },
                { url: "https://raw.githack.com/hunmer/hunmer.github.io/master/cdn/float-module/font-awesome.min.css", type: "css" },
                { url: "https://unpkg.com/wangeditor@4.6.8/dist/wangEditor.min.js", type: "js" },
                { url: "https://greasyfork.org/scripts/412159-mydrag/code/MyDrag.js?version=858320", type: "js" },
                { url: "https://greasyfork.org/scripts/401025-%E6%82%AC%E6%B5%AE%E8%8F%9C%E5%8D%95%E6%8C%89%E9%92%AE/code/%E6%82%AC%E6%B5%AE%E8%8F%9C%E5%8D%95%E6%8C%89%E9%92%AE.js?version=793227", type: "js" },
            ], () => {

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
                        icon: 'fa fa-pencil-square-o',
                        title: '笔记',
                        click: function() {
                            $('#_videoNote').toggle();
                        }
                    }, {
                        icon: 'fa fa-list-alt',
                        title: '笔记列表',
                        click: function() {}
                    }]
                });
                $('.fm-li').css("cssText", "right: 70px !important;bottom: 65px !important;");

                let div = $(`<div id='_videoNote' style='height: 400px;width:300px;border: 3px solid black;background-color: #fff;display:unset;'>
	            <div id="_rightMenu" style="display:none; width: fit-content;position: absolute;background: rgba(0, 0, 0, .4);z-index: 9999999999;">
	              <ol style="padding: 0;margin: 4px;list-style: none;cursor: pointer;">
	                <li data-action="insertPos"><i class="fa fa-plus" style="margin-right: 5px"></i>插入播放位置</li>
	                <li data-action="deletePos"><i class="fa fa-minus-square" style="margin-right: 5px"></i>删除位置</li>
	              </ol>
	            </div>
	            
	            <div id="_videoNote_title" style="width: 100%;display: block;padding: 10px;"><span></span><b>笔记</b><i class="fa fa-times fa-lg" style="position: absolute;right: 5;" aria-hidden="true" onclick="$('#_videoNote').hide();saveNote();"></i></div>
	            <div>
	              <div id="toolbar-container" class="toolbar"></div>
	              <div>
	                <button id="_switchBtn" style="width: 100%;" onclick="switchNoteBtns(this);">↓</button>
	              </div>
	              <div id="text-container" class="text"></div>
	            </div>
	          </div>
	            `).appendTo(document.body);

                const editor = new unsafeWindow.wangEditor("#toolbar-container", "#text-container");
                unsafeWindow.editor = editor;
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



                let data = GM_getValue(location.href);
                console.log(data);
                if (data && data.content) {
                    $('#_videoNote_title b').html(data.title == '' ? '笔记' : data.title);
                    editor.txt.setJSON(data.content);
                    _lastSaved = editor.txt.html();
                }

                new MyDrag(document.querySelector('#_videoNote'), {
                    handle: document.querySelector('#_videoNote_title'),
                    right: 10,
                    bottom: 10,
                    position: 'fixed'
                });


                // event 
                $(document).on('click', '[data-action]', (e) => {
                    let src = $(e.target);
                    var hide = true;
                    switch (src.attr('data-action')) {
                        case 'setTime':
                            _video.currentTime = src.attr('data-time');
                            break;
                        case 'insertPos':
                            insertPos();
                            break;

                        case 'deletePos':
                            if (_selectedDom) {
                                _selectedDom.remove();
                            }
                            break;
                    }
                    if (hide) $('#_rightMenu').hide();
                });

                $('#text-container')[0].addEventListener('contextmenu', (e) => {
                    let src = $(e.srcElement);
                    if (src.attr('data-time')) {
                        _selectedDom = src;
                        $('[data-action="insertPos"]').hide();
                        $('[data-action="deletePos"]').show();
                    } else {
                        $('[data-action="insertPos"]').show();
                        $('[data-action="deletePos"]').hide();
                    }

                    let par = $('#text-container');
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

                $('#text-container')[0].addEventListener('keydown', (e) => {
                    if (e.ctrlKey && e.keyCode == 83) {
                        saveNote();
                        e.preventDefault();
                    }
                });

                // methods
                unsafeWindow.switchNoteBtns = (btn) => {
                    let show = document.querySelector('.w-e-menu:nth-child(8)').style.display == 'none';
                    btn.innerHTML = show ? '↑' : '↓';
                    $('.w-e-menu:gt(6)').css('display', show ? 'unset' : 'none');
                    // 调整输入框高度
                    $('#text-container').css('height', $('#_videoNote').height() - $('#text-container')[0].offsetTop + 'px');
                }
                switchNoteBtns($('#_switchBtn')[0]);

                unsafeWindow.insertPos = (time) => {
                    if (!time) time = _video.currentTime;
                    editor.cmd.do('insertHTML', '<span>  </span><h5 data-action="setTime" title="' + time + '" data-time=' + time + '>▶    </h5><span>  </span>');
                }

                unsafeWindow.saveNote = () => {
                    _lastSaved = editor.txt.html();
                    $('#_videoNote_title span').html('');
                    GM_setValue(location.href, {
                        title: document.title,
                        content: editor.txt.getJSON()
                    });
                }

                //setInterval(() => {unsafeWindow.saveNote();}, 5000);

            });
        }
    }, 1000);

})();