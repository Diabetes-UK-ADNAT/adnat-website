'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.faq', 'myApp.directives']).
		config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
		$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
		$routeProvider.when('/hello', {templateUrl: 'partials/hello.html', controller: Hello});
		$routeProvider.when('/user', {templateUrl: 'partials/user.html', controller: User});
		$routeProvider.when('/group', {templateUrl: 'partials/group.html', controller: Group});
		$routeProvider.when('/faq', {templateUrl: 'partials/faq.html', controller: Faq});
		$routeProvider.when('/faq/edit/:faqId', {templateUrl: 'partials/faq-detail.html', controller: FaqEdit});
		$routeProvider.when('/faq/new', {templateUrl: 'partials/faq-detail.html', controller: FaqNew});
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);
