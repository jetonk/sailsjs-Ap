/**
 * Created by Jeton on 5/16/2015.
 */
var APP = {
    tmpServices: {},
    updateServiceId: 0,
    tmpUsers: null,
    tmpContact: null,
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    },
    destroyCookie: function(){
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.href = APP_URL + 'login';
    },
    setToken: function(token){
        document.cookie = 'token='+token;
    },
    setUsername: function(username){
        document.cookie = 'username='+username;
    },
    navigation: function(view){
        window.location = APP_URL + view;
    },
    clearForm: function(formclass){
        $('.' + formclass ).val('');
    },
    servicesCategory: function(){
      API.getServicesCategory(function(data){
          var option = '<option value="">Select Category</option>';
          for(var key in data){
              option += '<option value='+data[key].categoryid+'>'+data[key].categoryname+'</option>';
          }
         $('#servicesCategory').html(option);
      });
    },
    showServices: function(data){
        var tbl = '';
        for(var key in data){
            tbl += '<tr><td>'+data[key].servicename+'</td> <td>'+data[key].categoryname+'</td> <td><label class="label label-info">'+data[key].createdby+'</label></td><td>' +
            '<label class="label label-success">'+data[key].type+'</label></td><td>'+new Date(data[key].date).toDateString()+'</td><td> ' +
            '<a id="btnContact" createdby="'+data[key].createdby+'" class="btn btn-xs btn-danger">Contact</a> </td> </tr>';
        }
        $('#tblServices tbody').html(tbl);
    },
    showServicesByUser: function(data){
        var tbl = '';
        if(data.length === 0){
            tbl = '<span>You don\'t have any Services</span>';
        }else{
            for(var key in data){
                tbl += '<tr><td>'+data[key].servicename+'</td> <td>'+data[key].categoryname+'</td> <td>' +
                '<label class="label label-success">'+data[key].type+'</label></td><td>'+new Date(data[key].date).toDateString()+'</td><td> ' +
                '<span id="btnEditService" serviceid="'+data[key].id+'" class="glyphicon glyphicon-edit smallbtns"> <span id="btnRemoveService" serviceid="'+data[key].id+'" class="glyphicon glyphicon-remove-circle smallbtns redbtn"></td> </tr>';
            }
        }
        $('#tblServicesByUser tbody').html(tbl);
    },
    editService: function(data, serviceid){
        var editServiceId;
        for(var key in data){
            if(data[key].id == serviceid){
                editServiceId = data[key].id;
                $('#txtServiceName').val(data[key].servicename);
                $('#servicesCategory').val(data[key].categoryid);
                $('#serviceType').val(data[key].type);
                $('#txtServicesDescription').val(data[key].description);
            }
        }

    },
    search: function(value){
        $("table tr").each(function (index) {
            if (!index) return;
            $(this).find("td").each(function () {
                var id = $(this).text().toLowerCase().trim();
                var not_found = (id.indexOf(value) == -1);
                $(this).closest('tr').toggle(!not_found);
                return not_found;
            });
        });
    },
    contact: function(username){
        $('#appModal').modal('show')
        API.getContactdetails(username, function(response){
            $('.modal-title').text('Contact '+ username);
            $('#contactPhone').text(response.phone_number);
            $('#contactEmail').text(response.email_address);

        });
    },
    showMarkers: function(){
       for(var key in Markers.tmp){
          Markers.insert(Markers.tmp[key].marker);
       }
    }
}