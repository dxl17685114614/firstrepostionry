$(function () {

    //    function init(){
    //     getleftlis()

    //    }
    //    init()
    //获取页面数据的函数 
    // function getleftlis(){
    //     $.get('categories',function(result){         
    //         if(result.meta.status==200){             
    //             var html = template('leftTpl',{data:result.data})
    //             $('.left').html(html)
    //              myScroll = new IScroll('.left');
    //             listsevent()
    //         }
    //     })
    // }




    //点击左边分类让右边出现对应的内容
    //首先渲染右边内容
    // function getpdcontent(pdid){
    //     $.get('categories',function(result){
    //         if(result.meta.status==200){
    //              datas=result.data[pdid].children
    //             var html = template('contenttep',{data:datas})              
    //             $('.right').html(html)

    //             var imgtime=$('.right img').length
    //            $('.right img').on('load',function(){
    //             imgtime--;
    //             if(imgtime==0){
    //                 myScroll = new IScroll('.right'); 
    //             } 
    //         })
    //         }

    //     })
    // }
    // // getpdcontent(0)

    function init() {
        getcategories()
    }
    init()

    function listsevent() {
        $('.left').on('tap', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index()
            ranR(index);
            myScroll.scrollToElement(this);
        })
    }
//  定义一个全局变量存储请求返回结果
    var datas;

    function getcategories() {     
        $.get('categories', function (result) {
            if(result.meta.status==200){
                var data = result.data;
                datas = result.data;
                ranL(data)
                ranR(0)
            }
            
        })
    }
 //左边list数据展示
    function ranL(data) {
        var html = template('leftTpl', {
            data: data
        })
        $('.left').html(html)
        myScroll = new IScroll('.left');
        listsevent()
    }
//右边数据展示
    function ranR(pdid) {
        data = datas[pdid].children
        var html = template('contenttep', {
            data: data
        })
        $('.right').html(html)

        var imgtime = $('.right img').length
        $('.right img').on('load', function () {
            imgtime--;
            if (imgtime == 0) {
                myScroll = new IScroll('.right');
            }
        })
    }


})