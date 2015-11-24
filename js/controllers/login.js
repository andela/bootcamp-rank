angular.module('bootrank.controllers', [])
  .controller('LoginCtrl', ['$scope', 'Auth', '$rootScope', '$window', '$state', function($scope, Auth, $rootScope, $window, $state) {
    $scope.login = function() {
      Auth.login().then(function(authData) {
        var data = authData.google.cachedUserProfile;
        $rootScope.user = data;
        Auth.addUser(data.id).$add(data);
        $state.go('home');
      });
    };

    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.logout = function() {
      Auth.logout();
      $state.go('login');
      $rootScope.user = null;
    };
  }]);
