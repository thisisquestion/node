$("#btn").on("click",function(){
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
					$("span").html("登录成功！欢迎登录！")
					setTimeout(function(){
								location.href="index.html";
							},2000)
				}else{
					$("span").html("登录失败！账号与密码不符！")
				}
			},
			error:function(a,b,c){
				console.log(a,b,c);
			}
		})
	})
