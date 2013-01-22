'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).value('version', '0.2');

angular.module('myApp.faq', ['ngResource']).factory('Faq', function($resource) {
	//return $resource('faqs.json');
	//return $resource('phones/:phoneId.json', {}, {
	return $resource('faqs.json', {}, {
		query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
	});
});

