var express = require('express');
var loginModel = require('../models/login.model');
var usersModel = require('../models/users.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    res.render('onboarding');

});

router.post('/', function(req, res) {
   if(!req.body){
     return res.status(400).send('Request body is missing');
   }
   let model = new loginModel(req.body);
   model.save()
       .then(doc => {
         if(!doc || doc.length === 0){
           return res.status(500).send(doc);
         }
        //  res.status(201).send(doc);
       })
       .then(async function(){
        var login = await loginModel.find({email: req.body.email});
        var user = await usersModel.find({email: req.body.email});
        var loginPass = await loginModel.find({password: req.body.password});
        var userData = await usersModel.find({password: req.body.password});
        req.session.user = user[0]._id;
        req.session.userName = user[0].first_name;
        req.session.lastName = user[0].last_name;
        req.session.userAge = user[0].age;
        req.session.userLocation = user[0].location;
        req.session.skillLevel = user[0].skill_level;
        req.session.maxDistance = user[0].max_distance;
        if(login[0].email === user[0].email && loginPass[0].password === userData[0].password) {
        res.redirect('explore');
    }
      })
       .catch(err => {
        res.status(500).redirect('/');
       });
});





module.exports = router;
