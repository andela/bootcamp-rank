(function() {
  'use strict';
  angular
    .module('bootrank.services', [])
    .factory('Auth', ['$firebaseObject', '$firebaseArray', '$q', '$window',
      function($firebaseObject, $firebaseArray, $q, $window) {
        var app = new $window.Firebase('https://boot-rank.firebaseio.com');
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

          getProjects: function(cb) {
            return cb($firebaseArray(app.child('bootcamps').child('bc4')));
          },
          get: function() {
            return $firebaseArray(app);
          },

          getUser: function() {
            if ($window.localStorage.getItem('firebase:session::boot-rank')) {
              return JSON.parse($window.localStorage.getItem('firebase:session::boot-rank')).google.cachedUserProfile;
            }
          },

          logout: function() {
            app.unauth();
          }
        };
      }
    ]);
})();
