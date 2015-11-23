(function() {
  'use strict';
  angular
    .module('btcmprank.services', [])
    .factory('Auth', ['$firebaseObject', '$firebaseArray', '$q', function($firebaseObject, $firebaseArray, $q) {
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
              remember: 'sessionOnly',
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
        }
      };
    }]);
})();
