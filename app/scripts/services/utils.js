angular.module('bootrank.services')
  .service('Utils', ['$mdToast', '$mdDialog', function($mdToast, $mdDialog) {
    this.toast = function(msg) {
      $mdToast.show($mdToast.simple().content(msg));
    };
    this.dialog = function(title, message, event, callback) {
      $mdDialog.show(
          $mdDialog.confirm()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title(title)
          .content(message)
          .ariaLabel('Utils Dialog Service')
          .ok('OK')
          .cancel('CANCEL')
          .targetEvent(event)
        )
        .then(function() {
          callback();
        }, function() {});
    };
  }]);
