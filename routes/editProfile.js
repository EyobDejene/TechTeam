/* eslint-disable no-console */
var express = require('express');
var router = express.Router();
var User = require('../models/users.model');
var multer = require('multer');
var upload = multer({dest: 'public/upload/'});


router.get('/', function(req, res) {
    
    User.findOne({_id: req.session.user}, function(err, users){
            res.render('editProfile', {title: 'Edit your profile', users: users}
            );
        });
});

router.post('/',upload.single('avatar') ,function(req, res){
    console.log("a post came in with body", req.body);

     var uploadImage;

    //If no image is uploaded the avatar will stay the same
     if(req.file == undefined){
         uploadImage = req.session.avatar;
         }
  
    //If image is uploaded the avatar
    else{
        uploadImage = req.file.filename;
        }


    User.findByIdAndUpdate(
        {_id: req.session.user},
        {bio: req.body.bio, age: req.body.age, skill_level: req.body.skillLevel, running_scheme: req.body.scheme, practice_time: req.body.time, max_distance:req.body.maxDistance, avatar: uploadImage}, 
        {upsert: true}, function(err, result){
            if(err){
                console.log("post resulted in error", err);
            }
            else{
                console.log('gelukt', result);
                res.redirect('/editProfile');
            }
        }   
    );

});




module.exports = router;