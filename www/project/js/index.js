//header部分，下拉/上拉效果
$("#header .header-r ul li").eq(0).hover(function(){
	$("#header .header-r ul li .list").stop().slideDown();
},function(){
	$("#header .header-r ul li .list").stop().slideUp();
})
//三级导航区域
$("#nav .nav-b dl dt ul.list li").hover(function(){
	$(this).css({background:"#fff"}).find("a").css({color:"#333"}).parent().parent().next().children().eq($(this).index()).css({display:"block"}).siblings().css({display:"none"});
},function(){
	$(this).css({background:"rgba(70,70,70,0.8)"}).find("a").css({color:"#fff"}).parent().parent().next().children().eq($(this).index()).css({display:"none"}).on("mouseenter",function(){
		$(this).css({display:"block"})
	}).on("mouseleave",function(){
		$(this).css({display:"none"})
	})
})

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

//滑过放大效果
$(".enlarge li a img").on("mouseenter",function(){
	$(this).css({width:210});
})
$(".enlarge li a img").on("mouseleave",function(){
	$(this).css({width:190});
})

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
