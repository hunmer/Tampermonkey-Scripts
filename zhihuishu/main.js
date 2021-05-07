// ==UserScript==
// @name        智慧树考试答题
// @namespace   Violentmonkey Scripts
// @match       https://hiexam.zhihuishu.com/atHomeworkExam/*
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      -
// @require     https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @description 2021/4/19下午4:34:55
// ==/UserScript==

(function() {
    var _data = GM_getValue('data', {});
    $('body').append(
        `<div style="margin: 0px auto; z-index: 999999;position: fixed;right: 10px;bottom: 0px;width: 300px;background-color: rgba(0, 0, 0, .4);padding: 10px;">
    <textarea id="input" style=" width: 100%"></textarea>
    </hr>
    <div style="width: 100%; text-align: center;margin:10px">
        <button style="width: 80%;" onclick="_search()">查题</button>
    </div>
    <textarea id="res" style="width: 100%"></textarea>
</div>`
    );
    var g_q;
    setInterval(() => {
        //let q = $('.questionContent').html().replace('（&nbsp;）', '').replace('(&nbsp;)', '');
        let q = getLeft($('.questionContent').html().replace('（', ''), '(');
        if (q != g_q) {
            g_q = q;
            $('#input').val(q);
            _search();
        }
    }, 1000);

    function getSlimar(s1, s2) {
        var cnt = 0;
        for (let i1 = 0; i1 < s1.length; i1++) {
            if (s2.indexOf(s1[i1]) != -1) {
                cnt++;
            }
        }
        return cnt / s1.length;
    }

    function getLeft(str, search) {
        let start = str.indexOf(search);
        if (start != -1) {
            return str.substr(0, start);
        }
        return '';
    }

    unsafeWindow._search = () => {

        var inputAnswer = (answer) => {
            $('.questionBox .el-radio__label').each((i, d) => {
                var a = $(d).find('.optionContent').html().replace('&nbsp;', '');
                console.log(a);
                if (getSlimar(a, answer) > 0.75) {
                    d.click()
                    $('.Nextbtndiv span')[1].click();
                    return false;
                }
            });
        }
        var question = $('#input').val();
        if (_data[question] != undefined) {
            inputAnswer(_data[question]);
        } else {
            GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://cx.icodef.com/wyn-nb?v=2',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: 'question=' + encodeURIComponent(question),
                onload: function(xhr) {
                    if (xhr.status == 200) {
                        var obj = $.parseJSON(xhr.responseText.replace(/^操作数据失败！/, '')) || {};
                        if (obj.code) {
                            _data[question] = obj.data;
                            GM_setValue('data', _data);
                            $('#res').val(obj.data);
                            inputAnswer(obj.data);
                        }
                    }
                }
            });
        }
    }

})()