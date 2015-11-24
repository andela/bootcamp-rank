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
      if (Auth.getUser()) {
        var user = JSON.parse(Auth.getUser());
        user = user.google.cachedUserProfile;
        $rootScope.user = user;
      } else {
        $state.go('login');
      }

      Auth.firebase.onAuth(function(authData) {
        if (authData && authData.google) {
          if (/andela.co(m?)/.test(authData.google.cachedUserProfile.id)) {
            $rootScope.user = authData.google.cachedUserProfile;
            console.log(authData.google.cachedUserProfile);
            $state.go('home', {
              id: $rootScope.user.id
            });
          } else {
            $state.go('login');
          }
        }
      });
    }
  ]);

  window.app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/',
          controller: 'LoginCtrl',
          templateUrl: 'views/login.html'
        })
        .state('home', {
          url: '/home/',
          controller: 'HomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('dashboard', {
          url: '/dashboard/:id',
          controller: 'DashboardCtrl',
          templateUrl: 'views/dashboard.html'
        })
        .state('projects', {
          url: '/project/submit',
          controller: 'ProjectCtrl',
          templateUrl: 'views/project.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      // $locationProvider.html5Mode(true);
    }
  ]);

})();
