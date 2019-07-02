var place;
var val;

window.onload = function() { 
    handleRefresh();
}

function handleRefresh() {
	console.log("here");
	var url="http://openapi.seoul.go.kr:8088/52624a47577965743732556a674d4a/json/CgcHstClturCntnts/1/39/";
	$.getJSON(url, updateCulture);
}

function updateCulture(culture) {
    var mapBtn=document.getElementById("mapBtn");
    var cultureDiv = document.getElementById("culture");
    var cultureNum = culture.CgcHstClturCntnts.row;
    var div = document.createElement("div");
    var places=document.getElementById("places");
    var infoDiv = document.getElementById("info");
    
    div.innerHTML="<p><table style='width:98%;align:center;margin-left:1%'><tr><th style='width:20%;'>이름</th><th>간략한 소개</th></tr></table><hr><p>";
    
    for (var i = 0; i < cultureNum.length; i++) {
        
        
        div.innerHTML+="<table style='width:98%;align:center;margin-left:1%'><tr><td style='width:20%;color:black;'><div>"+cultureNum[i].NM+"</div></td><td style='width:45%;text-align:justify;'>"+cultureNum[i].INTRCN_SNTNC
        +"</td></tr></table><hr>";
        
            if (cultureDiv.childElementCount == 0) {
            	cultureDiv.appendChild(div);
            } else {
            	cultureDiv.insertBefore(div, cultureDiv.firstChild);
            }
        
            place+="<option value="+cultureNum[i].COT_CONTS_NAME+">"+cultureNum[i].NM+"</option>";
    }//for
    places.innerHTML=place;    
    
    mapBtn.onclick=function(){
        for(i=0; i<places.options.length; i++){
            if(places.options[i].selected==true){
                val=places.options[i].text;
                if(val==cultureNum[i].NM){
                    infoDiv.innerHTML="<p><table><tr><td colspan=2><b>"+cultureNum[i].NM+"</b><hr></td></tr><tr><td style='width:20%;' >명칭(한글) : <p></td><td>"+cultureNum[i].NM+"<p></td></tr><tr><td>소개글(한글) : <p></td><td>"+cultureNum[i].INTRCN_SNTNC+"<p></td></tr><tr><td>상세내용(한글) : <p></td><td>"+cultureNum[i].DETAIL_CN+"<p></td></tr><tr><td>각주 : <p></td><td>"+cultureNum[i].FINT+"<p></td></tr><tr><td>명칭(영어) : <p></td><td>"+cultureNum[i].NM_ENG+"<p></td></tr><tr><td>소개글(영어) : <p></td><td>"+cultureNum[i].INTRCN_SNTNC_ENG+"<p></td></tr><tr><td>상세내용(영어) : <p></td><td>"+cultureNum[i].DETAIL_CN_ENG+"<p></td></tr><tr><td>명칭(일어) : <p></td><td>"+cultureNum[i].NM_JPNSNT+"<p></td></tr><tr><td>소개글(일어) : <p></td><td>"+cultureNum[i].INTRCN_SNTNC_JPNSNT+"<p></td></tr><tr><td>상세내용(일어) : <p></td><td>"+cultureNum[i].DETAIL_CN_JPNSNT+"<p></td></tr><tr><td>명칭(중국어) : <p></td><td>"+cultureNum[i].NM_CHNSNT+"<p></td></tr><tr><td>소개글(중국어) : <p></td><td>"+cultureNum[i].INTRCN_SNTNC_CHNSNT+"<p></td></tr><tr><td>상세내용(중국어) : <p></td><td>"+cultureNum[i].DETAIL_CN_CHNSNT+"<p></td></tr></table>";
                }//if
            }//if
        }//for
        
    }//mapBtn.onclick
    
 }//updateCulture
