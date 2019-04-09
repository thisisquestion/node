//引入HTTP模块
let http = require("http");
//引入node中的文件管理器模块
let fs = require("fs");
//引入解析字符模块，帮助我们解析字符
let querystring = require("querystring");
//引入url模块,分割获得的url
let url = require("url");
//创建一个新数组,用来存储我们新注册的用户名，模拟数据库
var arr = [];
//创建服务器req：请求的数据，res回应的数据；
http.createServer((req,res)=>{
//	req.url获得请求数据端口号之后的数据
	console.log(req.url);
	var urlObj = url.parse(req.url,true);
//	fs.readFile()方法,寻找对应文件，其中的回调函数将会返回两个值，error和data，当找到数据error为null，data为我们要的数据；
	switch(urlObj.pathname){
		case "/login":	login(req,res,urlObj);
		break;
		case "/register": register(req,res,urlObj);
		break;
		default:
			fs.readFile("www"+req.url,(error,data)=>{
				if(error==null){
		//			将数据写回到前端的页面;
					res.write(data);
				}else{
					res.write("404");
				}
		//		关闭请求,不然会一直请求
				res.end();
			})
		}
	}).listen("9191","localhost",()=>{
		console.log("服务器开启成功");
	})
 
function login(req,res,urlObj){
	var onoff = true;
	for(var i=0;i<arr.length;i++){
		if(arr[i].user==urlObj.query.user && arr[i].pass==urlObj.query.pass){
			onoff = false;
			res.write('{"msg":"登录成功","code":0}');
			break;
		}
	}
	if(onoff){
		res.write('{"msg":"密码与账号不符","code":1}');
	}
	res.end();
}
function register(req,res,urlObj){
	var str = "";
	req.on("data",(msg)=>{
		str += msg;
	})
	req.on("end",()=>{
		var obj = querystring.parse(str);
		var onoff = true;
		for(var i=0;i<arr.length;i++){
			if(arr[i].user == obj.user && arr[i].pass == obj.pass){
				onoff = false;
				res.write('{"msg":"重名","code":0}');
				break;
			}
		}
		if(onoff){
			arr.push(obj);
			res.write('{"msg":"注册成功","code":1}');
		}
		res.end();
	})
}


