app.controller('topicController', ['$http','$scope','userFactory', 'topicFactory', '$location','$routeParams', function($http, $scope, userFactory,topicFactory, $location, $routeParams){
  var redirector = function(){
    $location.url('/dashboard')
  }
  $scope.logout = function(){
    userFactory.logout();
  }
  $scope.getUser = function(){
    userFactory.getUser(function(data){
      $scope.user = data
    })
  }
  $scope.getUser();

  $scope.getTheTopic = function(){
    topicFactory.getTheTopic($routeParams.id, function(data){
      $scope.topic = data
    })
  }
  $scope.post = function(data){
    $scope.err = []
    if(data.answer.length < 5){
      $scope.err.push('Answer must be longer than 5 characters');
    } else{
      topicFactory.post(data, function(){
        $scope.getTheTopic();
      }, redirector)
    }
  }
  $scope.like = function(data){
    topicFactory.like(data, function(){
      $scope.getTheTopic(); //there is something wrong with this callback
    })
  }



  $scope.getTheTopic()

}])
