const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/reviews', catchErrors(reviewController.getReviews));
router.post(
  '/review/create',
  authController.isLoggedIn,
  catchErrors(reviewController.createReview)
);
router.post(
  '/reviews/:id/edit',
  authController.isLoggedIn,
  catchErrors(reviewController.verifyOwnership),
  catchErrors(reviewController.editReview)
); //TODO

router.get('/account/:id', catchErrors(reviewController.findUserReviews)); //TODO

router.post('/login', authController.login);

router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
);

router.get('/logout', authController.logout);

// API
router.get('/api/reviews/near', catchErrors(reviewController.mapReviews)); //TODO

module.exports = router;
