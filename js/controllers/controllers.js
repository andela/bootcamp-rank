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
  .controller('HomeCtrl', ['$scope',
      function($scope) {
        $scope.projects = [{
          id: '56545be6d2466a0e50c9e20b',
          title: 'Blog Application',
          bootcamper: 'John Doe', 
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }, {
          id: '56545be644251795b3c9604d',
          title: 'Complex Numbers Spec',
          bootcamper: 'John Doe'
        }, {
          id: '56545be6d9c28cd18034d65d',
          title: 'Sets Theory Spec',
          bootcamper: 'John Doe'
        }];

        $scope.currentProject = $scope.projects[0];
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
    ])
    .controller('BootcamperCtrl', ['$scope',
      function($scope) {

      }
    ]);