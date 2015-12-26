/**
 * Created by Jeton on 5/16/2015.
 */
var API = {
    inputs: {},
    request: function(type, func, callback){
        $.ajax({
            type: type,
            url: API_URL + func,
            data: this.inputs,
            complete: callback
        });
    },
    login: function(callback){
        this.inputs.username = $('#username').val();
        this.inputs.password = $('#password').val();
        this.request('POST', 'login', function(response){
            callback(response.responseJSON);
        });
    },
    signup: function(callback){
        this.inputs.username =  $('#username').val();
        this.inputs.password = $('#password').val();
        this.inputs.firstname = $('#firstName').val();
        this.inputs.lastname = $('#lastName').val();
        this.inputs.email = $('#email').val();
        this.inputs.phonenumber = $('#phoneNumber').val();
        this.inputs.country = $('#country').val();
        this.inputs.city =  $('#city').val();
        this.request('POST', 'signup', function(response){
            callback(response.responseJSON);
        });
    },
    logout: function(token, callback){
        this.inputs.token = token;
        this.request('POST', 'logout', function(response){
            callback(response.responseJSON);
        });
    },
    getContactdetails: function(username, callback){
        this.inputs.username = username;
        this.request('POST', 'getcontactdetails', function(response){
            callback(response.responseJSON);
        });
    },
    getServicesCategory: function(callback){
        this.request('POST', 'servicecategories', function(response){
            callback(response.responseJSON);
        });
    },
    getServices: function(type, callback){
        this.inputs.type = type;
        this.request('POST', 'getservices', function(response){
            callback(response.responseJSON);
        });
    },
    getServicesByUser: function(callback){
        this.inputs.username = APP.getCookie('username');
        this.request('POST', 'getservicesbyuser', function(response){
            APP.tmpServices = response.responseJSON;
            callback(response.responseJSON);
        });
    },
    addNewService: function(callback){
        this.inputs.name = $('#txtServiceName').val();
        this.inputs.description = $('#txtServicesDescription').val();
        this.inputs.categoryId = $('#servicesCategory').val();
        this.inputs.type = $('#serviceType').val();
        this.inputs.createdBy = APP.getCookie('username');
        this.inputs.latitude = Markers.serviceMarker.getPosition().lat();
        this.inputs.longitude = Markers.serviceMarker.getPosition().lng();
        this.request('POST', 'addnewservice', function(response){
            callback(response.responseJSON);
        });
    },
    updateService: function(callback){
        this.inputs.serviceId = APP.updateServiceId;
        this.inputs.name = $('#txtServiceName').val();
        this.inputs.description = $('#txtServicesDescription').val();
        this.inputs.categoryId = $('#servicesCategory').val();
        this.inputs.type = $('#serviceType').val();
        this.inputs.createdBy = APP.getCookie('username');
        this.inputs.latitude = Markers.serviceMarker.getPosition().lat();
        this.inputs.longitude = Markers.serviceMarker.getPosition().lng();
        this.request('POST', 'updateservice', function(response){
            callback(response.responseJSON);
        });
    },
    deleteService: function(id, callback){
        this.inputs.id = id;
        this.request('POST', 'deleteservice', function(response){
            callback(response.responseJSON);
        });
    },
    getLocations: function(callback){
        this.request('POST', 'getlocations', function(response){
            callback(response.responseJSON);
        });
    },
    getUsers: function(callback){
        this.request('POST', 'getusers', function(response){
            callback(response.responseJSON);
        });
    }
};
