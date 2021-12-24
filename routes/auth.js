var express = require('express');
var router = express.Router();
var passport = require('passport');

// Authentication 
router.get('/auth/fail', function (req, res, next) {
    res.render('error');
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/fail' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;