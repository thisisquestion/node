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
$(document).ready(function(){
	$.ajax({
		url:"http://localhost:9191/project/json/goods.json",
		success:function(res){
			res = JSON.parse(res);
			var goodId = $.cookie("goodId");
//			console.log(res);
//			console.log(goodId);
			for(var i=0;i<res.length;i++){
				if(res[i].goodId == goodId){
					str	= `<div class="main-l1 margin">
								<p><a>您当前的位置:全部分类&gt;图书&gt;成功励志&gt;情商与情绪管理&gt;自我激励</a></p>	
							</div>
							<div class="main-l2 margin">
								<div class="main-l2-l">
									<a href="#"><img src="${res[i].largeImg}"></a>
								</div>
								<div class="main-l2-r">
									<p>${res[i].name}</p>
									<div class="cont1">
										作者：<a href="#">${res[i].author}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出版社：<a href="#">${res[i].press}</a>
									</div>
									<div class="cont2">
										<img src="https://bnmpstyle.bookuu.com/www/images/icon/flashsale2.png">
										<span>即将开抢……</span>
										<span>￥${res[i].oldPrice}</span>
										<s>￥${res[i].newPrice}</s>
										<span>限${res[i].limit}件</span>
										<span>开抢时间：4月11日12:00</span>
									</div>
									<div class="cont3">
										<p>定价<s>￥${res[i].newPrice}</s></p>
										<p>售价<span>￥${res[i].oldPrice}</span></p>
									</div>
									<div class="cont4">
										<p>配送至<select>
											<option value="北京">北京</option>
											<option value="上海">上海</option>
											<option value="广州">广州</option>
											<option value="深圳">深圳</option>
										</select></p>
										<p>销量<span>${res[i].sales}件</span></p>
										<p>库存<span>${res[i].stock}件</span></p>
									</div>
									<div class="cont5">
										<p>开抢提醒</p>
										<p><span class="iconfont icon-gouwuche"></span>加入购物车</p>
									</div>
								</div>
							</div>`;
					$("#main").html(str);
				}
			}
			$(".cont5").children().eq(1).on("click",function(){
				var id = $.cookie("goodId");
				var goodss = $.cookie("goodss");
				console.log(goodss);
				if(goodss == null){
						goodss = [{
							id:id,
							num:1
						}]
					}else{
						goodss = JSON.parse(goodss);
						var onoff = true;
						goodss.forEach((v)=>{
							if(v.id == id){
								v.num++;
								onoff = false;
							}
						})
						if(onoff){
							goodss.push({
								id:id,
								num:1
							})
						}
					}
					$.cookie("goodss",JSON.stringify(goodss));
			})
		}
	})
})
