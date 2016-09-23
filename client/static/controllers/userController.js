app.controller('userController', ['$scope','userFactory','$location', function($scope, userFactory, $location){
  var redirector = function(){
    $location.url('/dashboard')
  }
$scope.user = {
              first_name:'',
              last_name:'',
              email:'',
              password:'',
              conpass:'',
            }
$scope.err = [];
    $scope.register = function(data){
      var count = 0;
      $scope.err = [];
      if(data.first_name.length < 2){
        $scope.err.push('First Name must be greater than 2');
        count ++;
      }
      if(data.last_name.length < 2){
        $scope.err.push('Last Name must be greater than 2');
        count ++;
      }
      if(data.email.length < 2){
        $scope.err.push('Email must be greater than 2');
        count ++;
      }
      if(data.password.length < 8){
        $scope.err.push('Password must be greater than 8');
        count ++;
      }
      if(data.password != data.conpass){
        $scope.err.push('Passwords don\'t match');
        count ++;
      }
      if(count == 0){
        userFactory.register(data, redirector)
      }
    },
    $scope.login = function(data){
      var count = 0;
      $scope.err = [];
      if(data.email.length < 2){
        $scope.err.push('Email must be greater than 2');
        count ++;
      }
      if(data.password.length < 8){
        $scope.err.push('Password must be greater than 8');
        count ++;
      }
      if(count == 0){
        userFactory.login(data, redirector)
      }
    }
  }])
