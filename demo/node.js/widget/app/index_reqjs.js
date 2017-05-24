define(["lib/TimerScroller", "lib/zepto.min"], function($TimerScroller) {
    var index = {
        init: function() {

            // 监听div点击
            this.div_click_listener.apply(this);
        },
        // 监听div点击
        div_click_listener: function() {
            $("div.date_div").on("touchstart mousedown", function(e) {
                e.preventDefault();
                var date_default = {
                hour: 12,
                minute: 30
            };
            if ($(this).text() != "点我") {
                var _date = $(this).text().split(':');
                date_default.hour = ~~_date[0];
                date_default.minute = ~~_date[1];
            }
            var opt = {
                data: {
                    hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // 小时列表
                    minute: [0, 15, 30, 45], // 分钟列表
                    default_hour: date_default.hour, //默认小时
                    default_minute: date_default.minute, //默认分钟
                },
                // 点击确定的回调。确定时系统自动调用resetAll()重置
                /*
                    result = {
                        title: 12 : 30,
                        houre: 12,
                        minute: 30,
                    }
                */
                callback_confirm: function(result) {
                    console.dir(result);
                    $("div.date_div").text(result.title);
                    $TimerScroller.close();
                },
                // 点击取消的回调。取消时系统自动调用resetAll()重置
                callback_cancel: function() {
                    $TimerScroller.close();
                }
            };
                $TimerScroller.show(opt);
            });
        }
    };

    return index;
});
