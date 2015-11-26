(function() {
  'use strict';
  window.app = angular.module('bootrank', [
    'bootrank.services',
    'bootrank.controllers',
    'ui.router',
    'ngMaterial',
    'firebase'
  ]);

  window.app.run(['$rootScope', '$location', '$state', 'Auth',
    function($rootScope, $location, $state, Auth) {
      // check if the user loggied in
      Auth.firebase.onAuth(function(authData) {
        if (authData && authData.google) {
          $rootScope.user = authData.google.cachedUserProfile;
          return $state.go('home');
        }
        $state.go('login');
      });
    }
  ]);

  window.app.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
      // For any unmatched url, redirect to /404
      $urlRouterProvider.otherwise('/');
      $mdThemingProvider.theme('default')
        .backgroundPalette('grey', {
          default: '200'
        });

      $stateProvider
        .state('login', {
          url: '/#/',
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .state('home', {
          url: '/home',
          controller: 'HomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('dashboard', {
          url: '/dashboard',
          controller: 'DashboardCtrl',
          templateUrl: 'views/dashboard.html'
        })
        .state('projects', {
          url: '/projects/submit',
          controller: 'ProjectCtrl',
          templateUrl: 'views/project.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
    }
  ]);

})();
