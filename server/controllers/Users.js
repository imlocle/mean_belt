var mongoose = require('mongoose');
var User = mongoose.model('User');//change example to what you desire
module.exports = {
  register: function(req,res){
    if (req.body.email.length <3 || req.body.password <8){
      //this was new
      res.status(400).send("Registration was incorrect");
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
    User.findOne({email:req.body.email, password:req.body.password}).exec(function(err, user){
//using email and pw was new '&&'
      if (req.body.email == user.email && req.body.password == user.password){
        req.session.user = user;
        console.log(user);
        res.send(user);
      } else {
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
        console.log('Getting one user is good');
        res.json(user);
      }
    })
  }
}
