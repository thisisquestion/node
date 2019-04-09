;(function($){
	"use strict";
	$.fn.extend({
		banner:function(options){
//			进行相关默认参数的处理
			this.LOCAL = {
				items : options.items,
				delayTime : options.delayTime == undefined ? 2000 : options.delayTime,
				moveTime : options.moveTime ==undefined ? 200 : options.moveTime,
				genList : options.genList ? options.genList : false,
				index : 0,
				iPrev : options.items.length - 1
			}
			if(options.autoPlay == false){
				this.LOCAL.autoPlay = false;
			}else{
				this.LOCAL.autoPlay = true;
			}
//			测试默认参数的处理是否正确
//			console.log(this.LOCAL.items,this.LOCAL.delayTime,this.LOCAL.moveTime,this.LOCAL.genList,this.LOCAL.autoPlay);
			this.LOCAL.rightBtn = function(){
//				console.log(1);
				if(that.LOCAL.index == that.LOCAL.items.length - 1){
					that.LOCAL.index = 0;
					that.LOCAL.iPrev = that.LOCAL.items.length - 1;
				}else{
					that.LOCAL.index++;
					that.LOCAL.iPrev = that.LOCAL.index - 1;
				}
//					测试右按钮
//						console.log(that.LOCAL.index,that.LOCAL.iPrev);
					that.LOCAL.move(1);
			}
			this.LOCAL.move = function(type){
//				console.log(that.LOCAL.moveTime);
				that.LOCAL.items.eq(that.LOCAL.index).css({left:that.LOCAL.items.eq(0).width()*type})
				that.LOCAL.items.eq(that.LOCAL.index).stop().animate({left:0},that.LOCAL.moveTime);
				that.LOCAL.items.eq(that.LOCAL.iPrev).css({left:0});
				that.LOCAL.items.eq(that.LOCAL.iPrev).stop().animate({left:-that.LOCAL.items.eq(0).width()*type},that.LOCAL.moveTime);
				ul.children("li").eq(that.LOCAL.index).css({background:"red"}).siblings().css({background:"rgba(200,200,200,0.6)"});
			}
			var that = this;
			if(options.left != undefined && options.left.length>0 && options.right != undefined && options.right.length>0){
//				console.log(options.left,options.right);
				options.left.on("click",function(){
					if(that.LOCAL.index == 0){
						that.LOCAL.index = that.LOCAL.items.length - 1;
						that.LOCAL.iPrev = 0;
					}else{
						that.LOCAL.index--;
						that.LOCAL.iPrev = that.LOCAL.index + 1;
					}
//					测试左按钮
//					console.log(that.LOCAL.index,that.LOCAL.iPrev);
					that.LOCAL.move(-1);
				});
				options.right.on("click",this.LOCAL.rightBtn);
			}
			
//			判断是否创建列表
			if(this.LOCAL.genList){
				var ul = $("<ul></ul>");
				for(var i = 0;i<this.LOCAL.items.length;i++){
					var li = $("<li>"+(i+1)+"</li>")
					ul.append(li);
				}
				$(this).append(ul);
			}
			ul.css({
				position:"absolute",
				bottom:0,
				zIndex:1,
				display:"flex",
				width:$(this).width(),
				height:50,
				lineHeight:"50px",
				margin:0,
				padding:0
			})
			ul.children("li").css({
				flex:1,
				background:"rgba(200,200,200,0.6)",
				textAlign:"center",
				listStyle:"none",
				margin:0,
				padding:0
			})
			ul.children("li").eq(0).css({background:"red"});
			ul.children("li").on("click",function(){
				$(this).css({background:"red"}).siblings().css({background:"rgba(200,200,200,0.6)"});
				if($(this).index() > that.LOCAL.index){
					that.LOCAL.iPrev = that.LOCAL.index;
					that.LOCAL.index = $(this).index();
					that.LOCAL.move(1);
				}else if($(this).index() < that.LOCAL.index){
					that.LOCAL.iPrev = that.LOCAL.index;
					that.LOCAL.index = $(this).index();
					that.LOCAL.move(-1);
				}
			})
			if(that.LOCAL.autoPlay){
				this.LOCAL.timer = setInterval(function(){
					that.LOCAL.rightBtn();
				},this.LOCAL.delayTime)
			}
			this.hover(function(){
				clearInterval(that.LOCAL.timer);
			},function(){
				that.LOCAL.timer = setInterval(function(){
					that.LOCAL.rightBtn();
					},that.LOCAL.delayTime)
			})
//			$(this).mouseenter(function(){
//				clearInterval(that.LOCAL.timer);
//				$(this).mouseleave(function(){
//					that.LOCAL.timer = setInterval(function(){
//						console.log(that.LOCAL.index,that.LOCAL.iPrev);
//						that.LOCAL.rightBtn();
//					},that.LOCAL.delayTime)
//				})
//			})
//			这里面在做鼠标移入/溢出的效果的时候要注意,我们所写的右点击事件中,onclick中含有onmouseover
//			onmouseover:存在事件冒泡;
//			onmouseenter:不存在事件冒泡;
//			$(this).mouseover(function(){
//				clearInterval(that.LOCAL.timer);
//				$(this).mouseout(function(){
//					that.LOCAL.timer = setInterval(function(){
//						console.log(1)
////						console.log(that.LOCAL.index,that.LOCAL.iPrev);
//						that.LOCAL.rightBtn();
//					},that.LOCAL.delayTime)
//				})
//			})
			
		}
	})
})(jQuery)
