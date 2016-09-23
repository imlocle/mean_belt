app.factory('topicFactory',['$http','$location', function($http, $location){
  var topicObject = {};
  topicObject.createTopic = function(topic, callback){
    $http({
      method:'POST',
      url:'/topic',
      data: topic
    }).then(function success(){
      callback();
    }, function failed(){
      console.log('could not create the topic');
    })
  },
  topicObject.getAll = function(callback){
    $http({
      method: 'GET',
      url: '/getTopics'
    }).then(function success(res){
      callback(res.data)
    }, function vaginas(){
      console.log('could not get the topics');
    })
  },
  topicObject.getTheTopic = function(id, callback){
    $http({
      method: 'GET',
      url: '/getTheTopic/'+id
    }).then(function success(res){
      callback(res.data);
    }, function fail(){
      console.log('failed to get the topic');
    })
  },
  topicObject.post = function(data, callback){
    $http({
      method:"POST",
      url:'/postAnswer',
      data: data
    }).then(function(res){
      callback()
    },function fail(){
      console.log('Answer fucked up analy!');
    })
  },
  topicObject.addComment = function(data, id, callback){
    $http({
      method:'POST',
      url:'/addComment/'+id,
      data: data
    }).then(function(res){
      callback()
    },function fail(){
      console.log('Comments fucked up');
    })
  }
  return topicObject;
}])
