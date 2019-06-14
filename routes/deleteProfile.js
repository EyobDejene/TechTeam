/* eslint-disable no-console */
var express = require('express');
var router = express.Router();
var User = require('../models/users.model');


router.get('/', function(req, res) {
    
    User.findOne({_id: req.session.user}, function(err, users){
            res.render('deleteProfile', {title: 'WARNING: Deleting your account!', users: users}
            );
        });
});





module.exports = router;