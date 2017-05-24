# 移动端时间弹层滚轮选择插件 v1.1.1
### 安装：npm install TopuNet-TimerScroller

文件结构：
-------------
        1. widget/lib/*.js 放入项目文件夹jq（原生规范）或widget/lib（AMD规范）中

页面引用：
-------------
原生引用

        1. 页面底端引用 最新版 Jquery.min.js#1.x.x 或 zepto.min.js
        2. 后引用 /jq/jroll.min.js
        3. 后引用 /jq/TimerScroller.js

requireJS引用

        依赖TimerScroller.js，成功后返回对象TimerScroller
        默认依赖zepto，/dist/TimerScroller.js最下面的define可以改为jquery.min.js#1.x.x

功能配置及启用：
--------------
1. 显示弹层：

        var opt = {
            data: {
                hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], //小时列表
                minute: [0, 15, 30, 45], // 分钟列表
                default_hour: dt.getHours(), //默认小时
                default_minute: 0, //默认分钟
            },
            // 点击确定的回调。确定时系统自动调用resetAll()重置
            /*
                result = {
                    title: window_calendar_title.text().replace(" : ",":"),
                    hour: 0,
                    minute: 0
                }
            */
            callback_confirm: function(result) {
                console.dir(result);
                TimerScroller.close();

                // Do Sth.
            },
            // 点击取消的回调。取消时系统自动调用resetAll()重置
            callback_cancel: function() {
                TimerScroller.close();
            }
        };

        TimerScroller.show(opt);

2. 关闭弹层：
        
        TimerScroller.close();

3. 重置滚轮：

        TimerScroller.resetAll();

更新日志：
-------------
v1.1.1

        制作、发布
        
