var express = require('express');
var userList = require('../models/users.model');
var overview = express.Router();

/* GET users listing. */
overview.get('/', function(req, res, next) {
    // check if url contains keys
    if(Object.keys(req.query).length) {
        var skillLevel = req.query.skilLevel;
        var ageRange = Number(req.query.ageRange);
        var userAge = new Date(req.session.userAge);
        var maxDistance = req.query.maxDistance;
        var runningScheme = req.query.runningScheme;
        var practiceTime = req.query.practiceTime;
        var maxAge = ageDifference(userAge, ageRange);
        var distance = difference(req.session.userLocation, maxDistance);



        //calc dif
        function difference(n, m){
            return Math.abs(n - m)
        }
        function ageDifference(userAge, ageRange){
            // set date today
            var date = new Date();
            date.setDate( date.getDate() - 6 );
            //  today year - age range
            date.setFullYear( date.getFullYear() + ageRange );
            return Math.abs(userAge.getFullYear() - date.getFullYear());
        }
        console.log("distance "+distance);
        console.log("age "+maxAge);


        userList.find({
            skill_level : skillLevel,
            age:  maxAge ,
            location: {$gte : distance,  $lte :  distance},
            running_scheme: runningScheme,
            practice_time: practiceTime
        }).select('first_name age avatar location match_date')
            .exec()
            .then(function (users) {
                if(req.xhr) {
                    res.json(users);
                }else{
                    res.render('overview', {
                        title: 'Filter',
                        users: users,
                        filter: true
                    });
                }

            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }else{
        userList.find().select('first_name age avatar location match_date')
            .exec()
            .then(function (users) {
                res.render('overview', {
                    title: 'Matches',
                    users: users,
                    filter: false
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
});


module.exports = overview;
