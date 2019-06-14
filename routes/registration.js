var express = require('express');
var userModel = require('../models/users.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('registration');

});


router.post('/', function(req, res, next) {
   if(!req.body){
     return res.status(400).send('Request body is missing');
   }
   let model = new userModel(req.body);
   model.save()
       .then(doc => {
         if(!doc || doc.length === 0){
           return res.status(500).send(doc);
         }
        //  res.redirect('main');
        //  res.status(201).send(doc);
       }).then(async function(){
          var user = await userModel.find({email: req.body.email});
           req.session.user = user[0]._id;
           req.session.userName = user[0].first_name;
           req.session.lastName = user[0].last_name;
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
