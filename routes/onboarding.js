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
         res.redirect('main');
         res.status(201).send(doc);

         
       })
       .catch(err => {
         res.status(500).json(err);
       });

//        var check = async function userCheck(req, res) {
//         var login = await loginModel.find({email: req.body.email}).toArray();
//         var user = await usersModel.find({email: req.body.email}).toArray();
//         var loginPass = await loginModel.find({password: req.body.password}).toArray();
//         var userData = await usersModel.find({password: req.body.password}).toArray();
//         if(login[0].email === user[0].email && loginPass[0].password === userData[0].password) {
//             res.redirect('main');
//         }
//    };

});





module.exports = router;
