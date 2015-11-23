angular.module('bootrank.controllers', [])
  .controller('HomeCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.home = function() {

    };

    $scope.login = function () {
    	Auth.login().then(function (authData) {
    		console.log(authData);
    	})
    }
  }]);
