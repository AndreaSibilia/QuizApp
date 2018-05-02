function getDistance() {
	alert('getting distance');
	// getDistanceFromPoint is the function called once the distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}

function getDistanceFromPoint(position) {
	// find the coordinates of a point using this website:
	// these are the coordinates for my home in Italy
	var listCoords = [[51.52462, -0.13795],[51.52581, -0.13488],[51.52145, -0.13516],[51.52247, -0.13265]];
	var minDist = []
	// return the distance in kilometers
	for (var i=0; i < listCoords.length; i++){
		var lat = listCoords[i][0]
		var lng = listCoords[i][1]
		minDist [i] = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');	
	}
	console.log(minDist);
	var minimum = Math.min.apply(null, minDist);
	document.getElementById('showDistance').innerHTML = "Distance: " + minimum;
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
	// where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
	return dist;
}