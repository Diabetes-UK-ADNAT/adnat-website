'use strict';

//http://localhost:9000/faqs.json
var ROOT_SERVICES_URL = 'http://emlair\\:9000/v1';
var ROOT_SERVICES_URL_PLAIN = 'http://emlair:9000/v1';

angular.module('myApp.services', []).value('version', '0.2');

angular.module('myApp.faq', ['ngResource']).factory('Faq', function($resource) {
   return $resource(ROOT_SERVICES_URL+'/faqs/:id.json', {} );
});

angular.module('myApp.content', ['ngResource']).factory('Content', function($resource) {
   return $resource(ROOT_SERVICES_URL+'/contents/:id.json', {} );
});

//override exception handler
angular.module('myApp.handler', ['ng']).factory('$exceptionHandler', function () {
    return function (exception, cause) {
        alert(exception.message); //fixme user messages?
    };
});

