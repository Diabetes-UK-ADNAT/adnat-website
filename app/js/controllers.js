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

function MenuCtrl($scope, $cookies) {
	$scope.isLoggedIn = function() {
	return !(
			typeof $cookies.aut === 'undefined'
			|| $cookies.aut.indexOf('pa.u.id') === -1
			&& $cookies.aut.indexOf('pa.u.exp') === -1
			&& $cookies.aut.indexOf('pa.p.id') === -1
			);
	};
}

