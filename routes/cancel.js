var express = require('express');
var router = express.Router();

// handles the post request on /cancel button
router.post('/', function(req, res) {

    // redirects the user to the explore page when editProfile is cancelled
    res.redirect('/explore');

});

// exports router module
module.exports = router;