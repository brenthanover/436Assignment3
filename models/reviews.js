var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    reviewName: String,
    reviewMessage: String
});

module.exports = mongoose.model('Review', ReviewSchema);