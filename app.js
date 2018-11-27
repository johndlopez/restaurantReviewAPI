const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');
const routes = require('./routes/index');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adds validation methods
app.use(expressValidator());

// For keeping track of sessions
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Handles sessions
app.use(passport.initialize());
app.use(passport.session());

// Pass variables to templates and all requests
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', routes);

module.exports = app;
