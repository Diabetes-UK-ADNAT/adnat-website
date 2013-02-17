'use strict';
describe('FaqCtrl', function() {
    var ctrl, myScope, $httpBackend;
    beforeEach(module('myApp.faq'));

    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
        myScope = $rootScope.$new();

        $httpBackend = _$httpBackend_;
        $httpBackend
                .expectGET(ROOT_SERVICES_URL_PLAIN + '/faqs.json')
                .respond([{question: 'Question 1'}, {question: 'Question 2'}]);
        ctrl = $controller(FaqCtrl, {$scope: myScope});
    }));

    // check scope state resulting from  controller activity
    it('FaqCtrl scope', function() {
        $httpBackend.flush();
        expect(myScope.faqs.length).toBe(2);
        expect(myScope.faqs[0].question).toBe('Question 1');
        expect(myScope.faqs[1].question).toBe('Question 2');
        expect(myScope.categoryOptions.length).toBe(2);
    });

});

describe('FaqCtrlNew', function() {
    var ctrl, myScope, $httpBackend;
    beforeEach(module('myApp.faq'));

    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, Faq) {
        myScope = $rootScope.$new();
        myScope.faq = Faq;
        $httpBackend = _$httpBackend_;
        $httpBackend
                .expectPOST(ROOT_SERVICES_URL_PLAIN + '/faqs.json')
                .respond();//[{question: 'Question 1'}, {question: 'Question 2'}]);
        ctrl = $controller(FaqCtrlNew, {$scope: myScope});
    }));

    // check scope state resulting from  controller activity
    it('FaqCtrlNew scope', function() {
        expect(myScope.categoryOptions.length).toBe(2);
        expect(myScope.categoryChoices.length).toBe(0);
        myScope.save();
        $httpBackend.flush();
    });

});

describe('FaqCtrlEdit', function() {
    var ctrl, myScope, $httpBackend;
    beforeEach(module('myApp.faq'));

    beforeEach(inject(function(_$httpBackend_, $controller, $routeParams, $rootScope, Faq) {
        myScope = $rootScope.$new();
        //myScope.faq = Faq;
        $routeParams.faqId = 2;
        $httpBackend = _$httpBackend_;
        $httpBackend
                .expectGET(ROOT_SERVICES_URL_PLAIN + '/faqs/2.json')
                .respond({question: 'Question 2', categories: ['Young People']});
        ctrl = $controller(FaqCtrlEdit, {$scope: myScope});
    }));

    // check scope state resulting from  controller activity
    it('FaqCtrlEdit scope', function() {
        $httpBackend.flush();
        expect(myScope.categoryOptions.length).toBe(2);
        expect(myScope.categoryChoices[0]).toBe(true);
        expect(myScope.categoryChoices[1]).toBe(false);
        expect(myScope.categoryChoicesOriginal.length).toBe(2);
        expect(myScope.isClean()).toBe(true);
        expect(myScope.faq.question).toBe('Question 2');
    });

});