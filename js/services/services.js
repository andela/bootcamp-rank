(function() {
  'use strict';
  angular
    .module('bootrank.services', [])
    .factory('Auth', ['$firebaseObject', '$firebaseArray', '$q', '$window', function($firebaseObject, $firebaseArray, $q, $window) {
      var app = new Firebase('https://boot-rank.firebaseio.com');
      return {
        firebase: app,
        login: function() {
          return $q(function(resolve, reject) {
            var isNewUser = true;
            app.authWithOAuthPopup('google', function(error, authData) {
              if (error) {
                reject(error);
              } else if (authData && isNewUser) {
                resolve(authData);
              }
            }, {
              scope: 'email'
            });
          });
        },

        isAuthenticated: function() {
          return $q(function(resolve, reject) {
            var authData = app.getAuth();
            if (authData) {
              resolve(authData);
            } else {
              reject(false);
            }
          });
        },
        getProjects(cb) {
          return cb($firebaseArray(app.child('bootcamps').child('bc4')));
        },
        get: function() {
          return $firebaseArray(app);
        },

        getUser: function() {
          return $window.localStorage.getItem('firebase:session::boot-rank');
        },

        logout: function() {
          app.unauth();
        }
      };
    }])
    .service('Utils', function($mdToast, $mdDialog) {
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
    });
})();
