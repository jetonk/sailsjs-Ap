/**
 * Created by Jeton on 5/22/2015.
 */
//Load Data
API.getLocations(function(response){
    for (var key in response){
        data = response[key];
        APP.tmpServices[data.serviceid] = {
            name: data.name,
            categoryname: data.categoryname,
            description: data.description,
            createdby: data.createdby,
            serviceid: data.serviceid,
            type: data.type
        };
        Markers.push(response[key].serviceid, response[key].latitude, response[key].longitude);
    }
    APP.showMarkers();
    for(var key in Markers.tmp){
        Markers.attachEvent(Markers.tmp[key].marker);
    }
});


/*API.getUsers(function(response){
 console.log(response);
 APP.tmpUsers = response;
 });*/
