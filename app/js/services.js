'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).value('version', '0.2');

angular.module('myApp.faq', ['ngResource']).factory('Faq', function($resource) {
   return $resource('faqs:id.json', {} );
});


	//return $resource('faqs.json');
	//return $resource('phones/:phoneId.json', {}, {
//	var Faq = $resource('faqs:id.json', {}, {
//		query: {method: 'GET', params: {faqId: 'faqs'}, isArray: true},
//		get: {method: 'GET', params: {faqId: 'faqs'}, isArray: false}
//	});
//
//	Faq.prototype.update = function(cb) {
//		return Faq.update({id: this.id},
//		angular.extend({}, this, {id: undefined}), cb);
//	};
//
//	Faq.prototype.destroy = function(cb) {
//		return Faq.remove({id: this.id}, cb);
//	};
//
//	return Faq;
//});

