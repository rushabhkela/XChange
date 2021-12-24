var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
  Date : String,
  Symbol : String,
  Series : String,
  "Open Price" : String,
  "High Price" : String,
  "Low Price" : String,
  "Last Price" : String,
  "Close Price" : String,
  "Average Price" : String,
  "Total Traded Quantity" : String,
  "Turnover" : String
});

var Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
