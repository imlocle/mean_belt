var mongoose = require('mongoose');
var User = mongoose.model('User');//change example to what you desire
module.exports = {
  register: function(req,res){
    if (req.body.email.length <3 || req.body.password <8){
      res.status(400).send("Email and Password is wrong");
      return;
    }
    var user = new User(req.body);
    user.save(function(err){
      if (err){
        res.sendStatus(500);
      } else{
        req.session.user = user;
        console.log(user);
        res.send(user);
      }
    });
  },

  login: function(req, res){
    User.findOne({email:req.body.email}).exec(function(err, user){
      if (req.body.password == user.password){
        req.session.user = user;
        console.log(user);
        res.send(user);
      } else{
        res.sendStatus(400);
      }
    });
  },
  logout: function(req,res){
    req.session.destroy();
    res.sendStatus(200);
  },
  getuser: function(req,res){
    User.findOne({_id:req.session.user._id}, function(err, user){
      if (err){
        console.log('Could not find user');
        res.sendStatus(400);
      } else{
        console.log('Good shit user');
        res.json(user);
      }
    })
  }
}
