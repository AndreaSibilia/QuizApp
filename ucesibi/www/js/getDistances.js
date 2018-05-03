function getDistance() {
	alert('getting distance');
	// getDistanceFromPoint is the function called once the distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}


var pointlayer;

function getDistanceFromPoint(position) {
	var myJson = pointlayer.toGeoJSON().features;
	var searchRadius = 0.2
	var minDist = []
	// return the distance in kilometers
	for (var i=0; i < myJson.length; i++){
		var lat = myJson[i].geometry.coordinates[1];
		var lng = myJson[i].geometry.coordinates[0];
		minDist [i] = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng);
		console.log(minDist[i]);
	}
	console.log(minDist);
	var minimum = Math.min.apply(null, minDist);
	var minIndex = minDist.indexOf(minimum);
	console.log(minimum);
	console.log(minIndex);
	var myQuestions = pointlayer.toGeoJSON().features[minIndex].properties;
	console.log(myQuestions["question"]);
	document.getElementById('showQuestions').innerHTML = "Question: " + myQuestions["question"];
	document.getElementById('showQ1').innerHTML = "Option A: " + myQuestions["q1"];
	document.getElementById('showQ2').innerHTML = "Option B: " + myQuestions["q2"];
	document.getElementById('showQ3').innerHTML = "Option C: " + myQuestions["q3"];
	document.getElementById('showQ4').innerHTML = "Option D: " + myQuestions["q4"];
	if (minimum <= searchRadius){
		alert("You're near a building! Scroll down to see the question.");
	} else if (minimum > searchRadius) {
		alert("You are far from the game.")
	}
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

//getDistance()