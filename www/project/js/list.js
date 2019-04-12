$(document).ready(function(){
	var search = $.cookie("search");
	$.ajax({
		url:"http://localhost:9191/project/json/goods.json",
		success:function(res){
			var str = "";
			var onoff = true;
			res = JSON.parse(res);
			for(var i=0;i<res.length;i++){
				if(res[i].name.indexOf(search) != -1 || res[i].author.indexOf(search) != -1){
					onoff = false; 
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
			}
			if(onoff){
				str = `<p>您好!没有找到有关于<i>${search}</i>的数据,请确认搜索的关键词是否正确……<p>`
			}
			$("#main ul").html(str);
//			搜索到的商品,点击跳转到详情页
			$("#main ul li").children("a").on("click",function(){
				$.cookie("goodId",$(this).children("img").attr("goodId"));
			})
			$("#main ul li .context").children("a").on("click",function(){
				$.cookie("goodId",$(this).parent().prev().children("img").attr("goodId"));
			})
		}
	});
})
