angular.module('bootrank.controllers')
  .controller('HomeCtrl', ['$scope', '$rootScope', '$state', '$mdSidenav', 'Auth', 'Utils',
    function($scope, $rootScope, $state, $mdSidenav, Auth, Utils) {
      Auth.getProjects(function(projects) {
        $scope.projects = projects;
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
          $scope.rating.scorer_name = $rootScope.user.name;
          $scope.rating.picture = $rootScope.user.picture;
          Auth.firebase
            .child('bootcamps')
            .child('bc4')
            .child($scope.currentProject.$id)
            .child('score')
            .child($rootScope.user.id)
            .set($scope.rating);
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
  ]);
