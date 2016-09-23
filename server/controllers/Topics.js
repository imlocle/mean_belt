var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Comment = mongoose.model('Comment');
module.exports = {
  dashboard: function(req, res){
    Topic.find({}).exec(function(err,topics){
      if(err){
        res.status(500).send(err);
      } else {
        res.json(topics);
      }
    })
  },
  create: function(req, res){
    User.findOne({_id:req.session.user._id}, function(err, user){
      if(err){
        console.log('Did not find user');
        res.sendStatus(400);
      } else{
        var topic = new Topic({topic:req.body.topic, description:req.body.description, category:req.body.category, created_at: new Date()});
        topic._user = user._id;
        user.topics.push(topic);
        topic.save(function(err){
          user.save(function(err){
            if(err){
              console.log('something went wrong with adding the topic');
            } else{
              console.log('it worked man...you now have a shitty topic to mindfuck others...inception...you like it fuckface?!! hat you so much, hope you die...thanks for using my website though...#blessed...you are the best...');
              res.sendStatus(200)
            }
          })
        })
      }
    })
  },
  getAll: function(req, res){
    Topic.find({}).populate('_user').exec(function(err, topics){
      if(err){
        console.log('get the fuck out of here, could not get the topics');
      } else{
        res.json(topics)
      }
    })
  },
  getTheTopic: function(req, res){
    Topic.findOne({_id: req.params.id}).populate({path: 'answers', populate:[{path: '_user', model:'User'}, {path: 'comments', populate:{path: '_user', model:'User'}}]}).exec(function(err, topic){
      if(err){
        console.log('I tried man...');
      } else{
        console.log('I cannot fucking believe this worked');
        req.session.topic = topic;
        res.json(topic)
      }
    })
  },
  postAnswer: function(req, res){
    User.findOne({_id:req.session.user._id}, function(err, user){
      if(err){
        console.log('Could not get the user');
      } else{
        Topic.findOne({_id:req.session.topic._id}, function(err, topic){
          if(err){
            console.log('Could not get the topic');
          } else{
            var answer = new Answer({answer: req.body.answer})
            answer._user = user._id;
            user.answers.push(answer);
            answer._topic = topic._id;
            topic.answers.push(answer);
            answer.save(function(err){
              user.save(function(err){
                topic.save(function(err){
                  if(err){
                    console.log('damnit it is all fucked up');
                  } else{
                    console.log('holy shit it worked');
                    res.sendStatus(200);
                  }
                })
              })
            })
          }
        })
      }
    })
  },
  addComment: function(req, res){
    console.log("********************");
    console.log(req.params.id);
    User.findOne({_id:req.session.user._id}, function(err, user){
      if(err){
        console.log('did not find user for comment');
      } else{
        Answer.findOne({_id:req.params.id}, function(err, answer){
          if(err){
            console.log('did not find answer for comment');
          } else{
            var comment = new Comment({comment:req.body.comment});
            comment._user = user._id;
            user.comments.push(comment);
            comment._answer = answer._id;
            answer.comments.push(comment);
            comment.save(function(err){
              user.save(function(err){
                answer.save(function(err){
                  if(err){
                    console.log('god fuck we fucked up with comments');
                  } else{
                    User.update({_id:req.session.user._id}, {$inc: {commentCount: 1}}, function(err){
                      if(err){
                        console.log('could not increment');
                      } else{
                        console.log('just incremented');
                      }
                    })
                    console.log('holy shit comments work');
                    res.sendStatus(200);
                  }
                })
              })
            })
          }
        })
      }
    })
  }
}
