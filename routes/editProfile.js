var express = require('express');
var editProfile = express.Router();
var User = require('../models/users.model');

editProfile.get('/', function(req, res) {
    
    User.findOne({_id: process.env.SESSION_SECRECT}, function(err, users){

            res.render('editProfile', {title: 'Edit your profile', users: users});
        
        
    });


    
});

module.exports = editProfile;