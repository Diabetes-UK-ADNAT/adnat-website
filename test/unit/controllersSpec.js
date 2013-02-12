'use strict';
describe('FaqCtrl', function() {
    var ctrl, myScope;
    beforeEach(module('myApp.faq'));

    beforeEach(inject(function($controller, $rootScope) {
        // set scope state in controller activity
        myScope = $rootScope.$new();
        
        // mock myFaq service to avoid real service call in unit test
        var myFaq = new Object(); 
        myFaq.query = function() {return [1,2]};
         
        ctrl = $controller('FaqCtrl', {
            $scope: myScope, Faq: myFaq
        });
    }));

    // check scope state resulting from  controller activity
    it('FaqCtrl scope', function() {
        expect(myScope.faqs.length).toBe(2);
        expect(myScope.categoryOptions.length).toBe(2);
    });
});