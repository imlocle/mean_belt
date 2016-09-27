var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push(
    function($q, $location) {
    return {
        'responseError':function(rejection){
          console.log('You GOt rejected')
        if (rejection.status == 401){
            $location.url('/login');
        }
        return $q.reject(rejection);
    }
    };
});
  $routeProvider
    .when('/register',{
      templateUrl: '/partials/register.html',
    })
    .when('/login',{
      templateUrl:'/partials/login.html',
    })
    .when('/dashboard',{
      templateUrl:'/partials/dashboard.html',
    })
    .when('/userprofile/:id',{
      templateUrl:'/partials/userprofile.html',
    })
    .when('/topic/:id/newanswer',{
      templateUrl:'/partials/topic.html',
      controller: 'topicController',
    })
    .when('/topic/:id',{
      templateUrl:'/partials/show.html',
      controller: 'topicController',
    })
    .when('/addquestion',{
      templateUrl: '/partials/addquestion.html',
    })
    .otherwise({
      redirectTo:'/'
    })
})


  // {path: 'answers', populate:{path: 'comments', model:'Comment'}}
