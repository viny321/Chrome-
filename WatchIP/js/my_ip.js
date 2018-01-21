function httpRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
			var temp = xhr.responseText;
			temp = temp.match(/\[\{(.+?)\}\]/)[1];//提取课表JSON
            callback("[{"+temp+"}]");//{ }不见了，此处补全，并返回
        }
    }
    xhr.send();
}

httpRequest('http://202.192.240.29/xsbjkbcx!xsAllKbList.action?xnxqdm=201701&bjdm=1005472',function(str){
    var obj = JSON.parse(str);
    console.log(typeof(obj));
    console.log(obj[0].kcmc);
});

//('/\[\{.*\}\]/')

/**
 * author:viny
 * prams:kcobj 课程对象
 * return: 
 *      返回符合格式的课程字符串
 */
function transforms(kcobj){
    var oldarr = kcobj.zcs.split(",");//对象提取周次字符串 按',' 转数组

    oldarr.sort(function(a,b){return a-b});//数字升序
    var zcs = "";
    var arr = new Array;
    for (let index = 0; index < oldarr.length; index++) {
        if(index==0){//记录第一个数
            var i = 0;
            arr[i] = oldarr[0]+"";
            var temp = oldarr[0];
        }else if(index<oldarr.length-1){
            zcs = oldarr[index];
            if((zcs - temp)!=1){ //如果相邻两个数只差不为 1 ，记录周段，是接收数组加一 ，存储下一个周段
                if(!arr[i]==temp){//如果两数相等 则不需要 “~” 分隔 是 i++即可
                    arr[i] = arr[i]+"~"+temp;
                }
                i++;
                arr[i] = zcs+"";
            }
            temp = zcs;
        }else{//记录最后一个数
            zcs = oldarr[index];
            if((zcs-temp)==1){
                arr[i] = arr[i]+"~"+zcs;
            }else{
                if(!arr[i]==temp){//如果两数相等 则不需要 “~” 分隔 是 i++即可 此处同上
                    arr[i] = arr[i]+"~"+temp;
                }
                i++;
                arr[i] = zcs+"";
            }
        }
        //console.log(oldarr[index]); //循环数组内容
    }
    return kcobj.kcmc+"\n第"+arr.toString()+"周\n"+kcobj.jxcdmcs+"  "+kcobj.teaxms;
}
