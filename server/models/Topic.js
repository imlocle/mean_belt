var mongoose = require('mongoose');

var Schema = mongoose.Schema

var TopicSchema = new mongoose.Schema({
  topic: {type: String, required: true},
  description: {type: String, required: true},
  count: {type: Number, default: 0},
  answers: [{type: Schema.Types.ObjectId, ref: "Answer"}],
  answerCount:{type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: "User"},
  created_at: {type: Date, required: true}
})

mongoose.model('Topic', TopicSchema);
