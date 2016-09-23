var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AnswerSchema = new mongoose.Schema({
  answer: {type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  _user: {type: Schema.Types.ObjectId, ref: "User"},
  _topic: {type: Schema.Types.ObjectId, ref: "Topic"},
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0}

})

mongoose.model('Answer',AnswerSchema)
