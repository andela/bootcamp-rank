(function() {
  'use strict';
  window.app = angular.module('bootrank', [
    'btcmprank.services',
    'bootrank.controllers',
    'ui.router',
    'ngMaterial',
    'firebase'
  ]);

  window.app.run(['$rootScope', '$location', '$state', 'Auth',
    function($rootScope, $location, $state, Auth) {
      if (Auth.getUser()) {
        var user = JSON.parse(Auth.getUser());
        user = user.google.cachedUserProfile;
        $rootScope.user = user;
      }
    }
  ]);

  window.app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      $stateProvider
        .state('login', {
          url: '/',
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .state('home', {
          url: '/home',
          controller: 'LoginCtrl',
          templateUrl: 'views/home.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);

})();
