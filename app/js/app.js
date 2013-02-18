'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
    'myApp.content',
    'myApp.directives',
    'myApp.faq',
    'myApp.filters',
    'myApp.handler',
    'myApp.person',
    'myApp.services',
    'ui', //angular-ui
//    'ui.bootstrap',
    'ngSanitize'
]);

myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/page/edit/:id', {templateUrl: 'partials/page-detail.html', controller: PageCtrlEdit});
        $routeProvider.when('/page/view/:id', {templateUrl: 'partials/page.html', controller: PageFindCtrl});
        $routeProvider.when('/page/new', {templateUrl: 'partials/page-detail.html', controller: PageCtrlNew});
        //
        $routeProvider.when('/faq-list/:category', {templateUrl: 'partials/faq-list.html', controller: FaqCtrl});
        $routeProvider.when('/faq', {templateUrl: 'partials/faq.html', controller: FaqCtrl});
        $routeProvider.when('/faq/edit/:faqId', {templateUrl: 'partials/faq-detail.html', controller: FaqCtrlEdit});
        $routeProvider.when('/faq/new', {templateUrl: 'partials/faq-detail.html', controller: FaqCtrlNew});
        //
        $routeProvider.when('/person', {templateUrl: 'partials/person.html', controller: PersonCtrl});
        $routeProvider.when('/person/edit/:id', {templateUrl: 'partials/person-detail.html', controller: PersonCtrlEdit});
        $routeProvider.when('/person/new', {templateUrl: 'partials/person-detail.html', controller: PersonCtrlNew});
        //
        $routeProvider.when('/about', {redirectTo: '/page/view/5121823f3004e6347d119bb4'});
        $routeProvider.otherwise({redirectTo: '/page/view/5121823f3004e6347d119bb4'});

    }]);
