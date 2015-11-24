angular.module('bootrank.controllers', [])
  .controller('HomeCtrl', ['$scope', 'Auth', '$rootScope', '$window', function($scope, Auth, $rootScope, $window) {
    $scope.login = function() {
      Auth.login().then(function(authData) {
        var data = authData.google.cachedUserProfile;
        $rootScope.user = data;
        Auth.addUser(data.id).$add(data);
        $window.location = '/home';
      });
    };

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.logout = function() {
      Auth.logout();
    };
  }]);
