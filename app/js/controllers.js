'use strict';

var login = angular.module('myLoginCheck', []).
		factory('$logincheck', function($cookies) {
	//alert($cookies.aut);
	return !(
			typeof $cookies.aut === 'undefined'
			|| $cookies.aut.indexOf('pa.u.id') === -1
			&& $cookies.aut.indexOf('pa.u.exp') === -1
			&& $cookies.aut.indexOf('pa.p.id') === -1
			);
});

function MenuCtrl($scope, $cookies) { //fixme make a service for cross controller use?

	$scope.isLoggedIn = function() {
		return !(
				typeof $cookies.aut === 'undefined'
				|| $cookies.aut.indexOf('pa.u.id') === -1
				&& $cookies.aut.indexOf('pa.u.exp') === -1
				&& $cookies.aut.indexOf('pa.p.id') === -1
				);
	};

	$scope.urlLogin = Config.urlLogin;
	$scope.urlLogout = Config.urlLogout;
	$scope.urlProfile = Config.urlProfile;
}
