var express = require('express');
var userModel = require('../models/users.model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user) {
        var skillLevel = req.session.skillLevel;
        // var userAge = calculate_age(new Date(req.session.userAge));
        var runningScheme = req.session.runningScheme;
        var practiceTime = req.session.practiceTime;
        var distance = req.session.userLocation;
        var maxDistance = 35;

        function calculate_age(age) {
            var date = new Date();
            return Math.abs(age.getFullYear() - date.getFullYear());
        }

        // console.log("distance " + distance);
        // console.log("age " + maxAge);

        userModel.find({
            skill_level: skillLevel,
            location: {$lte: maxDistance},
            // running_scheme: runningScheme,
            // practice_time: practiceTime
        }).select('first_name age avatar location match_date bio')
            .exec()
            .then(function (users) {
                if (req.xhr) {
                    res.json(users);
                    console.log(users);
                } else {
                    res.render('index', {
                        title: 'inSync',
                        users: users,
                        filter: false,
                        session: req.session.user
                    });

                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }else{
        res.status(301).redirect("/login");
        // res.render('login', {
        //     message: 'No session has been found -> first login'
        // });
    }


});


router.put('/', function(req, res, next) {
   if(!req.body){
     return res.status(400).send('Request body is missing');
   }
   let model = new userModel(req.body);
   model.save()
       .then(doc => {
         if(!doc || doc.length === 0){
           return res.status(500).send(doc);
         }
         res.status(201).send(doc);
       })
       .catch(err => {
         res.status(500).json(err);
       })
});






module.exports = router;
