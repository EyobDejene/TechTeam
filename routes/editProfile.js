/* eslint-disable no-console */
var express = require('express');
var router = express.Router();
var User = require('../models/users.model');
var multer = require('multer');
var upload = multer({dest: 'public/upload/'});

// gets the .editProfile route
router.get('/', function(req, res) {
    // finds user that is currently logged in, and renders that in the edit profile page
    User.findOne({_id: req.session.user}, function(err, users){
            res.render('editProfile', {title: 'Edit your profile', users: users}
            );
        });
});

// handles the post request on the editProfile page
router.post('/',upload.single('avatar') ,function(req, res){

    // variable for storing the img upload
     var uploadImage;

    //If no image is uploaded the avatar will be the current user's avatar
     if(req.file == undefined){
         uploadImage = req.session.avatar;
         }
  
    //If image is uploaded the avatar is overwritten with new img
    else{
        uploadImage = req.file.filename;
        }

    // updates the user's bio, age, skill level, running scheme, weeek or month scheme, practice time, max distance, and avatar
    User.findByIdAndUpdate(
        {_id: req.session.user},
        {bio: req.body.bio, age: req.body.age, skill_level: req.body.skillLevel, running_scheme: req.body.scheme, practice_time: req.body.time, max_distance:req.body.maxDistance, avatar: uploadImage}, 
        {upsert: true}, function(){
                // redirects to the editProfile page when form is submitted
                res.redirect('/editProfile');

        }   
    );

});

//exports router module
module.exports = router;