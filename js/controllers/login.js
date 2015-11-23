angular.module('bootrank.controllers', [])
  .controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.login = function() {
      Auth.login().then(function(authData) {
        console.log(authData);
        var data = authData.google.cachedUserProfile;
        Auth.addUser(data.id).$add(data);
      });

    };
  }]);
