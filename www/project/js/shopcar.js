//header部分，下拉/上拉效果
$("#header .header-r ul li").eq(0).hover(function(){
	$("#header .header-r ul li .list").stop().slideDown();
},function(){
	$("#header .header-r ul li .list").stop().slideUp();
})
//使用cookie传输购物车相关数据
class Car{
			constructor(options){
				this.url = options.url;
				this.tbody = options.tbody;
				this.totalPrice = options.totalPrice;
				this.totalNum = options.totalNum;
//				用来保存相应的总数和总价
				this.totalNumV = 0;
				this.totalPriceV = 0;
				this.selectAll = options.selectAll;
				this.selectAll.checked = false;
				this.getData();
				this.addEvent();
			}
			getData(){
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res){
						that.res = JSON.parse(res);
						that.getCookie();
					}
				})
			}
			getCookie(){
				this.user = $.cookie("user");
				this.userInfo = JSON.parse($.cookie("userInfo"));
				console.log(this.userInfo);
				for(var i=0;i<this.userInfo.length;i++){
					if(this.user == this.userInfo[i].user){
						this.goods = this.userInfo[i].goods;
						console.log(this.goods);
						this.display();
					}
				}
			}
			display(){
				var str = "";
				for(var i=0;i<this.res.length;i++){
					for(var j=0;j<this.goods.length;j++){
						if(this.res[i].goodId == this.goods[j].id){
							str += `<tr index=${this.goods[j].id}>
										<td><input type="checkbox" id="checkbox"></td>
										<td><img src="${this.res[i].img}"></td>
										<td>${this.res[i].name}</td>
										<td>${this.res[i].oldPrice}</td>
										<td><input type="number" value="${this.goods[j].num}" id="num"></td>
										<td><span>删除</span></td>
									</tr>`;
						}
					}
				}
				this.tbody.innerHTML = str;
			}
			addEvent(){
				var that = this;
				this.tbody.addEventListener("click",function(eve){
					var e = eve || window.event;
					var target = e.target || e.srcElement;
					if(target.nodeName == "SPAN"){
						that.id = target.parentNode.parentNode.getAttribute("index");
						target.parentNode.parentNode.remove();
						that.changeCookie(function(index){
							that.goods.splice(index,1);
						});
					}
				})
				this.tbody.addEventListener("input",function(eve){
					var e = eve || window.event;
					var target = e.target || e.srcElement;
					if(target.id == "num"){
						that.id = target.parentNode.parentNode.getAttribute("index");
						that.num = target.value;
						that.changeCookie(function(index){
							that.goods[index].num = that.num;
						})
					}
				})
				this.tbody.addEventListener("change",function(eve){
					var e = eve || window.event;
					var target = e.target || e.srcElement;
//					判断引起改变事件的事件源是否为要选择的复选框
					if(target.id == "checkbox"){
//						判断复选框的状态是否为选中状态
						if(target.checked ==  true){
//							如果复选框的状态为选中状态则计算相应的数量的总价
							that.totalNumV +=  parseInt(target.parentNode.parentNode.children[4].children[0].value);
//							console.log(that.totalNumV);
							that.totalPriceV += (target.parentNode.parentNode.children[4].children[0].value) * target.parentNode.parentNode.children[3].innerHTML;
						}
//						判断改变后,复选框的状态是否未选中的状态
						if(target.checked == false){
//							如果复选框的状态解除选中则要减去相应的数量和总价;
							that.totalNumV -=  parseInt(target.parentNode.parentNode.children[4].children[0].value);
							that.totalPriceV -= (target.parentNode.parentNode.children[4].children[0].value) * target.parentNode.parentNode.children[3].innerHTML;
							that.selectAll.checked = false;
						}
						that.totalNum.innerHTML = "总数量为：" + that.totalNumV;
						that.totalPrice.innerHTML = that.totalPriceV.toFixed(2);
					}
				})
				this.selectAll.addEventListener("change",function(){
//					这里需要清空之前单个的选项数据,不然全选会造成与之前的叠加问题
					that.totalNumV = 0;
					that.totalPriceV = 0;
					that.tr = document.querySelectorAll("tbody tr");;
					if(this.checked == true){
						for(var i=0;i<that.tr.length;i++){
							that.tr[i].children[0].children[0].checked = true;
							that.totalNumV += parseInt(that.tr[i].children[4].children[0].value);
							that.totalPriceV += parseInt(that.tr[i].children[4].children[0].value) * that.tr[i].children[3].innerHTML;
						}
					}else{
						for(var i=0;i<that.tr.length;i++){
							that.tr[i].children[0].children[0].checked = false;
							that.totalNumV = 0;
							that.totalPriceV = 0;
						}
					}
					that.totalNum.innerHTML = "总数量为：" + that.totalNumV;
					that.totalPrice.innerHTML = that.totalPriceV.toFixed(2);
				})
			}
			changeCookie(callback){
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
						break;
					}
				}
				callback(i);
				$.cookie("userInfo",JSON.stringify(this.userInfo));
			}
		}
		new Car({
			url:"http://localhost:9191/project/json/goods.json",
			tbody:document.querySelector("tbody"),
			totalPrice:document.querySelector("#totalPrice"),
			totalNum:document.querySelector("#totalNum"),
			selectAll:document.querySelector("#selectAll")
		})