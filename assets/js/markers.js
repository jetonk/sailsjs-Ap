/**
 * Created by Jeton on 5/21/2015.
 */
var Markers = {
    tmp: {},
    serviceMarker: null,
    create: function (id, lat, lng, dragg) {
        return new google.maps.Marker({
            draggable: dragg,
            position: new google.maps.LatLng(lat, lng),
            /*icon: '../images/marker/chp' + number + '.png',*/
            id: id
        });
    },
    push: function(id, lat, lng){
        this.tmp[id] = {
            marker: this.create(id, lat, lng)
        };
    },
    insert: function (id) {
        id.setMap(map);
    },
    remove: function (id) {
        id.setMap(null);
    },
    attachEvent: function(marker) {
        return google.maps.event.addListener(marker, 'click', function (e){
            var data = APP.tmpServices[marker.id];
            $('#markerModal').modal('show');
            $('#serviceName').text(data.name);
            $('#serviceCategory').text(data.categoryname);
            $('#serviceDescription').text(data.description);
            if(data.type == 'offer'){
                $('#headerTitle').text('Service Offer');
            }else{
                $('#headerTitle').text('Service Need');
            }
            var username = APP.getCookie('username');
            API.getContactdetails(username, function(response){
                $('#servicePhoneNumber').text(response.phone_number);
                $('#serviceEmail').text(response.email_address);
            });
        });
    }
};
