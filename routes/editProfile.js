var express = require('express');
var editProfile = express.Router();

editProfile.get('/', function(req, res) {

    res.render('editProfile', {title: 'Edit your profile',});
});

module.exports = editProfile;