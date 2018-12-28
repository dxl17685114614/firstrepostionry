$(function () {
    init();
  
    function init() {
  
      getGoodsDetail();
      shoppingcar()
    }
  
    /**
     * 获取商品的详情信息
     */

var GoodsObj;

    function getGoodsDetail() {
      $.get("goods/detail", {
        goods_id: getUrl("goods_id")
      }, function (result) {
        // console.log(result);
        if (result.meta.status == 200) {
          GoodsObj=result.data;
          // var html=template("mainTpl",{data:result.data});
          var html = template("mainTpl", result.data);
          $(".pyg_view").html(html);
  
          // 轮播图初始化
          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
          });
        }
  
      })
  
    }

    function shoppingcar(){
     
     $('#shopping').on('tap',function(){
        
        var islong=sessionStorage.getItem("userinfom")
        if(!islong){
          mui.toast("你还没有登录")
          //在本地中存入当前页面的地址
          sessionStorage.setItem("pageurl", location.href);
          setTimeout(function(){
            location.href="login.html"
          },1000)
        }else{
          var token= JSON.parse(islong).token;
          var shoppinfo={
            cat_id: GoodsObj.cat_id,
            goods_id: GoodsObj.goods_id,
            goods_name: GoodsObj.goods_name,
            goods_number: GoodsObj.goods_number,
            goods_price: GoodsObj.goods_price,
            goods_small_logo: GoodsObj.goods_small_logo,
            goods_weight: GoodsObj.goods_weight
          }
          var shoppingif=JSON.stringify(shoppinfo);
          $.ajax({
            url:"my/cart/add",
            data:{
              info:shoppingif
            },
            type:"post",
            headers:{
              Authorization:token
            },
            success:function(result){
               if(result.meta.status==200){
                   mui.confirm('是否跳转至购物车？','添加成功',['是','否'],function(type){
                        if(type.index==0){
                          location.href="cart.html"
                        }else if(type.index==1){
                           
                        }
                   })
               }
              
            }
          })

        }



     })



    }

    /**
     * 获取url上参数的值
     * @param {String} name 要求查询的参数名
     */
    function getUrl(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  
  })