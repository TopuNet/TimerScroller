var index = {
    init: function() {

        // 监听div点击
        this.div_click_listener.apply(this);
    },
    // 监听div点击
    div_click_listener: function() {
        $("div.date_div").on("touchstart", function() {
            var date_default = {
                year: 2018,
                month: 3,
                day: 15
            };
            if ($(this).text() != "点我") {
                var _date = $(this).text().split('-');
                date_default.year = ~~_date[0];
                date_default.month = ~~_date[1];
                date_default.day = ~~_date[2];
            }
            var opt = {
                data: {
                    year: [2016, 2017, 2018, 2019, 2020, 2021, 2022], // 年列表，数组。无默认值
                    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 月列表，数组。默认[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], // 日列表，数组。默认[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                    default_year: date_default.year, // 初始年，默认今年
                    default_month: date_default.month, // 初始月，默认今月
                    default_day: date_default.day // 初始日，默认今日
                },
                // 点击确定的回调。确定时系统自动调用resetAll()重置
                /*
                    result = {
                        title: 2017-01-01,
                        year: 2017,
                        month: 1,
                        day: 1
                    }
                */
                callback_confirm: function(result) {
                    console.dir(result);
                    $("div.date_div").text(result.title);
                    CalendarScroller.close();
                },
                // 点击取消的回调。取消时系统自动调用resetAll()重置
                callback_cancel: function() {
                    CalendarScroller.close();
                }
            };
            CalendarScroller.show(opt);
        });
    }
};
