angular.module('bootrank.controllers', [])
  .controller('LoginCtrl', ['$scope', 'Auth', '$rootScope', 'Utils', '$state',
    function($scope, Auth, $rootScope, Utils, $state) {
      $scope.login = function() {
        Auth.login().then(function(authData) {
          var data = authData.google.cachedUserProfile;
          var ref = Auth.firebase,
            isNewUser = true;
          if (/andela.co(m?)/.test(data.hd)) {
            $rootScope.user = data;
            if (authData && isNewUser) {
              ref.child('users').child(data.id).set(data);
              Utils.toast('Welcome to BootRank ' + data.name);
              $state.go('home');
            } else {
              ref.child('users').child(data.id).update(data);
              Utils.toast('Welcome to BootRank ' + data.name);
              $state.go('home');
            }
          } else {
            Utils.toast('Unauthorized acces, Login in with andela email');
            Auth.logout();
            $state.go('login');
          }

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
    }
  ])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Utils',
    function($scope, $rootScope, $state, Auth, Utils) {

      Auth.getProjects(function(projects) {
        $scope.projects = projects;
      });

      $scope.showRating = false;
      $scope.changeCurrentProject = function(project) {
        $scope.currentProject = project;
        $scope.showRating = true;
      };
      $scope.submitRating = function() {
        var score = $scope.currentProject;
        var ref = Auth.firebase;
        $scope.rating.scorer_id = $rootScope.user.id;
        $scope.rating.scorer_name = $rootScope.user.name;
        ref.child('bootcamps').child('bc4').child(score.$id).child('score').push($scope.rating);
        Utils.toast('You have rated ' + $scope.currentProject.name + '\'s project');
        $state.go('home');
        $scope.rating.quality = 0;
        $scope.rating.uiux = 0;
        $scope.rating.understanding = 0;
        $scope.rating.confidence = 0;
        $scope.rating.comment = null;

      };
    }
  ])
  .controller('DashboardCtrl', ['$scope', 'Auth', function($scope, Auth) {
    Auth.getProjects(function(projects) {
      $scope.projects = projects;
      console.log(projects);
    });
  }])
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Utils', function($scope, $rootScope, $state, Auth, Utils) {
    if ($rootScope.user) {
      var ref = Auth.firebase;
      $scope.submitProject = function(event) {
        Utils.dialog('project submission', 'Are you sure of your details?, Ensure that all the infomation is accurate', event, function() {
          ref.child('bootcamps').child('bc4').push($scope.submission);
          Utils.toast('You project has been submitted');
        });

      };
    } else {
      $state.go('login');
    }

  }]);
