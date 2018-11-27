const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/reviews', catchErrors(reviewController.getReviews));
router.post('/review/create', catchErrors(reviewController.createReview));

module.exports = router;
