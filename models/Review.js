const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author.'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        required: 'You must supply a location.'
      }
    ]
  },
  text: {
    type: String,
    required: 'You must have text in your review.'
  },
  photo: String
});

reviewSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Review', reviewSchema);
