function loadPointData() {
	// call the getEarthquakes code
	// keep the alert message so that we know something is happening
	alert("Loading Points");
	getPoint();
}
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
var client;
//
//var pointlayer;

// create the code to get the GeoJSON data using an XMLHttpRequest
function getPoint() {
	client = new XMLHttpRequest();
	client.open('GET','http://developer.cege.ucl.ac.uk:30279/getGeoJSON/questionform/geom');
	client.onreadystatechange = pointResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function pointResponse() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// once the data is ready, process the data
		var pointdata = client.responseText;
		loadPointlayer(pointdata);
	}
}

// convert the received data - which is text - to JSON format and add it to the map
function loadPointlayer(pointdata) {
	// convert the text to JSON
	var pointjson = JSON.parse(pointdata);
	// add the JSON layer onto the map - it will appear using the default icons
	pointlayer = L.geoJson(pointjson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(pointlayer.getBounds());
}















