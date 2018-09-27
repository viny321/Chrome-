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

/**
 * 150805:1005472
 * 160806:104384054
 * 2017-2018-2:201702
 */
function timetable(){
    var bjdm = getbjdm();
    var xqdm = getxqdm();
    httpRequest('http://202.192.240.29/xsbjkbcx!xsAllKbList.action?xnxqdm='+xqdm+'&bjdm='+bjdm,ajaxback); 
}

/**
 * @author 独秀
 * @param {*} str 
 */
function ajaxback(str) {
    console.info(str);
    var jsonarr = JSON.parse(str);
    jsonarr2table(jsonarr);
}

/**
 * @author:viny 
 * @params jsonarr JSON格式的数组[{"":"","":""},{}]
 * @return null 
 * 功能：
 *    把特定的json数组（我们学校的课表）转换成二维数组，然后写到 7x6 的 table 上
 */
function jsonarr2table(jsonarr){
    var obj = jsonarr[0];
    var table = new Array(7);
    for (let i = 0; i < table.length; i++) {
        table[i] = ["","","","","",""];
    }
    var xqs = 0;//
    var jcs = 0;//节次
    for (let index = 0; index < jsonarr.length; index++) {
        obj = jsonarr[index];
        jcs = parseInt(obj.jcdm2)
        jcs = (jcs+1)/2;
        xqs = parseInt(obj.xq);

        table[xqs-1][jcs-1] += transforms(obj);
        if(obj.jcdm2.length==11){//长度等于5(01,02)或者等于11(01,02,03,04)两节连上
            table[xqs-1][jcs] += transforms(obj);  
        }
    }
    arr2Table(table);
}

/**
 *@author viny 
    *@param arr
    *@returns null
    * 
    */
function arr2Table(arr) {
    var id = "";
    for (let index = 0; index < 7; index++) {
        for (let j = 0; j < 6; j++) {
            id = index+""+j;
            document.getElementById(id).innerHTML = (arr[index][j]==null||arr[index][j]=="")?"&nbsp;":arr[index][j];
        }
    }
}

/**
 * author:viny
 * prams:kcobj 课程对象
 * return: 
 *      返回符合格式的课程字符串
 */
function transforms(kcobj){
    var oldarr = kcobj.zcs.split(",");//对象提取字符串 转数组

    oldarr.sort((a,b)=>a-b);//数字升序
    var zcs = "";
    var arr = new Array;
    for (let index = 0; index < oldarr.length; index++) {
        if(index==0){//记录第一个数
            var i = 0;
            arr[i] = oldarr[0]+"";
            var temp = oldarr[0];
        }else if(index<(oldarr.length-1)){
            zcs = oldarr[index];
            if((zcs - temp)!=1){ //如果相邻两个数只差不为 1 ，记录周段，是接收数组加一 ，存储下一个周段
                if(arr[i]!=temp){//如果两数相等 则不需要 “~” 分隔
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
                if(arr[i]!=temp){//如果两数相等 则不需要 “~” 分隔
                    arr[i] = arr[i]+"~"+temp;
                }
                i++;
                arr[i] = zcs+"";
            }
        }
    }
    return kcobj.kcmc+"<br>第"+arr.toString()+"周<br>"+kcobj.jxcdmcs+"  "+kcobj.teaxms+"<br>";
}
/**
 * 获取select 下拉框中用户选择的班级对应的班级代码
 * 并把该班级放到表头
 */
function getbjdm() {
    var selects = document.getElementById("bjdm");
    var index = selects.selectedIndex;// selectedIndex代表的是你所选中项的index
    document.getElementById("thead").innerHTML = selects.options[index].text;
    return selects.options[index].value;
}
function getxqdm() {
    var selects = document.getElementById("xqdm");
    var index = selects.selectedIndex;// selectedIndex代表的是你所选中项的index
    return selects.options[index].value;
}

document.getElementById("btnclick").onclick = timetable;
