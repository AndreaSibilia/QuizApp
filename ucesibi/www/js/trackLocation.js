function trackLocation(){
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position){
	document.getElementById('showLocation').innerHTML = " Your coordinates - Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
	var x = position.coords.latitude;
	var y = position.coords.longitude;
	L.circleMarker([x,y], {radius: 5}).addTo(mymap).bindPopup("This is your location").openPopup();
	mymap.setView([position.coords.latitude, position.coords.longitude], 25);
	return [x,y]
	
}
