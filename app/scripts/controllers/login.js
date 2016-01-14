angular.module('bootrank.controllers')
  .controller('LoginCtrl', ['$scope', 'Auth', '$rootScope', '$mdBottomSheet', 'Utils', '$state',
    function($scope, Auth, $rootScope, $mdBottomSheet, Utils, $state) {

      $scope.login = function() {
        Auth.login().then(function(authData) {
          if (!authData) {
            return Utils.toast('Invalid Authentication data');
          }

          var data = authData.google.cachedUserProfile,
            ref = Auth.firebase,
            userRef = ref.child('users');
          if (/andela.co(m?)/.test(data.hd)) {
            $rootScope.user = data;
            // Check if user is old
            userRef.child(data.id).once('value', function(snap) {
              if (snap.val()) {
                // Old user, save user
                snap.ref().update(data);
              } else {
                // New user, update user
                snap.ref().set(data);
              }
              Utils.toast('Welcome to BootRank ' + data.name);
              $state.go('home');
            });
          } else {
            ref.child('bootcampers').child('invite').once('value', function(snapshot) {
              var emails = snapshot.val();
              var invited = false;
              console.log(data);
              if (emails) {
                for (var i = 0; i < emails.length; i++) {
                  console.log(data.email + ':' + emails[i]);
                  if (data.email === emails[i]) {
                    $rootScope.user = data;
                    invited = true;
                    $state.go('projects');
                    break;
                  }
                }
              }
              if (!invited) {
                Utils.toast('Unauthorized access, Login in with your Andela email.');
                Auth.logout();
                $state.go('login');
              }
            });
          }
        });

        $scope.logout = function() {
          Auth.logout();
          $state.go('login');
        };
      };

      $scope.showSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
          templateUrl: 'views/bottom-sheet.html',
          controller: 'LoginCtrl',
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
