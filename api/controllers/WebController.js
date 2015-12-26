/**
 * WebController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    dashboard: function(req, res){
        res.view('dashboard');
    },
    serviceoffers: function(req, res){
        res.view('serviceoffers');
    },
    serviceneeds: function(req, res){
        res.view('serviceneeds');
    },
    newservice: function(req, res){
        res.view('newservice');
    },
    login: function(req, res) {
        res.view('login');
    }
};

