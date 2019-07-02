
//window.onload = getMyLocation;
window.onload = showMap;

//function getMyLocation() {
//
//	if (navigator.geolocation) {
//
//		//navigator.geolocation.getCurrentPosition(showMap);
//		navigator.geolocation.getCurrentPosition(
//				showMap, displayError,{enableHighAccuracy:true,maximumAge:60000});
//	
//	}
//	else {
//		alert("위치지원이 되지 않습니다.");
//	}
//	
//	
//	
//	
//}
//
//function displayError(error) {
//	var errorTypes = {
//		0: "알려지지 않은 에러",
//		1: "사용자가 권한 거부",
//		2: "위치를 찾을 수 없음",
//		3: "요청 응답 시간 초과"
//	};
//	var errorMessage = errorTypes[error.code];
//	if (error.code == 0 || error.code == 2) {
//		errorMessage = errorMessage + " " + error.message;
//	}
//	var div = document.getElementById("location");
//	div.innerHTML = errorMessage;
//}
function showMap() {
	//var googleLatAndLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	//var mapOptions = {
	//	zoom: 15,
	//	center: googleLatAndLong,
	//	mapTypeId: google.maps.MapTypeId.ROADMAP
	//};
	
	
	
	var mapDiv = document.getElementById("gmap");
	//var map = new google.maps.Map(mapDiv, mapOptions);
	var mirim={lat:37.466324,lng:126.9307193};
	var map=new google.maps.Map(mapDiv,{zoom:15,center:mirim});
	var marker=new google.maps.Marker({position:mirim,map:map});
   
	showSearch(map);
	
//    var url = "lattest.json";
//	var request = new XMLHttpRequest();
//	request.open("GET",url);
//	request.onload = function(){
//		if(request.status == 200){
//			var subways = JSON.parse(request.responseText);
//			for(var i = 0; i < subways.length; i++){
////				var LT = new google.maps.LatLng(subways[i].lat, subways[i].lng);
//				
////				var markerOptions = {
////					position : LT,
////					map : map,
////					title : "역",
////					icon:"point.png"
////				};
////				addMarker(map, LT, subways[i].jibun, subways[i].gibun, "yes");//나의 위치 표시
//			}//for
//		}//if
//	};
	request.send(null);
    //var title = "현재 위치";
	//var content = "당신의 현재 위치입니다.";
	//addMarker(map, googleLatAndLong, title, content, "no");//나의 위치 표시
	/*googleLatAndLong 에는 현대위치를 저장*/
}

function addMarker(map, latlong, title, content, iconcheck){
	if(iconcheck == "no"){
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};

	var marker = new google.maps.Marker(markerOptions);
	}
	if(iconcheck == "yes"){
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		icon: "img/point.png",
		clickable: true
	};

	var marker = new google.maps.Marker(markerOptions);
	
	}//if
}

function showSearch(map){
	var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      
   // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
       

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: "img/point.png",
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
}
