var flag = true;
var ip = "";

function status() {
    if(flag){//是否为第一次请求，如果是，则请求IP，否则直接返回结果即可
        httpRequest('http://2017.ip138.com/ic.asp',function(str){
            flag = false;
            ip = str;
            chrome.runtime.sendMessage(ip,function() {
                
            });
        });
    }
    return ip;
}

function httpRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
			var temp = xhr.responseText;
			temp = temp.match(/\[(.+?)\]/)[1];//提取课表JSON
            callback(temp);
        }
    }
    xhr.send();
}

chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse) {
        if (message=='viny') {
            sendResponse(status());
        }
    }
);
