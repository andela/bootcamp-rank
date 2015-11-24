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
  .controller('DashboardCtrl', ['$scope', function($scope) {
    $scope.projects = [{
      id: '56545be6d2466a0e50c9e20b',
      title: 'Blog'
    }, {
      id: '56545be644251795b3c9604d',
      title: 'Complex Numbers'
    }, {
      id: '56545be6d9c28cd18034d65d',
      title: 'Sets'
    }, {
      id: '56545be64e12e018a4f3b468',
      title: 'Painting App'
    }, {
      id: '56545be62f5c9e6bc76fe7c1',
      title: 'Quiz App'
    }, {
      id: '56545be6d2466a0e50c9e20b',
      title: 'Blog'
    }, {
      id: '56545be644251795b3c9604d',
      title: 'Complex Numbers'
    }, {
      id: '56545be6d9c28cd18034d65d',
      title: 'Sets'
    }, {
      id: '56545be64e12e018a4f3b468',
      title: 'Painting App'
    }, {
      id: '56545be62f5c9e6bc76fe7c1',
      title: 'Quiz App'
    }];
  }])
  .controller('ProjectCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Utils', function($scope, $rootScope, $state, Auth, Utils) {
    if ($rootScope.user) {
      $scope.submit = false;
      $scope.edit = true;

      $scope.submitProject = function() {
        $scope.submit = true;

        var ref = Auth.firebase;
        ref.child('bootcamps').child('bc4').push($scope.submission);
        Utils.toast('You project has been submitted');
        $scope.edit = false;
      };
    } else {
      $state.go('login');
    }

  }])
  .controller('DashboardCtrl', ['$scope',
    function($scope) {
      $scope.projects = [{
        id: '56545be6d2466a0e50c9e20b',
        title: 'Blog'
      }, {
        id: '56545be644251795b3c9604d',
        title: 'Complex Numbers'
      }, {
        id: '56545be6d9c28cd18034d65d',
        title: 'Sets'
      }, {
        id: '56545be64e12e018a4f3b468',
        title: 'Painting App'
      }, {
        id: '56545be62f5c9e6bc76fe7c1',
        title: 'Quiz App'
      }, {
        id: '56545be6d2466a0e50c9e20b',
        title: 'Blog'
      }, {
        id: '56545be644251795b3c9604d',
        title: 'Complex Numbers'
      }, {
        id: '56545be6d9c28cd18034d65d',
        title: 'Sets'
      }, {
        id: '56545be64e12e018a4f3b468',
        title: 'Painting App'
      }, {
        id: '56545be62f5c9e6bc76fe7c1',
        title: 'Quiz App'
      }];
    }
  ]);
