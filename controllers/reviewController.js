const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const User = mongoose.model('User');

exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};
