$(function () {

    //定义一个对象来存入要发送请求的数据  方便后期更改
    var senddatas = {
        //搜索关键字 
        query: "",
        //根据分类id
        cid: geturl("cid"),
        //加载的页码
        pagenum: 1,
        //每页的内容数量
        pagesize: 10,
    }
    // console.log(senddatas.cid);
    var allpages;
    //发送请求获取商品数据
    function getgoodssearch(callback) {
        $.get('goods/search', senddatas, function (result) {
            // console.log(result)
            if (result.meta.status == 200) {
                // 计算在页容量为10的情况下总共有几页
                allpages = Math.ceil(result.data.total / senddatas.pagesize);

                callback(result.data.goods);
            }
        })
    }



    //定义一个工具函数来获取url上的cid的值
    function geturl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
///mui上下拉逻辑//MUI插件

    function updown() {
        mui.init({
            pullRefresh: {
                container: ".cont-box",
                down: {
                    auto: true,
                    //  触发下拉刷新时自动触发
                    callback: function () {
                        senddatas.pagenum=1;
                        //函数作为回调
                        getgoodssearch(function (pds) {

                            mui('.cont-box').pullRefresh().endPulldownToRefresh()
                            var html = template('goodstep', {
                                goods: pds
                            })
                            $('.pdsul').html(html);
                            mui('.cont-box').pullRefresh().refresh(true);
                        })
                    }
                },
                up: {
                    auto: true,
                    //  触发上拉刷新时自动触发
                    callback: function () {
                        if (senddatas.pagenum >= allpages) {
                            
                            mui('.cont-box').pullRefresh().endPullupToRefresh(true);
                        } else {
                            //当上拉的时候让页码递增
                            senddatas.pagenum++;
                            getgoodssearch(function (pds) {
                                 
                                mui('.cont-box').pullRefresh().endPullupToRefresh();
                                var html = template('goodstep', {
                                    goods: pds
                                })
                                $('.pdsul').append(html);
                            })
                        }
                    }
                }
            }
        });

    }

//因为插件原因 a标签无法实现跳转 所以手动实现点击a标签跳转

function aherf(){
    $('.pdsul').on('tap','a',function(event){       
        var herf=this.href;
        location.href=herf;
    })
}


    function init() {      
        updown()
        aherf()
    }
    init()

})