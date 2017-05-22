# 移动端日历弹层滚轮选择插件 v1.0.4
### 安装：npm install TopuNet-CalendarScroller

文件结构：
-------------
        1. widget/lib/*.js 放入项目文件夹jq（原生规范）或widget/lib（AMD规范）中

页面引用：
-------------
原生引用

        1. 页面底端引用 最新版 Jquery.min.js#1.x.x 或 zepto.min.js
        2. 后引用 /jq/jroll.min.js
        3. 后引用 /jq/CalendarScroller.js

requireJS引用

        依赖CalendarScroller.js，成功后返回对象CalendarScroller
        默认依赖zepto，/dist/CalendarScroller.js最下面的define可以改为jquery.min.js#1.x.x

功能配置及启用：
--------------
1. 显示弹层：

        var opt = {
            data: {
                year: [2016, 2017, 2018, 2019, 2020, 2021, 2022], // 年列表，数组。无默认值
                month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 月列表，数组。默认[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], // 日列表，数组。默认[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                default_year: 2018, // 初始年，默认今年
                default_month: 3, // 初始月，默认今月
                default_day: 15 // 初始日，默认今日
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
                CalendarScroller.close();

                // Do Sth.
            },
            // 点击取消的回调。取消时系统自动调用resetAll()重置
            callback_cancel: function() {
                CalendarScroller.close();
            }
        };

        CalendarScroller.show(opt);

2. 关闭弹层：
        
        CalendarScroller.close();

3. 重置日历：

        CalendarScroller.resetAll();

更新日志：
-------------
v1.0.4

        修改bug：根据Paras获得初始日期标题串不对

v1.0.3

        修改bug：ios下，弹层后不能阻止窗口背景层的滚动

v1.0.2

        修改bug：当默认的年/月/日不存在于列表中时，默认为第1行数据

v1.0.1

        制作、发布
        
