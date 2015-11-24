angular.module('bootrank.controllers', [])
  .controller('LoginCtrl', ['$scope', 'Auth', '$rootScope', function($scope, Auth, $rootScope) {
    $scope.login = function() {
      Auth.login().then(function(authData) {
        var data = authData.google.cachedUserProfile;
        $rootScope.user = data;
        Auth.addUser(data.id).$add(data);
      });

    };
  }]);
