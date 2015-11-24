angular.module('bootrank.controllers', [])
  .controller('LoginCtrl', ['$scope', 'Auth', '$rootScope', 'Utils', '$state', function($scope, Auth, $rootScope, Utils, $state) {
    $scope.login = function() {
      Auth.login().then(function(authData) {
        var data = authData.google.cachedUserProfile;
        $rootScope.user = data;
        var ref = new Firebase('https://btcmprank.firebaseio.com'),
          isNewUser = true;

        if (authData && isNewUser) {
          ref.child('users').child(data.id).set(data);
        } else {
          ref.child('users').child(data.id).update(data);
        }
        Utils.toast('Welcome to BootRank ' + data.name);
        $state.go('home', {
          id: data.id
        });
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
  }])
  .controller('HomeCtrl', ['$scope', function($scope) {
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
  }]);
