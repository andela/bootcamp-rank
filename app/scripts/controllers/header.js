angular.module('bootrank.controllers')
  .controller('HeaderCtrl', ['$scope', '$rootScope', 'Auth', '$mdBottomSheet', '$state',
    function($scope, $rootScope, Auth, $mdBottomSheet, $state) {
      $scope.logout = function() {
        Auth.logout();
        $state.go('login');
      };

      $scope.showSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'views/bottom-sheet.html',
          controller: 'HeaderCtrl',
          clickOutsideToClose: true,
          targetEvent: $event
        }).then(function() {});
      };

      $scope.logout = function() {
        $mdBottomSheet.hide();
        Auth.logout();
        $state.go('login');
        $rootScope.user = null;
      };
    }
  ]);
