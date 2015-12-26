/**
 * Created by Jeton on 5/12/2015.
 */
var map;
function loadMap(mapDiv) {
    var input = document.getElementById('mapSearch');
    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeControlOptions : {
            position : google.maps.ControlPosition.RIGHT_CENTER
        },
    };
    map = new google.maps.Map(document.getElementById(mapDiv), mapOptions);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    getLocation();
    var searchBox = new google.maps.places.SearchBox((input));
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
            if(mapDiv !== 'mapDashboard'){
                 Markers.serviceMarker = Markers.create(null, places[0].geometry.location.lat(), places[0].geometry.location.lng());
                 Markers.insert(Markers.serviceMarker);
            }
        map.setCenter(places[0].geometry.location);
        map.setZoom(14);
    });
    if(mapDiv !== 'mapDashboard') {
        google.maps.event.addListener(map, 'click', function (e) {
            if (Markers.serviceMarker !== null) {
                Markers.remove(Markers.serviceMarker);
            }
            Markers.serviceMarker = Markers.create(null, e.latLng.lat(), e.latLng.lng(), false);
            Markers.insert(Markers.serviceMarker);
        });
    }
}
$().ready(function(){
    loadMap('mapDashboard');
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(7);
}

function showError(err) {
    if (err) {
        map.setCenter(new google.maps.LatLng(30.246684, -97.763014));
    }
}

