var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
  Month : Number,
  Title : String,
  Link : String 
});

var News = mongoose.model('News', newsSchema);

module.exports = News;
