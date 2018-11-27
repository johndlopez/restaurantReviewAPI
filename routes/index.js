const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/reviews', catchErrors(reviewController.getReviews));
router.post('/review/create', catchErrors(reviewController.createReview));

router.post('/reviews/:id/edit', catchErrors(reviewController.editReview));

router.post('/login', authController.login);

module.exports = router;
