app.factory('userFactory', ['$http','$location', function($http, $location) {
  var userObject = {};
  userObject.register = function(user, callback){
    $http({
      method: 'POST',
      url: '/',
      data: user
    }).then(function(response) {
      callback();
    });
  }
  userObject.login = function(user, callback){
    $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(res){
      callback();
    });
  }
  userObject.logout = function(){
    $http({
      method: 'GET',
      url: '/logout',
    }).then(function(res){
      if (res.status == 200){
        $location.url('/login');
      }
    })
  }
  userObject.getUser = function(callback){
    $http({
      method:"GET",
      url:'/getUser',
    }).then(function(res){
      callback(res.data)
    }, function(){
      console.log('Could not get the user');
    })
  }
  return userObject;
}]);
