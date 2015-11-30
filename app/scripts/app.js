(function() {
  'use strict';
  angular.module('bootrank.controllers', []);
  angular.module('bootrank.services', []);
  angular.module('bootrank.filters', []);
  angular.module('bootrank.directives', []);

  //Require Services
  require('./services/auth');
  require('./services/utils');
  // require('./services/document');


  // Require Controllers
  // require('./controllers/footer');


  require('./controllers/projects');
  require('./controllers/dialog');
  require('./controllers/dashboard');
  require('./controllers/home');
  require('./controllers/login');


  window.app = angular.module('bootrank', [
    'bootrank.controllers',
    'bootrank.services',
    'bootrank.filters',
    'bootrank.directives',
    'ui.router',
    'ngMaterial',
    'firebase',
    'ngCsv',
    'ngSanitize'
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

  window.app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
      // For any unmatched url, redirect to /404
      $urlRouterProvider.otherwise('404');
      $mdThemingProvider.theme('default')
        .backgroundPalette('grey', {
          default: '200'
        });

      $stateProvider
        .state('login', {
          url: '/',
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

      $locationProvider.html5Mode(true);
    }
  ]);

})();
