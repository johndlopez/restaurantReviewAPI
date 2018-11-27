const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const User = mongoose.model('User');

exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  // 1. make instance of Review with body
  const review = new Review(req.body);
  await review.save();
  // 2. send back data to user
  res.json(review);
};
