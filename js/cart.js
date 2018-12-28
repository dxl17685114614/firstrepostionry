$(function () {

  /*
  1 权限控制 
        未登录 
          1 不能查看当前的页面
          2 顺便跳转到登录页面
            登录成功 要重新跳回来 
              设置 来源页面  会话存储中 设置key pageurl:当前的路径
         登录过了 正常的显示页面
    2 动态渲染
      1 发送请求获取数据
      2 渲染标签
    3 实现计算总价格的功能
      1 计算每一类的商品的单价 * 购买的数量（获取数字输入框值） 循环叠加。。
    4 点击 编辑|完成 按钮 的切换显示页面的某些标签
      1 删除按钮 复选框  数字输入框 
      2 body上有个edit_status 显示标签 没有则隐藏
    5 编辑同步购物车功能（发送请求到后台）
      1 点击按钮 判断 有没有商品需要同步  只需要判断有没有li标签的长度 
        1 用户都没有选购过商品 不需要做同步 给出用户提示 
        2 用户买过商品 
      2 构造参数 用于同步数据  var parmas={ infos:查询购物车成功之后的属性cart_info-也是json字符串 }
        我们需要把cart_info 按照原来的格式 返回到后台 但是 改变一个属性=购买的数量 
    6 点击删除按钮
      
      1 判断用户有麽易选择需要删除的li标签 长度判断
        length=0 用户 还么有选择需要删除的商品 给出提示 
        length!=0 再思考 构造参数
          1 弹出确认框 让用户确认是否要删除 。。。
      2 确认要删除  再思考 构造参数  删除和编辑是公用一个 接口 同步接口 
        var arr=[{name:苹果,num:1}，{name:西瓜,num:2},{name:香蕉,num:3}]
          编辑-同步的时候 
              [{name:苹果,num:11}，{name:西瓜,num:22},{name:香蕉,num:33}]
          删除-同步 要删除 苹果 同时 修改西瓜的数量 -> 100
             [{name:西瓜,num:100},{name:香蕉,num:33}]
  */
  function islon() {
    var userinfo = sessionStorage.getItem('userinfom')
    if (!userinfo) {
      location.href = "login.html"
      //  在本地中存入当前链接页的地址
      sessionStorage.setItem("pageurl", location.href);
    } else {
      $('#mian').css({
        "display": "block"
      })
      //然后请求数据渲染页面 只是。。。怎么渲染数据怎么来啊啊

      getcarts()
    }




  }

  //渲染页面
  function getcarts() {
    var userinfo = JSON.parse(sessionStorage.getItem("userinfom"))
    var token = userinfo.token
    // 处理要发送的参数
    // $.get('my/cart/all',function(result){
    //   console.log(result);
    $.ajax({
      type: 'get',
      url: 'my/cart/all',
      headers: {
        Authorization: token
      },
      success: function (result) {
        console.log(result)
        var goods_info = JSON.parse(result.data.cart_info);
        console.log(goods_info)
        var html = template('cartep', {
          data: goods_info
        })
        $('.oder-form').html(html)
        //初始化插件
        mui(".mui-numbox").numbox();
      }
    })


  }









  function init() {
    islon()
  }
  init();
})