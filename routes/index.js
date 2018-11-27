const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/reviews', catchErrors(reviewController.getReviews));
router.post('/review/create', catchErrors(reviewController.createReview));

router.post('/reviews/:id/edit', catchErrors(reviewController.editReview));

router.post('/login', authController.login);

router.post(
  '/register',
  userController.validateRegister,
  catchErrors(userController.register)
);

module.exports = router;
