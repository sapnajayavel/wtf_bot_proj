var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optionsSchema = new Schema({
  id: Number,
  answerType: String,
  ques: String,
  ans: Array
});

var Options = mongoose.model('tellmequestionlists', optionsSchema);

module.exports = Options;