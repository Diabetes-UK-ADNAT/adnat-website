'use strict';

//http://localhost:9000/faqs.json
var DEV_ROOT_SERVICES_URL = 'https://api.myadnat.co.uk\\:4443/v1';
var DEV_ROOT_SERVICES_URL_PLAIN = 'https://api.myadnat.co.uk:4443/v1';
var PROD_ROOT_SERVICES_URL = 'https://api.myadnat.co.uk\\:443/v1';
var PROD_ROOT_SERVICES_URL_PLAIN = 'https://api.myadnat.co.uk:443/v1';
var ROOT_SERVICES_URL = PROD_ROOT_SERVICES_URL;
var ROOT_SERVICES_URL_PLAIN = PROD_ROOT_SERVICES_URL_PLAIN;

angular.module('myApp.services', []).value('version', '2.0');

angular.module('myApp.faq', ['ngResource']).factory('Faq', function($resource) {
   return $resource(ROOT_SERVICES_URL+'/faqs/:id', {} );
});

angular.module('myApp.content', ['ngResource']).factory('Content', function($resource) {
   return $resource(ROOT_SERVICES_URL+'/contents/:id', {} );
});

angular.module('myApp.person', ['ngResource']).factory('Person', function($resource) {
   return $resource(ROOT_SERVICES_URL+'/persons/:id', {} );
});

//override exception handler
angular.module('myApp.handler', ['ng']).factory('$exceptionHandler', function () {
    return function (exception, cause) {
        alert(exception.message); //fixme user messages?
    };
});

