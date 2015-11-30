  angular.module('bootrank.controllers', [])
    .controller('ProjectCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Utils',
      function($scope, $rootScope, $state, Auth, Utils) {
        if ($rootScope.user) {
          var ref = Auth.firebase;
          $scope.submitProject = function(event) {
            Utils.dialog('project submission',
              'Are you sure of your details?, Ensure that all the infomation is accurate', event,
              function() {
                $scope.submission.picture = $rootScope.user.picture;
                $scope.submission.name = $rootScope.user.name;
                ref.child('bootcamps').child('bc4').child($rootScope.user.id).set($scope.submission);
                $scope.submission = null;
                Utils.toast('You project has been submitted');
              });
          };
        }
      }
    ]);
