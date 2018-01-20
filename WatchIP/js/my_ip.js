function httpRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
			var temp = xhr.responseText;
			temp = temp.match(/\[\{(.+?)\}\]/)[1];//提取课表JSON
            callback("{"+temp+"}");//{ }不见了，此处补全，并返回
        }
    }
    xhr.send();
}

httpRequest('http://202.192.240.29/xsbjkbcx!xsAllKbList.action?xnxqdm=201701&bjdm=1005472',function(ip){
    ip = ip.replace(/\},\{/g,"}<br>{");
    var arr = ip.split("<br>");//切割字符串，使其成为JSON字符串{"":""} , 并用数组接收
    document.getElementById('ip_div').innerHTML = ip;
    var obj = arr[1];
    console.log(obj);
    var kb = JSON.parse(obj);//json字符串转json对象
    console.log(kb.kcmc);
});

//('/\[\{.*\}\]/')