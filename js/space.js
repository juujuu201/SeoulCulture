var place;
var val;

window.onload = function() { 
    handleRefresh();
}

function handleRefresh() {
	console.log("here");
	var url="http://openapi.seoul.go.kr:8088/52624a47577965743732556a674d4a/json/culturalSpaceInfo/1/822/";
	$.getJSON(url, updateCulture);
}

function updateCulture(culture) {
    var mapBtn=document.getElementById("mapBtn");
    var cultureDiv = document.getElementById("culture");
    var cultureNum = culture.culturalSpaceInfo.row;
    var div = document.createElement("div");
    var places=document.getElementById("places");
    var infoDiv = document.getElementById("info");
    
    div.innerHTML="<p><table style='width:98%;align:center;margin-left:1%'><tr><th style='width:30%;'>이름</th><th style='width:45%;'>문의</th></tr></table><hr><p>";
    
    for (var i = 0; i < cultureNum.length; i++) {
        
        
        div.innerHTML+="<table style='width:98%;align:center;margin-left:1%'><tr><td style='width:30%;color:black;'><div>"+cultureNum[i].FAC_NAME+"</div></td><td style='width:45%;text-align:justify;'>"+cultureNum[i].PHNE
        +"</td></tr></table><hr>";
        
            if (cultureDiv.childElementCount == 0) {
            	cultureDiv.appendChild(div);
            } else {
            	cultureDiv.insertBefore(div, cultureDiv.firstChild);
            }
        
            place+="<option value="+cultureNum[i].FAC_NAME+">"+cultureNum[i].FAC_NAME+"</option>";
    }//for
    places.innerHTML=place;    
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.466324,126.9307193), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(37.466324,126.9307193); 
    
    map.setCenter(markerPosition);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    
    
    mapBtn.onclick=function(){
        for(i=0; i<places.options.length; i++){
            if(places.options[i].selected==true){
                val=places.options[i].text;
                if(val==cultureNum[i].FAC_NAME){
                    var x=cultureNum[i].X_COORD;
                    var y=cultureNum[i].Y_COORD;
//                    alert(x+", "+y);
                    var moveLatLon = new kakao.maps.LatLng(x, y);

                    // 지도 중심을 이동 시킵니다
                    map.setCenter(moveLatLon);
                    var markerPosition  = new kakao.maps.LatLng(x,y); 

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);
                }//if
            }//if
        }//for
        
    }//mapBtn.onclick
    
 }//updateCulture
