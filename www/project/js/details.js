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
									<div class="left">
										<a href="#"><img src="${res[i].largeImg}"></a>
										<span></span>
										<p></p>
									</div>
									<div class="right">
										<img src="${res[i].largeImg}">
									</div>
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
										<p>立即购买</p>
										<p><span class="iconfont icon-gouwuche"></span>加入购物车</p>
									</div>
								</div>
							</div>`;
					$("#main").html(str);
				}
			}
			$(".cont5").children().eq(1).on("click",function(){
					setCookie();
			})
			$(".cont5").children().eq(0).on("click",function(){
					setCookie();
					setTimeout(function(){
						window.location.href = "shopcar.html";
					},2000);
			})
			function setCookie(){
				var id = $.cookie("goodId");
				var userInfo = $.cookie("userInfo");
				userInfo = JSON.parse(userInfo);
				var user = $.cookie("user");
				if(userInfo == null || user == "null"){
					alert("请先登录");
					$.cookie("tourist",id);
					window.location.href = "login.html";
				}else{
					for(var i=0;i<userInfo.length;i++){
						if(userInfo[i].user == user){
							if(userInfo[i].goods == null){
								userInfo[i].goods = [{
									id:id,
									num:1
								}]
							}else{
								var goods = userInfo[i].goods;
								var onoff = true;
								goods.forEach((v)=>{
									if(v.id == id){
										v.num++;
										onoff = false;
									}
								})
								if(onoff){
									goods.push({
										id:id,
										num:1
									})
								}
							}
							$.cookie("userInfo",JSON.stringify(userInfo));
						}
					}
				}
			}
//			放大镜
			function Magnifier(){
				this.oLeft = document.querySelector(".left");
				this.oSpan = document.querySelector(".left span");
				this.oRight = document.querySelector(".right");
				this.oImg = document.querySelector(".right img");
				this.init();
			}
			Magnifier.prototype.init=function(){
				var that=this;
				this.oLeft.onmouseover=function(){
					that.show();
				}
				this.oLeft.onmouseout=function(){
					that.hide();
				}
			}
			Magnifier.prototype.show=function(){
	//			console.log(this.oSpan);
				this.oSpan.style.display="block";
				this.oRight.style.display="block";
				this.addEvent();
			}
			Magnifier.prototype.addEvent=function(){
				var that = this;
				this.oLeft.onmousemove=function(eve){
					var e = eve || window.event;
					that.spanMove(e);
				}
			}
			Magnifier.prototype.spanMove=function(e){
				var l = e.offsetX - this.oSpan.offsetWidth/2;
				var t = e.offsetY - this.oSpan.offsetHeight/2;
				if(l<=0) l=0;
				if(t<=0) t=0;
				if(l>=this.oLeft.offsetWidth-this.oSpan.offsetWidth){
					l=this.oLeft.offsetWidth-this.oSpan.offsetWidth;
				}
				if(t>=this.oLeft.offsetHeight-this.oSpan.offsetHeight){
					t=this.oLeft.offsetHeight-this.oSpan.offsetHeight;
				}
				this.oSpan.style.left=l+"px";
				this.oSpan.style.top=t+"px";
				this.x = l / (this.oLeft.offsetWidth-this.oSpan.offsetWidth);
				this.y = t / (this.oLeft.offsetHeight-this.oSpan.offsetHeight);
				this.imgMove();
			}
			Magnifier.prototype.imgMove=function(){
				console.log(1);
				this.oImg.style.left=-this.x*(this.oImg.offsetWidth-this.oRight.offsetWidth)+"px";
				this.oImg.style.top=-this.y*(this.oImg.offsetHeight-this.oRight.offsetHeight)+"px";
			}
			Magnifier.prototype.hide=function(){
				this.oSpan.style.display="none";
				this.oRight.style.display="none";
			}
			new Magnifier();
		}
	})
})
