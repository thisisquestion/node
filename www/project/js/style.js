//header部分，下拉/上拉效果
$("#header .header-r ul li").eq(0).hover(function(){
	$("#header .header-r ul li .list").stop().slideDown();
},function(){
	$("#header .header-r ul li .list").stop().slideUp();
})
//三级导航区域
$("#nav .nav-b dl dt").hover(function(){
	$(this).children("ul").stop().slideDown();
},function(){
	$(this).children("ul").stop().slideUp();
})
$("#nav .nav-b dl dt ul.list li").hover(function(){
	$("#nav .nav-b dl dt .contbox").css({display:"block"});
	$(this).css({background:"#fff"}).find("a").css({color:"#333"}).parent().parent().next().children().eq($(this).index()).css({display:"block"}).siblings().css({display:"none"});
},function(){
	$(this).css({background:"rgba(70,70,70,0.8)"}).find("a").css({color:"#fff"}).parent().parent().next().children().eq($(this).index()).css({display:"none"}).on("mouseenter",function(){
		$(this).css({display:"block"})
	}).on("mouseleave",function(){
		$(this).css({display:"none"});
		$("#nav .nav-b dl dt .contbox").css({display:"none"});
	})
})

//搜索框的实现
$("#nav .nav-t .search p").on("click",function(){
	if($(this).prev().val().length == 0){
		console.log("您没有输入数据");
	}else{
		window.location.href="list.html";
		$.cookie("search",$(this).prev().val());
	}
})