'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
    'myApp.filters',
    'myApp.services',
    'myApp.faq',
    'myApp.directives',
    'ui.bootstrap',
    'ng'
]).
        config(['$routeProvider', function($routeProvider) {
//		$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
//		$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
//		$routeProvider.when('/hello', {templateUrl: 'partials/hello.html', controller: Hello});
//		$routeProvider.when('/user', {templateUrl: 'partials/user.html', controller: User});
//		$routeProvider.when('/group', {templateUrl: 'partials/group.html', controller: Group});
        $routeProvider.when('/', {templateUrl: 'partials/home.html'});
        $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
        $routeProvider.when('/faq', {templateUrl: 'partials/faq.html', controller: FaqCtrl});
        $routeProvider.when('/faq/edit/:faqId', {templateUrl: 'partials/faq-detail.html', controller: FaqCtrlEdit});
        $routeProvider.when('/faq/new', {templateUrl: 'partials/faq-detail.html', controller: FaqCtrlNew});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

myApp.factory('$exceptionHandler', function () {
    return function (exception, cause) {
        alert(exception.message);
    };
});
