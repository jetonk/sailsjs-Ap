$('#btnLogin').click(function(){
    Validate.inputs('form-control');
    if(Validate.passed()){
    API.login(function(response){
        if(response.resflag === true){
            APP.setToken(response.token);
            APP.setUsername(response.useraccount);
            APP.navigation('');
        }else{
            alert(response)
        }
    });
    }else{
        Validate.showError();
    }
});
$('#btnShowSignup').click(function(){
    APP.navigation('signup');
});

$('#btnLogout').click(function(){
    var token = APP.getCookie('token');
    API.logout(token, function(){
        APP.destroyCookie();
    });
});


$('#btnHome').click(function(){
   APP.navigation('');
    API.getLocations(function(response){
        for (var key in response){
            Markers.push(response[key].serviceid, response[key].latitude, response[key].longitude);
        }
    });
});

$('.btnServiceOffers').click(function(){
    HTML.set('mainDIV', 'serviceOffers');
    API.getServices('offer', function(response){
        APP.showServices(response);
    });
});
$('.btnServiceNeeds').click(function(){
    HTML.set('mainDIV', 'serviceNeeds');
    API.getServices('need', function(response){
        APP.showServices(response);
    });
});
$('body').on('click', '#btnManageMyServices', function(){
    HTML.set('mainDIV', 'manageMyServices');
    APP.servicesCategory();
    API.getServicesByUser(function(response){
        APP.showServicesByUser(response);
        loadMap('mapManage');
    });
});

$('body').on('click', '#btnClearForm', function(){
    Markers.remove(Markers.serviceMarker);
    Markers.serviceMarker = null;
    APP.clearForm('form-control');
    $('.panelDesc').text('Add New Service');
    $('#btnSubmitService').text('Submit')
    $('#btnSubmitService').attr('role', 'add');
});

$('#btnSignup').click(function(){
    Validate.inputs('form-control')
    if(Validate.passed()){
        API.signup(function(response){
            if(response.resflag === true){
                $('#showMsg').text(response.msg).show();
            }
        });
    }else{
        Validate.showError();
    }
});
$('body').on('click', '#btnSubmitService', function(){
    if(Markers.serviceMarker === null){
        alert('Please select location on the map.');
        return;
    }
    var role = $(this).attr('role');
    Validate.inputs('form-control');
    if(Validate.passed()){
        if(role === 'add'){
            API.addNewService(function(response){
                if(response.resflag === true){
                    Markers.remove(Markers.serviceMarker);
                    Markers.serviceMarker = null;
                    $('#showMsg').text(response.msg).show();
                    API.getServicesByUser(function(response){
                        APP.showServicesByUser(response);
                    });
                }
            });
        }else{
            API.updateService(function(response){
                if(response.resflag === true){
                    Markers.remove(Markers.serviceMarker);
                    Markers.serviceMarker = null;
                    APP.clearForm('form-control');
                    $('#showMsg').text(response.msg).show();
                    API.getServicesByUser(function(response){
                        APP.showServicesByUser(response);
                    });
                }
            });
        }
    }else{
        Validate.showError();
    }
});
$('body').on('click', '#btnRemoveService', function(){
    var serviceid = $(this).attr('serviceid');
    API.deleteService(serviceid, function(response){
        if(response.resflag === true){
            API.getServicesByUser(function(response){
                APP.showServicesByUser(response);
            });
        }
    });
});

$('body').on('click', '#btnEditService', function(){
    APP.updateServiceId = parseInt($(this).attr('serviceid'));
    $('.panelDesc').text('Update Service');
    $('#btnSubmitService').text('Update')
    $('#btnSubmitService').attr('role', 'update');
    APP.editService(APP.tmpServices, APP.updateServiceId);
    if (Markers.serviceMarker !== null) {
        Markers.remove(Markers.serviceMarker);
    }
    var marker = Markers.tmp[APP.updateServiceId].marker;
    Markers.insert(marker);
    map.setCenter(marker.getPosition());
    Markers.serviceMarker = marker;
});

$('body').on('click', '#btnContact', function(){
    var username = $(this).attr('createdby');
    APP.contact(username);
});
$().ready(function(){
    $('body').on('keyup', '.search', function(){
        var value = this.value.toLowerCase().trim();
        $("table tr").each(function (index) {
            if (!index) return;
            $(this).find("td").each(function () {
                var id = $(this).text().toLowerCase().trim();
                var not_found = (id.indexOf(value) == -1);
                $(this).closest('tr').toggle(!not_found);
                return not_found;
            });
        });
    });
});

$('#btnBackToLogin').click(function(){
   APP.navigation('login');
});

$('#btnBackToLogin').click(function(){
    
});