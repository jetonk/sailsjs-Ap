/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	signup: function(req, res){
        var inputs = {
            username: req.param('username'),
            password: req.param('password'),
            firstname: req.param('firstname'),
            lastname: req.param('lastname'),
            email: req.param('email'),
            phonenumber: req.param('phonenumber'),
            country: req.param('country'),
            city: req.param('city')

        };
        var validate = Validator.paramaters(inputs);
        if(validate === true){
            User.signup(inputs, function(response){
                res.json(response);
            });
        }else{
            Validator.missing.forEach(function(param){
                res.send(param + ' is required.');
            });
        }
    },
    login: function(req, res){
        var inputs = {
            username: req.param('username'),
            password: req.param('password')
        };
        var validate = Validator.paramaters(inputs);
        if(validate === true){
            User.login(inputs, function(response){
                if(response.resflag === true){
                    return res.json(response);
                }else{
                    res.json(response);
                }
            });
        }else{
            Validator.missing.forEach(function(param){
                res.send(param + ' is required.');
            });
        }
    },
    isauthenticated: function(req, res){
        var inputs = {
            token: req.param('token')
        }
        User.isauthenticated(inputs, function(response){
            if(response.resflag === true){
                return res.json(response);
            }else{
                res.json(response);
            }
        });
    },
    logout: function(req, res){
        var inputs = {
            token: req.param('token')
        };
        User.logout(inputs, function(response){
            if(response.resflag === true){
                return res.json(response);
            }else{
                res.json(response);
            }
        });
    },
    getContactDetails: function(req, res){
        var inputs = {
            username: req.param('username')
        };
        User.getContactDetails(inputs, function(response){
            if(response.resflag === true){
                return res.json(response);
            }else{
                res.json(response);
            }
        });
    },

};

