(function() {
  'use strict';
  window.app = angular.module('bootrank', [
    'btcmprank.services',
    'bootrank.controllers',
    'ui.router',
    'ngMaterial'
  ]);

  window.app.run(['$rootScope', '$location', '$state', '$mdSidenav',
    function($rootScope, $location, $state, $mdSidenav) {}
  ]);

  window.app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      $stateProvider
        .state('login', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'views/login.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);

})();
