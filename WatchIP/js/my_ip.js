function httpRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

httpRequest('http://202.192.240.29/login!getOnlineCount.action',function(ip){
    document.getElementById('ip_div').innerHTML = ip;
});

