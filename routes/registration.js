var express = require('express');
var usersModel = require('../models/users.model');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('registration');

});


router.post('/', async function (req, res, next) {
  
  let model = new usersModel(req.body);
  model.save()
     .then(doc => {
       if(!doc || doc.length === 0){
         return res.status(500).send(doc);
       }
     }).then(async function(){
        var user = await usersModel.find({email: req.body.email});
         req.session.user = user[0]._id;
         req.session.userName = user[0].first_name;
         req.session.lastName = user[0].last_name;
         req.session.password = user[0].password;
         req.session.userAge = user[0].age;
         req.session.userLocation = user[0].location;
         req.session.skillLevel = user[0].skill_level;
         req.session.maxDistance = user[0].max_distance; 

          res.redirect('explore');
      })
     .catch(err => {
       res.status(500).json(err);
     });
    });
  module.exports = router;