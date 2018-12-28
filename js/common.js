$(function(){




    
//设置拦截器
$.ajaxSettings.beforeSend=function(xrh,objct){
    objct.url="http://api.pyg.ak48.xyz/api/public/v1/"+objct.url
    $("body").addClass('loadding')

    
}

$.ajaxSettings.complete=function(){
    $("body").removeClass('loadding') 
   
}


// 拓展zpteo
$.extend($, {
    /**
     * 获取url上参数的值
     * @param {String} name 要求查询的参数名
     */
    getUrl: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    /**
     * 使用正则验证号码
     * @param {Number} phone 要验证的手机号码
     */
    checkPhone: function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * 验证邮箱合法性
     * @param {email} myemail 邮箱
     */
    checkEmail: function (myemail) {
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(myemail)) {
        return true;
      } else {
        return false;
      }
    }
  })



})