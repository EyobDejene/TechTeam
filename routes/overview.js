var express = require('express');
var userList = require('../models/users.model');
var overview = express.Router();

/* GET users listing. */
overview.get('/', function(req, res, next) {

    //calc dif
    function difference(n, m) {
        return Math.abs(n - m);
    }

    function ageDifference(userAge, ageRange) {
        return userAge - ageRange;
    }

    // check if url contains keys
    if(Object.keys(req.query).length) {
        if(req.session.user) {

            //getting values of req query from url
            var skillLevel = req.query.skilLevel;
            var ageRange = Number(req.query.ageRange);
            var userAge = new Date(req.session.userAge);
            var maxDistance = req.query.maxDistance;
            var runningScheme = req.query.runningScheme;
            var practiceTime = req.query.practiceTime;
            var maxAge = ageDifference(userAge, ageRange);


            // var distance = //difference(req.session.userLocation, maxDistance);

            // console.log("distance " + distance);
            // console.log("age " + maxAge);

            // find and create object  with users with specific conditions
            userList.find({
                skill_level: skillLevel,
                age: {$lte: maxAge },
                location: {$lte: maxDistance },
                running_scheme: runningScheme,
                practice_time: practiceTime,
                _id: { $ne: req.session.user },
            }).select('first_name age avatar location match_date')
                .exec()
                .then(function (users) {
                    // if its a xhr request make json object
                    if (req.xhr) {
                        res.json(users);
                    } else {
                        res.render('overview', {
                            title: 'Filter',
                            users: users,
                            filter: true,
                            session: req.session.user,
                            skillLevel:  skillLevel,
                            ageRange: ageRange,
                            maxDistance: maxDistance,
                            runningScheme: runningScheme,
                            practiceTime: practiceTime
                        });
                        // console.log(ageRange);
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }else{
            res.redirect('/');
        }
    }else{
        // if url doesn't have parameters run this
        userList.find({ _id: { $ne: req.session.user }}).select('first_name age avatar location match_date')
            .exec()
            .then(function (users) {
                res.render('overview', {
                    title: 'Matches',
                    users: users,
                    filter: false,
                    session: req.session.user,
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
