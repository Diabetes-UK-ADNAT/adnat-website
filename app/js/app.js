'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
	'myApp.services',
	'myApp.directives',
	'myApp.filters',
	'myApp.handler',
//	'myApp.selectcontacts',
	'ui.reset',
	'ui.tinymce',
	'ui.date',
	'ui.select2',
	'ngSanitize',
	'ngCookies',
	'http-auth-interceptor',
	'myLoginCheck'
]);

myApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/assessment/view/:id', {templateUrl: 'partials/assessment-detail.html', controller: AssessmentCtrlDetail});
		//
		$routeProvider.when('/page/edit/:id', {templateUrl: 'partials/page-detail.html', controller: PageCtrlEdit});
		$routeProvider.when('/page/new', {templateUrl: 'partials/page-detail.html', controller: PageCtrlNew});
		$routeProvider.when('/page/view/:id', {templateUrl: 'partials/page.html', controller: PageFindCtrl});
		$routeProvider.when('/page/hero/:id', {templateUrl: 'partials/page-hero-unit.html', controller: PageFindCtrl});
		$routeProvider.when('/page-list', {templateUrl: 'partials/page-list.html', controller: PageCtrl});
		//
		$routeProvider.when('/faq-list/:category', {templateUrl: 'partials/faq-list.html', controller: FaqCtrl});
		$routeProvider.when('/faq', {templateUrl: 'partials/faq.html', controller: FaqCtrl});
		$routeProvider.when('/faq/edit/:faqId', {templateUrl: 'partials/faq-detail.html', controller: FaqCtrlEdit});
		$routeProvider.when('/faq/new', {templateUrl: 'partials/faq-detail.html', controller: FaqCtrlNew});
		//
		$routeProvider.when('/group', {templateUrl: 'partials/group.html', controller: GroupCtrl});
		$routeProvider.when('/group/edit/:groupId', {templateUrl: 'partials/group-detail.html', controller: GroupCtrlEdit});
		$routeProvider.when('/group/new', {templateUrl: 'partials/group-detail.html', controller: GroupCtrlNew});
		//
		$routeProvider.when('/person/edit/:id', {templateUrl: 'partials/person-detail.html', controller: PersonCtrlEdit});
		$routeProvider.when('/person/new/:roles', {templateUrl: 'partials/person-detail.html', controller: PersonCtrlNew});
		$routeProvider.when('/person/new', {templateUrl: 'partials/person-detail.html', controller: PersonCtrlNew});
		$routeProvider.when('/person/testpw/:id', {templateUrl: 'partials/person-testpw.html', controller: PersonCtrlTestPw});
		//
		$routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: DashboardCtrl});
		//
		$routeProvider.when('/about', {redirectTo: '/page/view/5121823f3004e6347d119bb4'});
		$routeProvider.when('/contact', {redirectTo: '/page/view/5121823f3004e6347d119bb4'});
		$routeProvider.when('/for-patients', {redirectTo: '/page/view/51217c703004e6347d119baf'});
		$routeProvider.when('/for-practitioners', {redirectTo: '/page/view/5122fdcd3004511159c6444a'});
		$routeProvider.when('/contact', {redirectTo: '/page/view/5122ff963004511159c6444b'});
		$routeProvider.when('/references', {redirectTo: '/page/view/512301e53004511159c6444c'});
		$routeProvider.otherwise({redirectTo: '/page/hero/5121823f3004e6347d119bb4,51576ffee4b09cf566e5dfd9,51576fe7e4b09cf566e5dfd8,530e9a5ae4b09f0b73a9aecc'});
		//
//	}]);

	}]);



myApp.run(function($location, $logincheck) {
	if ($logincheck) {
		//if not a deep link, then do this (bookmarks, email urls)
		// but only works on full refresh not redirect from login
		if ($location.path() === '/' || angular.equals("/page/hero/5121823f3004e6347d119bb4,51576ffee4b09cf566e5dfd9,51576fe7e4b09cf566e5dfd8", $location.path())) {
			$location.path('/dashboard');
		}
	}
});
//
//	$scope.$watch(function() {
//		return $location.path();
//	}, function(newValue, oldValue) {
//		if ($scope.loggedIn === false && newValue !== 'https://auth.myadnat.co.uk:4443/login') {
//			$location.path('https://auth.myadnat.co.uk:4443/login');
//		}
//	});
