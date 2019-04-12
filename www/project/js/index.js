//轮播图
$("#banner .cont").banner({
			items:$("#banner .imgbox a"),
			left:$("#banner .btn #left"),		
			right:$("#banner .btn #right"),			
			delayTime:3000,			//不传默认为2000
			moveTime:1000,			//不传默认为200
			autoPlay:false,		//不传默认为true
			genList:true			//不传默认为false
		})
//倒计时模块:
$("#main #retroclockbox1").flipcountdown();



//楼层效果
document.onscroll = function(){
	var topV = document.documentElement.scrollTop;
	if(topV>=630+$(".layer1").height()+$(".layer2").height()+$(".layer3").height()){
		$("#main .leftmenu ul li").eq(0).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(1).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(2).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(3).css({color:"#fff",background:"#2db4ea"});
	}else if(topV>=630+$(".layer1").height()+$(".layer2").height()){
		$("#main .leftmenu ul li").eq(0).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(1).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(2).css({color:"#fff",background:"#2db4ea"});
		$("#main .leftmenu ul li").eq(3).css({color:"#212121",background:"#fff"});
		
	}else if(topV >= 630+$(".layer1").height()){
		$("#main .leftmenu ul li").eq(0).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(1).css({color:"#fff",background:"#2db4ea"});
		$("#main .leftmenu ul li").eq(2).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(3).css({color:"#212121",background:"#fff"});
	}else if(topV>=630){
		$("#main .leftmenu").css({display:"block"})
		$("#main .leftmenu ul li").eq(0).css({color:"#fff",background:"#2db4ea"});
		$("#main .leftmenu ul li").eq(1).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(2).css({color:"#212121",background:"#fff"});
		$("#main .leftmenu ul li").eq(3).css({color:"#212121",background:"#fff"});
	}else{
		$("#main .leftmenu").css({display:"none"});
	}
}
$("#main .leftmenu ul li").on("click",function(){
	var t=630;
	switch($(this).index()){
		case 3:t += $(".layer3").height();
		case 2:t += $(".layer2").height();
		case 1:t += $(".layer1").height();
		case 0: t;
	}
	$("html").stop().animate({
		scrollTop:t
	},2000)
})
//点击注销按钮时,注销用户
$("#header .header-l").on("click","i",function(){
	$.cookie("user","null");
	window.location.reload();
})



//加载相应的数据
$(document).ready(function(){
//header部分完成登录有欢迎语,实现登录注销功能
	if($.cookie("user") == null || $.cookie("user") == "null"){
		str = `<a href="login.html">登录</a>
				<span class="te">|</span>
				<a href="register.html">免费注册</a>
				<a href="#"><span class="iconfont icon-44"></span>下载博库APP</a>`;
		$("#header .header-l").html(str);
	}else{
		var user = $.cookie("user");
		str = `<s>欢迎用户:${user}</s>
				<i>注销</i>
				<a href="#"><span class="iconfont icon-44"></span>下载博库APP</a>`;
		$("#header .header-l").html(str);
	}
	$.ajax({
		url:"http://localhost:9191/project/json/goods.json",
		success:function(res){
			res = JSON.parse(res);
			var str = "";
			for(var i =0;i<res.length;i++){
				str += `<li>
							<a href="details.html" target="_blank">
								<img src="${res[i].img}" goodId=${res[i].goodId}>
							</a>
							<div class="context">
								<a href="details.html" target="_blank">${res[i].name}</a>
								<p><span>￥${res[i].oldPrice}</span><s>|￥${res[i].newPrice}</s></p>
							</div>
						</li>`;
			}
			$("#goods").html(str);
			//点击跳转到详情页
			$("#goods li").children("a").on("click",function(){
				$.cookie("goodId",$(this).children("img").attr("goodId"));
			})
			$("#goods li .context").children("a").on("click",function(){
				$.cookie("goodId",$(this).parent().prev().children("img").attr("goodId"));
			})
		}
	})
})

//通过json加载过来数据的滑过放大效果
$("#goods").on("mouseenter","li a img",function(event){
	$(this).css({width:210});
})
$("#goods").on("mouseleave","li a img",function(event){
	$(this).css({width:190});
})
//滑过放大效果
$(".enlarge li a img").on("mouseenter",function(){
	$(this).css({width:210});
})
$(".enlarge li a img").eq(0).on("mouseenter",function(){
	$(this).css({width:190});
})
$(".enlarge li a img").eq(10).on("mouseenter",function(){
	$(this).css({width:190});
})
$(".enlarge li a img").on("mouseleave",function(){
	$(this).css({width:190});
})







