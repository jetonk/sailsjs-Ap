/**
 * ServicesController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getServiceCategories: function(req, res){
        Services.getServiceCategories(function(response){
           res.json(response);
        });
    },
    getServices: function(req, res){
        var inputs = {
            type: req.param('type')
        };
        Services.getServices(inputs, function(response){
            return res.json(response);
        });
    },
    getServicesByUser: function(req, res){
        var inputs = {
            username: req.param('username')
        };
        Services.getServicesByUser(inputs, function(response){
            if(response.resflag === true){
                return res.json(response);
            }else{
                res.json(response);
            }
        });
    },
    addNewService: function(req, res){
        var inputs = {
            name: req.param('name'),
            categoryId: parseInt(req.param('categoryId')),
            createdBy: req.param('createdBy'),
            description: req.param('description'),
            type: req.param('type'),
            latitude: req.param('latitude'),
            longitude: req.param('longitude')
        };
       Services.insertService(inputs, function(response){
           if(response.resflag === true){
               return res.json(response);
           }else{
               res.json(response);
           }
        });
    },
    updateService: function(req, res){
        var inputs = {
            serviceId: parseInt(req.param('serviceId')),
            name: req.param('name'),
            categoryId: parseInt(req.param('categoryId')),
            createdBy: req.param('createdBy'),
            description: req.param('description'),
            type: req.param('type'),
            latitude: req.param('latitude'),
            longitude: req.param('longitude')
        };
       Services.updateService(inputs, function(response){
           if(response.resflag === true){
               return res.json(response);
           }else{
               res.json(response);
           }
        });
    },
    deleteService: function(req, res){
        var inputs = {
            id: req.param('id')
        };
        Services.deleteService(inputs, function(response){
               return res.json(response);
        });
    },
    getLocations: function(req, res){
        Services.getLocations(function(response){
               return res.json(response);
        });
    },
    getUsers: function(req, res){
        Services.getUsers(function(response){
               return res.json(response);
        });
    }
};

