const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = passport.authenticate('local', {
  failureRedirect: '/reviews', //TODO remove
  successRedirect: '/reviews'
});

exports.logout = (req, res) => {
  req.logout();
  res.send('You are now logged out! 👋');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.send({
    error: 'error',
    message: 'Oops you must be logged in to do that!'
  });
};