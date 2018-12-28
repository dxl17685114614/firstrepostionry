$(function () {

    //点击登陆时的逻辑
    function login() {
        $('#login').on('tap', function () {
            //
            var username_txt = $("[name='username']").val().trim();
            var password_txt = $("[name='password']").val().trim();

            if (!checkPhone(username_txt)) {
                mui.toast("请输入正确的手机号码")
                return;
            }
            if (password_txt.length < 6) {
                // 非法
                mui.toast("密码不合法")
                return;
            }
            $.post('login', {
                username: username_txt,
                password: password_txt
            }, function (result) {

                if (result.meta.status == 200) {

                    mui.toast("登录成功");
                    //将返回的token值做个本机存储
                    sessionStorage.setItem("userinfom", JSON.stringify(result.data));
                    //跳转页面  默认首页 后面再根据之前跳转到登陆页面的状态做个处理

                    var pageurl = sessionStorage.getItem("pageurl");
                    // 判断有没有来源页面（会话存储中)
                    if (!pageurl) {
                        pageurl = "../index.html";
                    }
                    setTimeout(function () {
                        location.href = pageurl;
                    }, 1000);


                } else {
                    mui.toast(result.meta.msg);
                }
            })


        })
    }


    //工具函数
    function checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }

    function init() {
        login()
    }
    init()

})