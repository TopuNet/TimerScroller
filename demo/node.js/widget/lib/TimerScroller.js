/*
    时间弹层滚轮选择插件 v1.1.3
    npm install TopuNet-TimerScroller
    高京
    2017-05-23
*/

var TimerScroller_func = function() {
    return {
        Paras: null,
        init: function(opt) {
            var _this = this;
            var dt = new Date();
            var opt_default = {
                data: {
                    hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // 小时列表
                    minute: [0, 15, 30, 45], // 分钟列表
                    default_hour: dt.getHours(), //默认小时
                    default_minute: 0, //默认分钟
                },
                // 点击确定的回调。
                /*
                    result = {
                        title: "12:30",
                        hour: 12,
                        minute: 30
                    }
                */
                callback_confirm: function(result) {

                },
                // 点击取消的回调。
                callback_cancel: function() {
                    _this.close.apply(_this);

                    // setTimeout(function() {
                    //     _this.showLayer.apply(_this);
                    // }, 1000);
                }
            };

            var opt_data_default = opt_default.data; // 解决data内部分参数不传值的问题
            this.Paras = $.extend(opt_default, opt);
            this.Paras.data = $.extend(opt_data_default, this.Paras.data);

            // console.dir(this.Paras);

            // 创建弹层DOM
            // this.createDom.apply(this);

            // setTimeout(function() {
            //     _this.showLayer.apply(_this);
            // }, 1000);
        },
        // 创建弹层DOM
        createDom: function() {
            // 半透明背景层
            window.TimerScroller_dom_bg = $(document.createElement("section"))
                .css("width", "100vw")
                .css("height", "100vh")
                .css("background", "rgba(0,0,0,.5)")
                .css("display", "none")
                .css("position", "fixed")
                .css("top", "0")
                .css("left", "0")
                .css("z-index", "6000");
            $("body").append(window.TimerScroller_dom_bg);

            // 时间框
            window.TimerScroller_dom_calendar = $(document.createElement("div"))
                .css("width", "70vw")
                .css("height", "79.2vw")
                .css("background", "#fff")
                .css("position", "absolute")
                .css("border-radius", "5px")
                .css("top", "40%")
                .css("margin-top", "-28.3vw")
                .css("left", "50%")
                .css("margin-left", "-35vw");
            window.TimerScroller_dom_bg.append(window.TimerScroller_dom_calendar);

            // 时间滚轮盒
            window.TimerScroller_dom_calendar_panel = $(document.createElement("div"))
                .addClass("calendar_panel")
                .css("position", "relative")
                .css("height", "55vw");
            window.TimerScroller_dom_calendar.append(window.TimerScroller_dom_calendar_panel);

            // 滚轮内横线背景
            var canvas_bg_line = document.createElement("canvas");
            canvas_bg_line.width = 1;
            canvas_bg_line.height = $(window).width() * 0.11;
            var ctx = canvas_bg_line.getContext("2d");
            ctx.strokeStyle = "rgb(0,0,0)";
            // ctx.strokeStyle = "#ff0000";
            ctx.moveTo(0, 0);
            ctx.lineTo(1, 0);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, canvas_bg_line.height);
            ctx.lineTo(1, canvas_bg_line.height);
            ctx.lineWidth = 2;
            ctx.stroke();

            // 滚轮-小时
            window.TimerScroller_dom_calendar_ul_hour_box = $(document.createElement("div"))
                .addClass("calendar_ul_hour_box")
                .css("width", "8vw")
                .css("height", "55vw")
                .css("overflow", "hidden")
                .css("background", "url(" + canvas_bg_line.toDataURL("image/png", 100) + ") repeat-x center left")
                .css("position", "absolute")
                .css("top", "0vw")
                .css("left", "20vw");
            window.TimerScroller_dom_calendar_panel.append(window.TimerScroller_dom_calendar_ul_hour_box);
            window.TimerScroller_dom_calendar_ul_hour = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.TimerScroller_dom_calendar_ul_hour_box.append(window.TimerScroller_dom_calendar_ul_hour);

            // 滚轮-分钟
            window.TimerScroller_dom_calendar_ul_minute_box = window.TimerScroller_dom_calendar_ul_hour_box.clone();
            window.TimerScroller_dom_calendar_ul_minute_box
                .removeClass()
                .addClass("calendar_ul_minute_box")
                .css("width", "8vw")
                .css("left", "40vw")
                .children().remove();
            window.TimerScroller_dom_calendar_panel.append(window.TimerScroller_dom_calendar_ul_minute_box);
            window.TimerScroller_dom_calendar_ul_minute = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.TimerScroller_dom_calendar_ul_minute_box.append(window.TimerScroller_dom_calendar_ul_minute);

            // 滚轮遮罩
            // window.TimerScroller_dom_calendar_ul_mask = $(document.createElement("div"))
            //     .css("width", "70vw")
            //     .css("height", "52.5vw")
            //     .css("position", "absolute")
            //     .css("top", "0")
            //     .css("left", "0")
            //     .css("background", "rgba(255,255,255,.5");
            // window.TimerScroller_dom_calendar_panel.append(window.TimerScroller_dom_calendar_ul_mask);
            // window.TimerScroller_dom_calendar_panel.on

            // 底部按钮
            window.TimerScroller_dom_bottom_button_ul = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.TimerScroller_dom_calendar.append(window.TimerScroller_dom_bottom_button_ul);

            // 底部按钮-取消
            window.TimerScroller_dom_bottom_button_cancel = $(document.createElement("li"))
                .css("float", "left")
                .css("width", "50%")
                .css("height", "11.5vw")
                .css("line-height", "12vw")
                .css("color", "rgb(180,180,180)")
                .css("font-size", "4.5vw")
                .css("text-align", "center")
                .css("border-top", "solid 1px #dbdbdb")
                .css("border-right", "solid 1px #dbdbdb")
                .text("取消");
            window.TimerScroller_dom_bottom_button_ul.append(window.TimerScroller_dom_bottom_button_cancel);

            // 底部按钮-确定
            window.TimerScroller_dom_bottom_button_confirm = window.TimerScroller_dom_bottom_button_cancel.clone();
            window.TimerScroller_dom_bottom_button_confirm
                .css("border-right", "none")
                .css("width", "49%")
                .css("color", "rgb(0,0,0)")
                .text("确定");
            window.TimerScroller_dom_bottom_button_ul.append(window.TimerScroller_dom_bottom_button_confirm);
        },
        // 插入时间中的li和title
        insertDom_li: function() {

            // title
            window.TimerScroller_dom_calendar_title = $(document.createElement("div"))
                .css("height", "12vw")
                .css("line-height", "12vw")
                .css("font-size", "4.5vw")
                .css("color", "rgb(0,0,0)")
                .css("text-align", "center")
                .css("border-bottom", "solid 1px rgb(0,0,0)")
                .text(this.getTitleDefault())
                .prependTo(window.TimerScroller_dom_calendar);

            // 时间选项
            window.TimerScroller_dom_calendar_li = $(document.createElement("li"))
                .css("height", "11vw")
                .css("line-height", "11vw")
                .css("text-align", "center")
                .css("font-size", "6vw")
                .css("margin", 0)
                .css("padding", 0)
                .css("border", 0)
                // .css("border","solid 1px #ff0000")
                .css("color", "rgb(0,0,0)");
            var i, len, _obj;

            i = 0;
            len = this.Paras.data.hour.length;
            var _str = "";
            for (; i < len; i++) {
                _str = "";
                _obj = window.TimerScroller_dom_calendar_li.clone();
                if (this.Paras.data.hour[i] < 10)
                    _str += "0";
                _str += this.Paras.data.hour[i];
                _obj.text(_str)
                    .appendTo(window.TimerScroller_dom_calendar_ul_hour);
            }

            i = 0;
            len = this.Paras.data.minute.length;

            for (; i < len; i++) {
                _str = "";
                _obj = window.TimerScroller_dom_calendar_li.clone();
                if (this.Paras.data.minute[i] < 10)
                    _str += "0";
                _str += this.Paras.data.minute[i];
                _obj.text(_str)
                    .appendTo(window.TimerScroller_dom_calendar_ul_minute);
            }

            i = 0;
            len = 2;
            for (; i < len; i++) {
                _obj = window.TimerScroller_dom_calendar_li.clone()
                    .prependTo(window.TimerScroller_dom_calendar_ul_hour);
                _obj = window.TimerScroller_dom_calendar_li.clone()
                    .appendTo(window.TimerScroller_dom_calendar_ul_hour);

                _obj = window.TimerScroller_dom_calendar_li.clone()
                    .prependTo(window.TimerScroller_dom_calendar_ul_minute);
                _obj = window.TimerScroller_dom_calendar_li.clone()
                    .appendTo(window.TimerScroller_dom_calendar_ul_minute);
            }
        },
        // 设置滚动
        setJroll: function() {
            var _this = this;

            var setting = (function() {
                return function(obj, box_selector, Callback_success) {

                    // 重置标题
                    window.TimerScroller_dom_calendar_title.text(_this.getTitleDefault());

                    var opt = {
                        id: "JRoll_" + obj,
                        scroller: box_selector + " ul",
                    };
                    var _obj;
                    eval("_obj = window.TimerScroller_" + opt.id + " = new JRoll(box_selector, opt);");

                    _obj.on("scrollEnd", function() {
                        _this.scrollEndAmend.apply(_this, [this, obj]);
                    });

                    if (Callback_success)
                        Callback_success(_obj);
                };
            })();
            // 滚动到初始位置
            var scrollToDefaultPosition = function(jroll, index) {
                var finish_point = index * _this.calendar_li_height_px * -1;
                jroll.scrollTo(0, finish_point, 200);
            };
            setting("hour", "div.calendar_ul_hour_box", function(jroll) {
                var index = _this.Paras.data.hour.indexOf(_this.Paras.data.default_hour);
                scrollToDefaultPosition(jroll, index);
            });
            setting("minute", "div.calendar_ul_minute_box", function(jroll) {
                var index = _this.Paras.data.minute.indexOf(_this.Paras.data.default_minute);
                scrollToDefaultPosition(jroll, index);
            });
        },
        // 滚动结束后的调正
        scrollEndAmend: function(jroll_obj, kind) {

            // 相对于页面加载后的初始状态，移动了多少个li，余数忽略
            var shift_li_count = parseInt(jroll_obj.y / this.calendar_li_height_px);

            // px余数的绝对值
            var shift_mod_px = jroll_obj.y % this.calendar_li_height_px;
            if (shift_mod_px < 0)
                shift_mod_px *= -1;

            // 如果余数的绝对值大于li的一半，则增加li的移动数
            if (shift_mod_px >= this.calendar_li_height_px / 2)
                shift_li_count--;

            // 修改标题
            this.setTitle.apply(this, [-1 * shift_li_count, kind]);

            // 如果是修改了日期(kind=="day"时)或发生回弹，则不再调正。
            if (jroll_obj.y === 0 || jroll_obj.y == -1 * ($(jroll_obj.scroller).height() - window.TimerScroller_dom_calendar_panel.height()))
                return;

            // 滚动调正
            jroll_obj.scrollTo(0, shift_li_count * this.calendar_li_height_px, 200);
        },
        // 获得选定日期，修改标题
        setTitle: function(index, kind) {
            var title_arr = window.TimerScroller_dom_calendar_title.text().split(' : ');
            switch (kind) {
                case "hour":
                    title_arr[0] = this.Paras.data.hour[index].toString();
                    if (title_arr[0].length === 1)
                        title_arr[0] = "0" + title_arr[0];
                    break;
                case "minute":
                    title_arr[1] = this.Paras.data.minute[index].toString();
                    if (title_arr[1].length === 1)
                        title_arr[1] = "0" + title_arr[1];
                    break;
            }

            window.TimerScroller_dom_calendar_title.text(title_arr[0] + " : " + title_arr[1]);

        },
        // 监听确定和取消的点击
        buttonListener: function() {
            var _this = this;
            window.TimerScroller_dom_bottom_button_confirm.unbind().on("touchstart mousedown", function(e) {
                e.preventDefault();
                var result = {
                    title: window.TimerScroller_dom_calendar_title.text().replace(" : ", ":"),
                    hour: 0,
                    minute: 0,
                };
                var title_arr = result.title.split(':');
                result.hour = parseInt(title_arr[0]);
                result.minute = parseInt(title_arr[1]);

                if(!_this.Paras.callback_confirm_dont_reset_all)

                _this.Paras.callback_confirm(result);
            });
            window.TimerScroller_dom_bottom_button_cancel.unbind().on("touchstart mousedown", function(e) {
                e.preventDefault();
                _this.Paras.callback_cancel.apply(_this);
            });
        },
        // 阻止窗口背景层滚动（弹层时阻止，关闭层时恢复）
        window_scroll_prevent: function(e) {
            e.preventDefault();
        },
        // 显示弹层
        show: function(opt) {
            var _this = this;



            window.TimerScroller_dom_calendar_panel.find("li").remove();
            if (window.TimerScroller_dom_calendar_title) {
                window.TimerScroller_dom_calendar_title.remove();
            }

            this.init.apply(this, [opt]);
            this.insertDom_li.apply(this);

            window.TimerScroller_dom_bg.fadeIn(500, function() {

                $(this).on("touchmove", _this.window_scroll_prevent);

                // li高度
                //_this.calendar_li_height_px = window.TimerScroller_dom_calendar_ul_hour.find("li").css("height").replace("vw", "") * $(window).width() / 100;
                _this.calendar_li_height_px = window.TimerScroller_dom_calendar_ul_hour.find("li").get(0).style.height.replace("vw", "") * $(window).width() / 100;

                // 设置滚动
                // _this.resetAll.apply(_this);
                _this.setJroll.apply(_this);

                // 监听底部按钮
                _this.buttonListener.apply(_this);
            });
        },
        // 关闭弹层，调用resetAll()重置jroll对象
        close: function() {
            var _this = this;

            window.TimerScroller_dom_bg.fadeOut(200);

            // 解除对窗口滚动的阻止
            $(window).unbind("touchmove", _this.window_scroll_prevent);

            // 重置jroll对象
            _this.resetAll.apply(_this);
        },
        // 重置时间到初始状态
        resetAll: function() {
            if (window.TimerScroller_JRoll_hour) {

                window.TimerScroller_JRoll_hour.scrollTo(0, 0, 200);
                window.TimerScroller_JRoll_minute.scrollTo(0, 0, 200);

                window.TimerScroller_JRoll_hour.destroy();
                window.TimerScroller_JRoll_minute.destroy();
            }
            // this.setJroll.apply(this);
        },
        // 根据Paras获得初始日期标题串
        getTitleDefault: function() {
            var hour_index = this.Paras.data.hour.indexOf(this.Paras.data.default_hour);
            if (hour_index === -1)
                hour_index = 0;
            var minute_index = this.Paras.data.minute.indexOf(this.Paras.data.default_minute);
            if (minute_index === -1)
                minute_index = 0;
            var title_hour = this.Paras.data.hour[hour_index].toString();
            if (title_hour.length === 1)
                title_hour = "0" + title_hour;
            var title_minute = this.Paras.data.minute[minute_index].toString();
            if (title_minute.length === 1)
                title_minute = "0" + title_minute;

            return title_hour + " : " + title_minute;
        }
    };
};

var TimerScroller = TimerScroller_func();
TimerScroller.createDom.apply(TimerScroller);

if (typeof define === "function" && define.amd) {
    define(["lib/jroll.min"], function() {
        return TimerScroller;
    });
}
