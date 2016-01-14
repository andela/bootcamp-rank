angular.module('bootrank.controllers')
  .controller('DashboardCtrl', ['$scope', '$mdSidenav', 'Auth', function($scope, $mdSidenav, Auth) {
    Auth.getProjects(function(projects) {
      $scope.projects = projects;
    });
    $scope.changeCurrentProject = function(project) {
      $mdSidenav('left').close();
      $scope.project = project;
      getTotal(project);
    };
    var getTotal = function(project) {
      $scope.confidence = 0;
      $scope.quality = 0;
      $scope.ui_ux = 0;
      $scope.understanding = 0;
      var count = 0;
      $scope.comments = [];
      $scope.export = [];
      for (var x in project.score) {
        count += 1;
        if (Number(project.score[x].confidence)) {
          $scope.confidence += Number(project.score[x].confidence);
        }
        if (Number(project.score[x].quality)) {
          $scope.quality += Number(project.score[x].quality);
        }
        if (Number(project.score[x].uiux)) {
          $scope.ui_ux += Number(project.score[x].uiux);
        }
        if (Number(project.score[x].understanding)) {
          $scope.understanding += Number(project.score[x].understanding);
        }

        $scope.export.push({
          name: 'Anonymous',
          confidence: project.score[x].confidence,
          quality: project.score[x].quality,
          uiux: project.score[x].uiux,
          understanding: project.score[x].understanding,
          comment: (project.score[x].comment)
        });
        $scope.comments.push({
          picture: project.score[x].picture,
          name: project.score[x].scorer_name,
          comment: ((project.score[x].comment.length === 0) ? 'No comment' : project.score[x].comment)
        });
      }

      if ($scope.comments.length === 0) {
        $scope.message = 'No comments';
      }
      if ($scope.confidence !== 0) {
        $scope.confidence = $scope.confidence / count;
        $scope.confidence = Math.round($scope.confidence);
      }
      if ($scope.quality !== 0) {
        $scope.quality = $scope.quality / count;
        $scope.quality = Math.round($scope.quality);
      }
      if ($scope.ui_ux !== 0) {
        $scope.ui_ux = $scope.ui_ux / count;
        $scope.ui_ux = Math.round($scope.ui_ux);
      }
      if ($scope.understanding !== 0) {
        $scope.understanding = $scope.understanding / count;
        $scope.understanding = Math.round($scope.understanding);
      }
    };

    $scope.getHeader = function() {
      return ['Name', 'Confidence', 'Project quality', 'UI/UX', 'Project Understanding', 'Comments'];
    };

    $scope.openLink = function(link) {
      console.log('Clicked me');
      window.open(link);
    };
  }]);
