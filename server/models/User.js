var mongoose = require('mongoose');

var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  first_name: {type:String, required:true, minlength:2, maxlength:50},
  last_name: {type:String, required:true, minlength:2, maxlength:50},
  email: {type:String, required:true, minlength:2, maxlength:50},
  password: {type:String, required:true, minlength:8, maxlength:50},
  topics: [{type: Schema.Types.ObjectId, ref: "Topic"}],
  answers: [{type: Schema.Types.ObjectId, ref: "Answer"}],
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
  topicCount: {type: Number, default: 0},
  postCount: {type: Number, default: 0},
  commentCount: {type: Number, default: 0},
})
mongoose.model('User', UserSchema);
