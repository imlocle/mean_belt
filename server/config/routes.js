var user = require('../controllers/Users.js');
var topic = require('../controllers/Topics.js');

module.exports = function(app){
  app.post('/', user.register);
  app.post('/login', user.login);
  app.use(userAuth);
  app.get('/logout', user.logout);
  app.get('/dashboard', topic.dashboard);
  app.get('/getUser', user.getuser);
  app.post('/topic', topic.create);
  app.get('/getTopics', topic.getAll);
  app.get('/getTheTopic/:id', topic.getTheTopic);
  app.post('/postAnswer', topic.postAnswer);
  app.post('/like', topic.like)
}
function userAuth(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.sendStatus(401);
  }
}
