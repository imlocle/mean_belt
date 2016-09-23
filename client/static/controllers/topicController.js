app.controller('topicController', ['$http','$scope','userFactory', 'topicFactory', '$location','$routeParams', function($http, $scope, userFactory,topicFactory, $location, $routeParams){

  $scope.getUser = function(){
    userFactory.getUser(function(data){
      $scope.user = data
    })
  }
  $scope.getUser();

  $scope.getTheTopic = function(){
    topicFactory.getTheTopic($routeParams.id, function(data){
      $scope.topic = data
      console.log('CHECK THIS OUT!!!!');
      console.log(data);
    })
  }
  $scope.post = function(data){
    console.log('WE GOT HERE IN CONTROLLER');
    console.log(data);
    topicFactory.post(data, function(){
      $scope.getTheTopic();
    })
  }
  $scope.addComment = function(data,id){
    topicFactory.addComment(data, id, function(){
      $scope.getTheTopic();
    })
  }
  $scope.incrementL = function(data){
    topicFactory.incrementL(data, function(){
      $scope.getTheTopic();
    })
  }



  $scope.getTheTopic()

}])
