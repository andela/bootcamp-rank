angular.module('bootrank.controllers', [])
  .controller('DialogCtrl', ['$scope', 'Auth', '$rootScope', '$mdBottomSheet', '$mdDialog', 'Utils', '$state',
    function($scope, Auth, $rootScope, $mdBottomSheet, $mdDialog, Utils, $state) {
      $scope.showSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'views/bottom-sheet.html',
          controller: 'DialogCtrl',
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

      $scope.showInvite = function(ev) {
        $mdDialog.show({
            controller: 'InviteCtrl',
            templateUrl: 'views/invite-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {});
      };

      $scope.go = function(page) {
        $mdBottomSheet.hide();
        $state.go(page);

      };
    }
  ])
  .controller('InviteCtrl', ['$scope', '$state', '$mdDialog', '$mdBottomSheet', 'Utils', 'Auth',
    function($scope, $state, $mdDialog, $mdBottomSheet, Utils, Auth) {
      $scope.emails = [];
      $mdBottomSheet.hide();
      var inviteRef = Auth.firebase.child('bootcampers').child('invite');
      $scope.addBootcamper = function() {
        if ($scope.emails && $scope.emails.length !== 0) {
          inviteRef.once('value', function(snap) {
            var bootcampers = snap.val();
            if (!Array.isArray(bootcampers)) {
              bootcampers = $scope.emails;
            } else {
              bootcampers = bootcampers.concat($scope.emails);
            }
            inviteRef.set(bootcampers, function(err) {
              Utils.toast(err || 'Invite list updated');
              console.log(bootcampers);
              $mdDialog.hide();
            });
          });
        } else {
          $state.go('login');
        }
      };
      $scope.cancel = function() {
        $mdDialog.hide();
        $mdBottomSheet.hide();
      };

    }
  ]);
