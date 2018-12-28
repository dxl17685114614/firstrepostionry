$(function () {

    //点击获取验证码按钮时的逻辑
    // 1 获取手机号码 合法性的验证
    // 2 不通过 给出一个提示 不再往下执行
    // 3 通过 
    // 4 获取手机号码 发送请求或者验证码 
    // 5 成功获取之后 
    //   1 禁用按钮 不让再去点击 disabled 
    //   2 开启定时器 60s
    //     1 把倒计时的时间放大按钮上 让用户看到 修改按钮的文本
    //     2 时间到了
    //       清除定时器
    //       重置的按钮的文本
    //       重新启用按钮 
   
   

 //点击获取验证码和注册按钮时的逻辑

    function Getverificationcode() {
          //获取验证码
        $('#code_btn').on('tap', function () {
            var mobile_value1 = $("[name='mobile']").val().trim()
            if (checkPhone(mobile_value1)) {
                //如果手机号合格//那就发送请求

                $.post('users/get_reg_code', {
                    mobile: mobile_value1
                }, function (result) {
                    console.log(result);
                    if (result.meta.status == 200) {
                        $("[name='code']").val(result.data)
                        //禁用按钮一分钟
                        $('#code_btn').attr('disabled', 'disabled')
                        var innertext = 60;
                        $('#code_btn').text(innertext + "s后再重新获取")

                        var time = setInterval(function () {
                            $('#code_btn').text(innertext + "s后再重新获取")

                            innertext--;
                            if (innertext == 0) {
                                clearInterval(time);
                                $('#code_btn').text('获取验证码')
                                $('#code_btn').removeAttr('disabled')
                            }
                        }, 1000)
                    }
                })


            } else {
                //如果手机号不合格
                mui.toast("请输入正确的手机号")
                console.log(mobile_value1)
            }
        })
         //注册提交
        $('#creat').on('tap', function () {
      
            var mobile_value = $("[name='mobile']").val().trim()
            var code_value = $("[name='code']").val().trim()
            var email_value = $("[name='email']").val().trim()
            var pwd_value = $("[name='pwd']").val().trim()
            var pwd2_value = $("[name='pwd2']").val().trim()
            var gender_value = $("[name='gender']").val().trim()    
            //判断邮箱是否正确
            if (!checkEmail(email_value)) {
                mui.toast("请输入有效的邮箱")
                return;
            }
            //粗略的对验证码做验证
            if (code_value.length != 4) {
                mui.toast("请输入正确的验证码")
                return;
            }

            //对密码也是粗略的做一下验证
            if (pwd_value.length < 6) {
                mui.toast("请输入正确的密码")
                return;
            }

            if (pwd2_value != pwd_value) {
                mui.toast("两次输入的密码不一致")
                return;
            }
            console.log("ok")
            // return;
            
            //如果上面的return都不触发 那就发送请求
            $.post('users/reg', {
                mobile: mobile_value,
                code: code_value,
                email: email_value,
                pwd: pwd_value,
                gender: gender_value,

            }, function (result) {
                console.log(result)
                if(result.meta.status==200){
                alert('注册成功')
                setTimeout(function(){
                  location.href=""
                },2000)   
              }

            })

          
        })
        
    }
   





    function init() {
        Getverificationcode()
        
    }
    init()
    //验证手机号码是否合格
    function checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }
  
    function checkEmail(myemail) {
        var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (myReg.test(myemail)) {
            return true;
        } else {
            return false;
        }
    }

})