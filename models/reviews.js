var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    _id: Number,
    reviewName: String,
    reviewMessage: String,
    rating: Number
});

module.exports = mongoose.model('Review', ReviewSchema);