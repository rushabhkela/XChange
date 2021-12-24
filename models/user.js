var mongoose = require('mongoose');
var crypto = require('crypto');
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new mongoose.Schema({
  googleId : {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
});


userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);

module.exports = User;
