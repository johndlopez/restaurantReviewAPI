const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const User = mongoose.model('User');

exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  req.body.author = req.user._id;
  const review = new Review(req.body);
  await review.save();
  // 2. send back data to user
  res.json(review);
};

const confirmOwner = (review, author) => {
  console.log(review);
  if (!review.author.equals(author._id)) {
    throw Error('You must be an owner to edit it!');
  }
};

exports.verifyOwnership = async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id });
  confirmOwner(review, req.user._id);
  next();
};

exports.editReview = async (req, res) => {
  req.body.location.type = 'Point';
  // 1. Pull store
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).exec();
  // 2. Verify user is owner of store
  // 3. Save updated store to db
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  Review.find({ _id: req.params.id })
    .remove()
    .exec();
  res.send('Review was deleted');
};

exports.findUserReviews = async (req, res) => {
  //TODO
  // 1. Find reviews by user id.
  // const reviews = async Review.find
  // 2. send them in a response
};

exports.mapReviews = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 160934
      }
    }
  };

  const reviews = await Review.find(q)
    .select('text author location')
    .limit(10);
  res.json(reviews);
};
