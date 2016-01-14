angular.module('bootrank.controllers', [])
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
