const passport = require('passport');
const mongoose = require('mongoose');

exports.login = passport.authenticate('local', {
  successRedirect: '/reviews'
});

exports.logout = (req, res) => {
  req.logout();
  res.send('You are now logged out! 👋');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.send({
    error: 'error',
    message: 'Oops you must be logged in to do that!'
  });
};
