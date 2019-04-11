$("#btn1").on("click",function(){
		$.ajax({
			type:"get",
			url:"http://localhost:9191/login",
			data:{
				user:$("#user").val(),
				pass:$("#pass").val()
			},
			success:function(res){
				res = JSON.parse(res);
				if(res.code == 0){
					$("i").html("登录成功！欢迎登录！")
					setTimeout(function(){
								location.href="index.html";
							},2000)
				var userInfo = $.cookie("userInfo");
				var user = $("#user").val();
				if(userInfo == null){
						userInfo = [{
							user:user,
							status:1
						}]
					}else{
						userInfo = JSON.parse(userInfo);
						var onoff = true;
						userInfo.forEach((v)=>{
							if(v.user == user){
								onoff = false;
							}
						})
						if(onoff){
							userInfo.push({
								user:user,
								status:1
							})
						}
					}
					$.cookie("userInfo",JSON.stringify(userInfo));
					$.cookie("user",user);
					if($.cookie("tourist") != null){
						setCookie();
					}
				}else{
					$("i").html("登录失败！账号与密码不符！")
				}
			},
			error:function(a,b,c){
				console.log(a,b,c);
			}
		})
	})
$("#btn2").on("click",function(){
	window.location.href="register.html";
})


function setCookie(){
	var id = $.cookie("tourist");
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




