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
  reviewController.upload,
  catchErrors(reviewController.resizeImage),
  catchErrors(reviewController.createReview)
);
router.post(
  '/reviews/:id/edit',
  authController.isLoggedIn,
  catchErrors(reviewController.verifyOwnership),
  reviewController.upload,
  catchErrors(reviewController.resizeImage),
  catchErrors(reviewController.editReview)
);
router.delete(
  '/reviews/:id/delete',
  authController.isLoggedIn,
  catchErrors(reviewController.verifyOwnership),
  catchErrors(reviewController.deleteReview)
);

router.get(
  '/account/',
  authController.isLoggedIn,
  catchErrors(reviewController.findUserReviews)
);

router.post('/login', authController.login);

router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
);

router.get('/logout', authController.isLoggedIn, authController.logout);

// API
router.get('/api/reviews/near', catchErrors(reviewController.mapReviews));

module.exports = router;
