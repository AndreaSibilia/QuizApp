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
	L.marker([x,y]).addTo(mymap).bindPopup("This is your location").openPopup();
	return [x,y]
}
