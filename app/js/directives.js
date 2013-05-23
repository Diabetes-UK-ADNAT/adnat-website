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


//var app = angular.module('myApp.selectcontacts', []);
//
//app.directive('selectcontacts', function() {
//  var linkFunc = function(scope, element, attr, ngModel) {
//        sel = element.select2();    
//
//        ngModel.$render = function() {
//          if (ngModel.$viewValue !== null) {
//            sel.val(ngModel.$viewValue);
//            setTimeout(function(){
//              sel.trigger('change');
//            },0);
//              
//          }
//          else
//          {
//            sel.val(undefined).trigger('change');
//          }
//        };
//
//      };
//      
//  return {
//      restrict:'A',
//      require: '?ngModel',
//      link: linkFunc
//    };
//});

