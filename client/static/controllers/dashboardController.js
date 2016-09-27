app.controller('dashboardController', ['$http','$scope','userFactory', 'topicFactory', '$location', function($http, $scope, userFactory,topicFactory, $location){
  var redirector = function(){
    $location.url('/dashboard')
  }
  $scope.logout = function(){
    userFactory.logout();
  }
  $scope.createTopic = function(data){
    $scope.err = [];
    if(data.topic.length < 10){
      $scope.err.push('Question must be 10 characters or longer');
    } else{
      topicFactory.createTopic(data, redirector);
    }
  }
  $scope.getAll = function(){
    topicFactory.getAll(function(data){
      $scope.topics = data
    })
  }
  $scope.getUser = function(){
    userFactory.getUser(function(data){
      $scope.user = data
    })
  }
  $scope.getUser();
  $scope.getAll();

}])
