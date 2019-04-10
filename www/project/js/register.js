$("#btn").on("click",function(){
				$.ajax({
					type:"post",
					url:"http://localhost:9191/register",
					data:{
						user:$("#user").val(),
						pass:$("#pass").val()
					},
					success:function(res){
						res = JSON.parse(res);
						console.log(res);
						if(res.code == 1){
							$("span").html("注册成功！3秒后跳转到登录界面！")
							setTimeout(function(){
								location.href="login.html";
							},3000)
						}else{
							$("span").html("这个名字太火了！请重新注册")
						}
					},
					error:function(a,b,c){
						console.log(a,b,c);
					}
				})
			})
