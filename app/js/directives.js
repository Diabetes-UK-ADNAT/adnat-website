'use strict';

angular.module('myApp.directives', [])
		.directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);
//		.directive('loginManager', function() {
////	return {
////		restrict: 'C',
////		link: function(scope, elem, attrs) {
////			scope.$on('event:auth-loginRequired', function() {
////				console.log('login req');
////			});
////			scope.$on('event:auth-loginConfirmed', function() {
////				console.log('login conf');
////			});
////		}
////	}
//});
  