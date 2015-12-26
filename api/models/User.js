/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    signup: function(input, response){
        User.query("SELECT * FROM app.signup('"+input.username+"','"+input.password+"', '"+input.firstname+"','"+input.lastname+"','"+input.email+"','"+input.phonenumber+"','"+input.country+"','"+input.city+"')", function(error, data){
            if(error){
                return response({error: true});
            }
            return response(data.rows[0]);
        });
    },
    login: function(input, response){
        User.query("SELECT * FROM app.login('"+input.username+"','"+input.password+"')", function(error, data){
            if(error){
                return response({error: true, errordesc: error});
            }
            return response(data.rows[0]);
        });
    },
    test: function(input, response){
        User.query("SELECT * FROM app.users", function(error, data){
            if(error){
                return response({error: true});
            }
            return response(data.row[0]);
        });
    },
    isauthenticated: function(input, response){
        User.query("SELECT * FROM app.isauthenticated('"+input.token+"')", function(error, data){
            if(error){
                return response({error: true});
            }
            //return response(data.rows[0]);
        });
    },
    logout: function(input, response){
        User.query("SELECT * FROM app.logout('"+input.token+"')", function(error, data){
            if(error){
                return response({error: true});
            }
            return response(data.rows[0]);
        });
    },
    getContactDetails: function(input, response){
        User.query("SELECT * FROM app.getcontactdetails('"+input.username+"')", function(error, data){
            if(error){
                return response({error: true});
            }
            return response(data.rows[0]);
        });
    }
};

