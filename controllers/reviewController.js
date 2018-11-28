const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuidv4 = require('uuid/v4');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('photo');

exports.resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuidv4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  req.body.author = req.user._id;
  const review = new Review(req.body);
  await review.save();
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
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).exec();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  Review.find({ _id: req.params.id })
    .remove()
    .exec();
  res.send('Review was deleted');
};

exports.findUserReviews = async (req, res) => {
  // 1. Find reviews by user id.
  const reviews = await Review.find({ author: req.user._id });
  // 2. send them in a response
  res.json(reviews);
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
        $maxDistance: 16093
      }
    }
  };

  const reviews = await Review.find(q)
    .select('text author location')
    .limit(10);
  res.json(reviews);
};
