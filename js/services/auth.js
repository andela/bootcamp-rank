(function() {
  'use strict';
  angular
    .module('btcmprank.services', [])
    .factory('Auth', ['$firebaseObject', '$firebaseArray', '$q', '$window', function($firebaseObject, $firebaseArray, $q, $window) {
      var app = new Firebase('https://btcmprank.firebaseio.com');

      return {
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

        addUser: function(id) {
          return $firebaseArray(app.child('users').child(id));
        },

        getUser: function() {
          return $window.localStorage.getItem('firebase:session::btcmprank');
        }
      };
    }]);
})();
