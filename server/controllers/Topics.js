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
        var topic = new Topic({topic:req.body.topic, description:req.body.description, created_at: new Date()});
        topic._user = user._id;
        user.topics.push(topic);
        topic.save(function(err){
          user.save(function(err){
            if(err){
              console.log('something went wrong with adding the topic');
            } else{
              console.log('adding topic was good');
              res.sendStatus(200)
            }
          })
        })
      }
    })
  },
  getAll: function(req, res){
    console.log("*********");
    console.log(req.body);
    Topic.find({}).exec(function(err, topics){
      if(err){
        console.log('could not get the topics');
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
                    Topic.update({_id:req.session.topic._id}, {$inc:{answerCount:1}},function(err){
                      if(err){
                        console.log('could not increment post');
                      } else{
                        console.log('increment post');
                      }
                    })
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
  like: function(req,res){
    Answer.findOne({_id:req.params.id}, function(err, answer){
      if(err){
        console.log('Nope it did not work');
      } else{
        Answer.update({_id:req.params.id}, {$inc:{likes: 1}})
        .populate('likes')
        .exec(function(err, likes){
          if (err){
            res.status(500).send("likes did not update");
          }else{
            console.log(likes);
            console.log('liking');
            res.sendStatus(200); //i have no idea what to do now. I have tried everything
          }
        })

      }
    })
	},
}
