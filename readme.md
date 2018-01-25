# 移动端时间弹层滚轮选择插件 v1.1.3
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
            // 点击确定的回调。
            /*
                result = {
                    title: "12:30",
                    hour: 12,
                    minute: 30
                }
            */
            callback_confirm: function(result) {
                console.dir(result);
                TimerScroller.close();

                // Do Sth.
            },
            // 点击取消的回调。
            callback_cancel: function() {
                TimerScroller.close();
            }
        };

        TimerScroller.show(opt);

2. 关闭弹层，自动调用resetAll()重置jroll对象：
        
        TimerScroller.close();

3. 重置滚轮：

        TimerScroller.resetAll();

更新日志：
-------------
v1.1.3

        1. 确定和取消的回调不再自动调用resetAll()，在close()中自动调用resetAll()。

v1.1.2

        1. 修改了一个偶发性bug。
        2. 修改了弹层后没有很好的屏蔽document.on("touchmove")的bug
        3. 修改了按钮样式——调换“确定”和“取消”，将“取消”调灰

v1.1.1

        制作、发布
        
