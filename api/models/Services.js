/**
* Services.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    getServiceCategories: function(response){
        Services.query("SELECT * FROM app.categories", function(error, data){
            if(error){
                return response({error: true});
            }
            return response(data.rows);
        });
    },
    getServices: function(input, response){
        Services.query("SELECT * FROM app.getservices('"+input.type+"')", function(error, data){
            if(error){
                return response({error: true});
            }
            return response(data.rows);
        });
    },
    getServicesByUser: function(input,response){
        Services.query("SELECT * FROM app.getservicesbyuser('"+input.username+"')", function(error, data){
            if(error){
                console.log(error)
                return response({error: true});
            }
            return response(data.rows);
        });
    },
    insertService: function(input, response) {
        Services.query("SELECT * FROM app.newservice('"+input.name+"', '"+input.categoryId+"', '"+input.createdBy+"','"+input.description+"','"+input.type+"', '"+input.latitude+"', '"+input.longitude+"')", function (error, data) {
           // Services.query("INSERT INTO app.services(name, categoryid, createdby, description, type) VALUES()", function(error, data){
        //Services.query("INSERT INTO app.services(name, categoryid) VALUES()", function(error, data){
         if (error) {
                return response({error: true});
            }
            return response(data.rows[0]);
        });
    },
    updateService: function(input, response) {
        Services.query("SELECT * FROM app.updateservice('"+input.serviceId+"', '"+input.name+"', '"+input.categoryId+"', '"+input.createdBy+"','"+input.description+"','"+input.type+"', '"+input.latitude+"', '"+input.longitude+"')", function (error, data) {
         if (error) {
             console.log(error)
                return response({error: true});
            }
            return response(data.rows[0]);
        });
    },
    deleteService: function(input, response) {
        Services.query("SELECT * FROM app.deleteservice('"+input.id+"')", function (error, data) {
         if (error) {
                return response({error: true});
            }
            return response(data.rows[0]);
        });
    },
    getLocations: function(response) {
        Services.query("SELECT * FROM app.getlocations()", function (error, data) {
         if (error) {
             console.log(error)
                return response({error: true});
            }
            return response(data.rows);
        });
    },
    getUsers: function(response) {
        Services.query("SELECT * FROM app.getusers()", function (error, data) {
         if (error) {
             console.log(error)
                return response({error: true});
            }
            return response(data.rows);
        });
    },

};

