var mongoose = require('mongoose');
var Schema = mongoose.Schema;

issueSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  image: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

issue = mongoose.model('Issue', issueSchema);

module.exports = issue