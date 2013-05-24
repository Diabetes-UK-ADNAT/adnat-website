'use strict';

var ServiceUrls = {
	'isDev': false,
	'rootServicesUrl': function() {
		return this.isDev ? 'https://api.myadnat.co.uk\\:4443/v1' : 'https://api.myadnat.co.uk\\:443/v1';
	}
	, 'rootServicesUrlPlain': function() {
		return this.isDev ? 'https://api.myadnat.co.uk:4443/v1' : 'https://api.myadnat.co.uk:443/v1';
	}
};

angular.module('myApp.services', []).value('version', '2.0');

angular.module('myApp.faq', ['ngResource']).factory('Faq', function($resource) {
	return $resource(ServiceUrls.rootServicesUrl() + '/faqs/:id', {});
});

angular.module('myApp.content', ['ngResource']).factory('Content', function($resource) {
	return $resource(ServiceUrls.rootServicesUrl() + '/contents/:id', {});
});

angular.module('myApp.group', ['ngResource']).factory('Group', function($resource) {
	return $resource(ServiceUrls.rootServicesUrl() + '/groups/:id', {});
});

angular.module('myApp.person', ['ngResource']).factory('Person', function($resource) {
    return $resource(ServiceUrls.rootServicesUrl() + '/persons/:id', {});
});

angular.module('myApp.assessment', ['ngResource']).factory('Assessment', function($resource) {
	return $resource(ServiceUrls.rootServicesUrl() + '/assessments/:id', {});
});

angular.module('myApp.handler', ['ng']).factory('$exceptionHandler', function() {
	return function(exception, cause) {
		alert(exception.message); //fixme user messages?
	};
});
