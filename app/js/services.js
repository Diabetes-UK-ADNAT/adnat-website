'use strict';

var services = angular.module('myApp.services', ['ngResource']);

services.value('version', Config.version);

services.factory('Faq', function($resource) {
	return $resource(Config.urlServicesRoot + '/faqs/:id', {});
});

services.factory('Content', function($resource) {
	return $resource(Config.urlServicesRoot+ '/contents/:id', {});
});

services.factory('Group', function($resource) {
	return $resource(Config.urlServicesRoot + '/groups/:id', {});
});

services.factory('Person', function($resource) {
	return $resource(Config.urlServicesRoot + '/persons/:id', {});
});

services.factory('Assessment', function($resource) {
	return $resource(Config.urlServicesRoot + '/assessments/:id', {});
});

angular.module('myApp.handler', ['ng']).factory('$exceptionHandler', function() {
	return function(exception, cause) {
		alert(exception.message); //fixme user messages?
	};
});
