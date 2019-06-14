/* eslint-disable no-console */
var express = require('express');
var router = express.Router();
var User = require('../models/users.model');


router.get('/', function (req, res) {
    // let query = { _id: req.session.user };
    User.remove({_id: req.session.user}, function (err) {
        console.log('Hallo');
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
  });


module.exports = router;