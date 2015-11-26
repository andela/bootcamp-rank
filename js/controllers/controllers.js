angular.module('bootrank.controllers', [])
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
              if (emails) {
                for (var i = 0; i < emails.length; i++) {
                  if (data.email.trim() === emails[i].trim()) {
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
  ])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$state', '$mdSidenav', 'Auth', 'Utils',
    function($scope, $rootScope, $state, $mdSidenav, Auth, Utils) {
      Auth.getProjects(function(projects) {
        $scope.projects = projects;
        console.log(projects);
      });

      // side nav
      $rootScope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
      $scope.showRating = false;
      $scope.changeCurrentProject = function(project) {
        $mdSidenav('left').close();
        $scope.currentProject = project;
        $scope.rating = {};
        $scope.showRating = true;
        $scope.rating.quality = 0;
        $scope.rating.uiux = 0;
        $scope.rating.understanding = 0;
        $scope.rating.confidence = 0;
        $scope.rating.comment = '';
      };

      $scope.submitRating = function() {
        if ($rootScope.user) {
          $scope.rating.scorer_id = $rootScope.user.id;
          $scope.rating.scorer_name = $rootScope.user.name;
          Auth.firebase
            .child('bootcamps')
            .child('bc4')
            .child($scope.currentProject.$id)
            .child('score')
            .push($scope.rating);
          Utils.toast('You have rated ' + $scope.currentProject.name + '\'s project');
          $state.go('home');
          $scope.rating.quality = 0;
          $scope.rating.uiux = 0;
          $scope.rating.understanding = 0;
          $scope.rating.confidence = 0;
          $scope.rating.comment = '';
        }
      };

      $scope.github = function(repository) {
        window.open(repository);
      };
      $scope.liveDemo = function(demo) {
        window.open(demo);
      };
    }
  ])
  .controller('DashboardCtrl', ['$scope', 'Auth', function($scope, Auth) {
    Auth.getProjects(function(projects) {
      $scope.projects = projects;
      console.log(projects);
    });
  }])
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
  ])
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
            controller: 'DialogCtrl',
            templateUrl: 'views/invite-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function() {});
      };

      $scope.dashboard = function() {
        $mdBottomSheet.hide();
        $state.go('dashboard');

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
