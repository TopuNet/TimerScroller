/*
    日历弹层滚轮选择插件 v1.0.4
    npm install TopuNet-CalendarScroller
    高京
    2016-09-23
*/

var CalendarScroller_func = function() {
    return {
        Paras: null,
        init: function(opt) {
            var _this = this;
            var dt = new Date();
            var opt_default = {
                data: {
                    year: [2016, 2017, 2018, 2019, 2020, 2021, 2022], // 年列表
                    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 月列表
                    day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], // 日列表
                    default_year: dt.getFullYear(), //默认年
                    default_month: dt.getMonth() + 1, //默认月
                    default_day: dt.getDate() // 默认日
                },
                // 点击确定的回调。确定时系统自动调用resetAll()重置
                callback_confirm: function() {
                    /*
                        result={
                            title: window_calendar_title.text(),
                            year: 0,
                            month: 0,
                            day: 0
                        }
                    */
                },
                // 点击取消的回调。取消时系统自动调用resetAll()重置
                callback_cancel: function() {

                    _this.close.apply(_this);
                    // _this.resetAll.apply(_this);

                    // setTimeout(function() {
                    //     _this.showLayer.apply(_this);
                    // }, 1000);
                }
            };

            var opt_data_default = opt_default.data; // 解决data内部分参数不传值的问题
            this.Paras = $.extend(opt_default, opt);
            this.Paras.data = $.extend(opt_data_default, this.Paras.data);

            // 创建弹层DOM
            // this.createDom.apply(this);

            // setTimeout(function() {
            //     _this.showLayer.apply(_this);
            // }, 1000);
        },
        // 创建弹层DOM
        createDom: function() {
            // 半透明背景层
            window.dom_bg = $(document.createElement("section"))
                .css("width", "100vw")
                .css("height", "100vh")
                .css("background", "rgba(0,0,0,.5)")
                .css("display", "none")
                .css("position", "fixed")
                .css("top", "0")
                .css("left", "0");
            $("body").append(window.dom_bg);

            // 日历框
            window.dom_calendar = $(document.createElement("div"))
                .css("width", "70vw")
                .css("height", "79.2vw")
                .css("background", "#fff")
                .css("position", "absolute")
                .css("border-radius", "5px")
                .css("top", "40%")
                .css("margin-top", "-28.3vw")
                .css("left", "50%")
                .css("margin-left", "-35vw");
            window.dom_bg.append(window.dom_calendar);

            // 日历滚轮盒
            window.dom_calendar_panel = $(document.createElement("div"))
                .addClass("calendar_panel")
                .css("position", "relative")
                .css("height", "55vw");
            window.dom_calendar.append(window.dom_calendar_panel);

            // 滚轮内横线背景
            var canvas_bg_line = document.createElement("canvas");
            canvas_bg_line.width = 1;
            canvas_bg_line.height = $(window).width() * 0.11;
            var ctx = canvas_bg_line.getContext("2d");
            ctx.strokeStyle = "rgb(23,181,228)";
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

            // 滚轮-年
            window.dom_calendar_ul_year_box = $(document.createElement("div"))
                .addClass("calendar_ul_year_box")
                .css("width", "17vw")
                .css("height", "55vw")
                .css("overflow", "hidden")
                .css("background", "url(" + canvas_bg_line.toDataURL("image/png", 100) + ") repeat-x center left")
                .css("position", "absolute")
                .css("top", "0vw")
                .css("left", "5.6vw");
            window.dom_calendar_panel.append(window.dom_calendar_ul_year_box);
            window.dom_calendar_ul_year = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.dom_calendar_ul_year_box.append(window.dom_calendar_ul_year);

            // 滚轮-月
            window.dom_calendar_ul_month_box = window.dom_calendar_ul_year_box.clone();
            window.dom_calendar_ul_month_box
                .removeClass()
                .addClass("calendar_ul_month_box")
                .css("width", "8vw")
                .css("left", "35.5vw")
                .children().remove();
            window.dom_calendar_panel.append(window.dom_calendar_ul_month_box);
            window.dom_calendar_ul_month = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.dom_calendar_ul_month_box.append(window.dom_calendar_ul_month);

            // 滚轮-日
            window.dom_calendar_ul_day_box = window.dom_calendar_ul_month_box.clone();
            window.dom_calendar_ul_day_box
                .removeClass()
                .addClass("calendar_ul_day_box")
                .css("left", "57vw")
                .children().remove();
            window.dom_calendar_panel.append(window.dom_calendar_ul_day_box);
            window.dom_calendar_ul_day = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.dom_calendar_ul_day_box.append(window.dom_calendar_ul_day);

            // 滚轮遮罩
            // window.dom_calendar_ul_mask = $(document.createElement("div"))
            //     .css("width", "70vw")
            //     .css("height", "52.5vw")
            //     .css("position", "absolute")
            //     .css("top", "0")
            //     .css("left", "0")
            //     .css("background", "rgba(255,255,255,.5");
            // window.dom_calendar_panel.append(window.dom_calendar_ul_mask);
            // window.dom_calendar_panel.on

            // 底部按钮
            window.dom_bottom_button_ul = $(document.createElement("ul"))
                .css("list-style", "none")
                .css("padding", 0)
                .css("margin", 0);
            window.dom_calendar.append(window.dom_bottom_button_ul);

            // 底部按钮-确定
            window.dom_bottom_button_confirm = $(document.createElement("li"))
                .css("float", "left")
                .css("width", "50%")
                .css("height", "11.5vw")
                .css("line-height", "12vw")
                .css("color", "rgb(23,181,228)")
                .css("font-size", "4.5vw")
                .css("text-align", "center")
                .css("border-top", "solid 1px #dbdbdb")
                .css("border-right", "solid 1px #dbdbdb")
                .text("确定");
            window.dom_bottom_button_ul.append(window.dom_bottom_button_confirm);

            // 底部按钮-取消
            window.dom_bottom_button_cancel = window.dom_bottom_button_confirm.clone();
            window.dom_bottom_button_cancel
                .css("border-right", "none")
                .css("width", "49%")
                .text("取消");
            window.dom_bottom_button_ul.append(window.dom_bottom_button_cancel);
        },
        // 插入日历中的li和title
        insertDom_li: function() {

            // title
            window.dom_calendar_title = $(document.createElement("div"))
                .css("height", "12vw")
                .css("line-height", "12vw")
                .css("font-size", "4.5vw")
                .css("color", "rgb(23,181,228)")
                .css("text-align", "center")
                .css("border-bottom", "solid 1px rgb(23,181,228)")
                .text(this.getTitleDefault());
            window.dom_calendar.prepend(window.dom_calendar_title);

            // 日期选项
            window.dom_calendar_li = $(document.createElement("li"))
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
            len = this.Paras.data.year.length;
            for (; i < len; i++) {
                _obj = window.dom_calendar_li.clone();
                _obj.text(this.Paras.data.year[i]);
                window.dom_calendar_ul_year.append(_obj);
            }

            i = 0;
            len = this.Paras.data.month.length;

            for (; i < len; i++) {
                _obj = window.dom_calendar_li.clone();
                _obj.text(this.Paras.data.month[i]);
                window.dom_calendar_ul_month.append(_obj);
            }

            i = 0;
            len = this.Paras.data.day.length;

            for (; i < len; i++) {
                _obj = window.dom_calendar_li.clone();
                _obj.text(this.Paras.data.day[i]);
                window.dom_calendar_ul_day.append(_obj);
            }

            i = 0;
            len = 2;
            for (; i < len; i++) {
                _obj = window.dom_calendar_li.clone();
                window.dom_calendar_ul_year.prepend(_obj);
                _obj = window.dom_calendar_li.clone();
                window.dom_calendar_ul_year.append(_obj);
                _obj = window.dom_calendar_li.clone();
                window.dom_calendar_ul_month.prepend(_obj);
                _obj = window.dom_calendar_li.clone();
                window.dom_calendar_ul_month.append(_obj);
                _obj = window.dom_calendar_li.clone();
                window.dom_calendar_ul_day.prepend(_obj);
                _obj = window.dom_calendar_li.clone();
                window.dom_calendar_ul_day.append(_obj);
            }
        },
        // 设置滚动
        setJroll: function() {
            var _this = this;

            var setting = (function() {
                return function(obj, box_selector, Callback_success) {

                    // 重置标题
                    window.dom_calendar_title.text(_this.getTitleDefault());

                    var opt = {
                        id: "JRoll_" + obj,
                        scroller: box_selector + " ul",
                    };
                    var _obj;
                    eval("_obj = window." + opt.id + " = new JRoll(box_selector, opt);");

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
            setting("year", "div.calendar_ul_year_box", function(jroll) {
                var index = _this.Paras.data.year.indexOf(_this.Paras.data.default_year);
                scrollToDefaultPosition(jroll, index);
            });
            setting("month", "div.calendar_ul_month_box", function(jroll) {
                var index = _this.Paras.data.month.indexOf(_this.Paras.data.default_month);
                scrollToDefaultPosition(jroll, index);
            });
            setting("day", "div.calendar_ul_day_box", function(jroll) {
                var index = _this.Paras.data.day.indexOf(_this.Paras.data.default_day);
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
            var modified = this.setTitle.apply(this, [-1 * shift_li_count, kind]);

            // 如果是修改了日期(kind=="day"时)或发生回弹，则不再调正。
            if ((modified && kind == "day") || jroll_obj.y === 0 || jroll_obj.y == -1 * ($(jroll_obj.scroller).height() - window.dom_calendar_panel.height()))
                return;

            // 滚动调正
            jroll_obj.scrollTo(0, shift_li_count * this.calendar_li_height_px, 200);
        },
        // 获得选定日期，修改标题
        setTitle: function(index, kind) {
            var title_arr = window.dom_calendar_title.text().split('-');
            switch (kind) {
                case "year":
                    title_arr[0] = this.Paras.data.year[index].toString();
                    break;
                case "month":
                    title_arr[1] = this.Paras.data.month[index].toString();
                    if (title_arr[1].length === 1)
                        title_arr[1] = "0" + title_arr[1];
                    break;
                case "day":
                    title_arr[2] = this.Paras.data.day[index].toString();
                    if (title_arr[2].length === 1)
                        title_arr[2] = "0" + title_arr[2];
                    break;
            }
            return this.validDate.apply(this, [title_arr]);
        },
        // 监听确定和取消的点击
        buttonListener: function() {
            var _this = this;
            window.dom_bottom_button_confirm.unbind().on("touchstart mousedown", function(e) {
                e.preventDefault();
                var result = {
                    title: window.dom_calendar_title.text(),
                    year: 0,
                    month: 0,
                    day: 0
                };
                var title_arr = result.title.split('-');
                result.year = parseInt(title_arr[0]);
                result.month = parseInt(title_arr[1]);
                result.day = parseInt(title_arr[2]);

                _this.resetAll.apply(_this);

                _this.Paras.callback_confirm(result);
            });
            window.dom_bottom_button_cancel.unbind().on("touchstart mousedown", function(e) {
                e.preventDefault();

                _this.resetAll.apply(_this);
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

            window.dom_calendar_panel.find("li").remove();
            if (window.dom_calendar_title) {
                window.dom_calendar_title.remove();
            }

            this.init.apply(this, [opt]);
            this.insertDom_li.apply(this);

            window.dom_bg.fadeIn(500, function() {

                $(window).on("touchmove", _this.window_scroll_prevent);

                // li高度
                _this.calendar_li_height_px = window.dom_calendar_ul_year.find("li").css("height").replace("vw", "") * $(window).width() / 100;

                // 设置滚动
                // _this.resetAll.apply(_this);
                _this.setJroll.apply(_this);

                // 监听底部按钮
                _this.buttonListener.apply(_this);
            });
        },
        // 关闭弹层
        close: function() {
            var _this = this;

            window.dom_bg.fadeOut(200);

            // 解除对窗口滚动的阻止
            $(window).unbind("touchmove", _this.window_scroll_prevent);
        },
        // 重置日历到初始状态
        resetAll: function() {
            if (window.JRoll_year) {

                window.JRoll_year.scrollTo(0, 0, 200);
                window.JRoll_month.scrollTo(0, 0, 200);
                window.JRoll_day.scrollTo(0, 0, 200);

                window.JRoll_year.destroy();
                window.JRoll_month.destroy();
                window.JRoll_day.destroy();
            }
            // this.setJroll.apply(this);
        },
        // 根据Paras获得初始日期标题串
        getTitleDefault: function() {
            var year_index = this.Paras.data.year.indexOf(this.Paras.data.default_year);
            if (year_index === -1)
                year_index = 0;
            var month_index = this.Paras.data.month.indexOf(this.Paras.data.default_month);
            if (month_index === -1)
                month_index = 0;
            var day_index = this.Paras.data.day.indexOf(this.Paras.data.default_day);
            if (day_index === -1)
                day_index = 0;
            var title_year = this.Paras.data.year[year_index].toString();
            var title_month = this.Paras.data.month[month_index].toString();
            if (title_month.length === 1)
                title_month = "0" + title_month;
            var title_day = this.Paras.data.day[day_index].toString();
            if (title_day.length === 1)
                title_day = "0" + title_day;

            return title_year + "-" + title_month + "-" + title_day;
        },
        // 判断日期合法性
        validDate: function(title_arr) {
            var dt = new Date(title_arr[0] + "-" + title_arr[1] + "-" + title_arr[2]);

            var _setTitle = function() {
                window.dom_calendar_title.text(title_arr[0] + "-" + title_arr[1] + "-" + title_arr[2]);
            };
            if (dt.getDate() == title_arr[2]) {
                _setTitle();
                return false;
            }

            while (dt.getDate() != title_arr[2]) {
                dt = new Date(title_arr[0] + "-" + title_arr[1] + "-" + (--title_arr[2]));
            }
            var index = this.Paras.data.day.indexOf(parseInt(title_arr[2]));
            // console.log(index + ":" + title_arr[2]); 
            // console.dir(this.Paras.data.day);
            var _this = this;

            setTimeout(function() {
                window.JRoll_day.scrollTo(0, -1 * index * _this.calendar_li_height_px, 200);
            }, 200);
            _setTitle();
            return true;
        }
    };
};

var CalendarScroller = CalendarScroller_func();
CalendarScroller.createDom.apply(CalendarScroller);

if (typeof define === "function" && define.amd) {
    define(["lib/jroll.min"], function() {
        return CalendarScroller;
    });
}
