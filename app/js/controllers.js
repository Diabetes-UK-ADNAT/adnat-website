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

	var isDev = true;
	$scope.urlLogin = isDev ? 'https://auth.myadnat.co.uk:4443/login' : 'https://auth.myadnat.co.uk/login';
	$scope.urlLogout = isDev ? 'https://auth.myadnat.co.uk:4443/logout' : 'https://auth.myadnat.co.uk/logout'; 
	$scope.urlProfile = isDev ? 'https://auth.myadnat.co.uk:4443/profile' : 'https://auth.myadnat.co.uk/profile'; 
}
