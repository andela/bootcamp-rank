(function(){
	'use strict';
	angular
		.module('btcmprank.services', ['firebase'])
		.factory('Auth', ['$firebaseObject', '$firebaseArray', '$q', function ($firebaseObject, $firebaseArray, $q) {
			var app = new Firebase("https://btcmprank.firebaseio.com");
			function login () {
				return $q(function(resolve, reject) {
					app.authWithOAuthPopup("google", function(error, authData) {
						if(error) {
							reject(error);
						} else {
							resolve(authData);
						}
					});
				});
			}
			return {
				login: login
			}
		}]);
})();