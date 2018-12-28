$(function () {
    function getslider() {
        $.get(
            'home/swiperdata',
            function (result) {
                // console.log(result);
                if (result.meta.status == 200) {
                    var html = template('carouseletep', {
                        data: result.data
                    })
                    $('.carouslee').html(html)
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                }
            }
        )
    }
    getslider()
   //获取图标
    function getcatetitle(){
        $.get('catitems',function(result){
            //  console.log(result);
             if(result.meta.status == 200){
                 var html=template('catatitletep',{data:result.data})
                 $('.cate-titile').html(html);
             }
        })
    }
    getcatetitle()
  
    //获取商品
   
    function getproduct(){
        $.get('home/goodslist',function(result){
            console.log(result)

            if(result.meta.status == 200){
                var html=template('pdlisttep',{data:result.data})
                $('.pdlist').html(html);
            }
        })
    }
    getproduct()
})