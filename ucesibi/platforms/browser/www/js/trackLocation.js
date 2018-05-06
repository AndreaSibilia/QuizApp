var oldMarker;

function trackLocation(){
	if(navigator.geolocation){
		alert("tracking enabled");
		navigator.geolocation.watchPosition(showPosition);
		navigator.geolocation.getCurrentPosition(getDistance);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}


function showPosition(position){
	if (oldMarker){
		mymap.removeLayer(oldMarker);
	}
	document.getElementById('showLocation').innerHTML = " Your coordinates - Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
	oldMarker = L.circleMarker([position.coords.latitude,position.coords.longitude], {radius: 5}).addTo(mymap).bindPopup("This is your location").openPopup();
	mymap.setView([position.coords.latitude, position.coords.longitude], 25);
}