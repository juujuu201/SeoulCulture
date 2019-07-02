var place;
var val;

window.onload = function() { 
    handleRefresh();
}

function handleRefresh() {
	console.log("here");
	var url="http://openapi.seoul.go.kr:8088/52624a47577965743732556a674d4a/json/"
						+"Mgisliteraturemap/1/87/";
	$.getJSON(url, updateCulture);
}

function updateCulture(culture) {
    var mapBtn=document.getElementById("mapBtn");
    var cultureDiv = document.getElementById("culture");
    var cultureNum = culture.Mgisliteraturemap.row;
    var div = document.createElement("div");
    var places=document.getElementById("places");
    var infoDiv = document.getElementById("info");
    
    div.innerHTML="<p><table style='width:98%;align:center;margin-left:1%'><tr><th style='width:15%;'>이름</th><th style='width:45%;'>소개</th><th style='width:25%;'>오시는 길</th><th style='width:15%;'>문의</th></tr></table><hr><p>";
    
    for (var i = 0; i < cultureNum.length; i++) {
        
        
        div.innerHTML+="<table style='width:98%;align:center;margin-left:1%'><tr><td style='width:15%;color:black;'><div>"+cultureNum[i].COT_CONTS_NAME+"</div></td><td style='width:45%;text-align:justify;'>"+cultureNum[i].COT_VALUE_02
        +"</td><td width='25%;'>"+cultureNum[i].COT_VALUE_05+"</td><td style='width:15%;'>"+cultureNum[i].COT_VALUE_07+"</td></tr></table><hr>";
        
            if (cultureDiv.childElementCount == 0) {
            	cultureDiv.appendChild(div);
            } else {
            	cultureDiv.insertBefore(div, cultureDiv.firstChild);
            }
        
            place+="<option value="+cultureNum[i].COT_CONTS_NAME+">"+cultureNum[i].COT_CONTS_NAME+"</option>";
    }//for
    places.innerHTML=place;    
    
    mapBtn.onclick=function(){
        for(i=0; i<places.options.length; i++){
            if(places.options[i].selected==true){
                val=places.options[i].text;
                if(val==cultureNum[i].COT_CONTS_NAME){
                    infoDiv.innerHTML="<p><table><tr><td colspan=2><b>"+cultureNum[i].COT_CONTS_NAME+"</b><hr></td></tr><tr><td style='width:20%;' >"+cultureNum[i].COT_NAME_01+" : <p></td><td>"+cultureNum[i].COT_VALUE_01+"<p></td></tr><tr><td>"+cultureNum[i].COT_NAME_02+" : <p></td><td>"+cultureNum[i].COT_VALUE_02+"<p></td></tr><tr><td>"+cultureNum[i].COT_NAME_03+" : <p></td><td>"+cultureNum[i].COT_VALUE_03+"<p></td></tr><tr><td>"+cultureNum[i].COT_NAME_04+" : <p></td><td>"+cultureNum[i].COT_VALUE_04+"<p></td></tr><tr><td>구주소 : <p></td><td>"+cultureNum[i].COT_ADDR_FULL_OLD+"<p></td></tr><tr><td>"+cultureNum[i].COT_NAME_05+" : <p></td><td>"+cultureNum[i].COT_VALUE_05+"<p></td></tr><tr><td>"+cultureNum[i].COT_NAME_07+" : <p></td><td>"+cultureNum[i].COT_VALUE_07+"<p></td></tr></table>";
                }//if
            }//if
        }//for
        
    }//mapBtn.onclick
    
 }//updateCulture
