'use strict';

//http://localhost:9000/faqs.json
var ROOT_SERVICES_URL = 'http://localhost\\:9000';

angular.module('myApp.services', []).value('version', '0.2');

angular.module('myApp.faq', ['ngResource']).factory('Faq', function($resource) {
   return $resource(ROOT_SERVICES_URL+'/faqs/:id.json', {} );
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

