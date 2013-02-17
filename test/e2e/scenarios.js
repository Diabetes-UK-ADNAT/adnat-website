'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

    beforeEach(function() {
        browser().navigateTo('../../app/index.html');
    });

    it('should automatically redirect to / when location hash/fragment is empty', function() {
        expect(browser().location().url()).toBe("/");
    });

    describe('home', function() {
        beforeEach(function() {
            browser().navigateTo('#/page/1');
        });

        it('should render home when user navigates to /home', function() {
            expect(browser().location().url()).toBe("/page/1");
            expect(element('title').text()).toMatch('ADNAT');
            //pause();
            expect(element('#content').html()).toContain('');
            expect(element('body').text()).toMatch(".*Angular seed app.*");
            expect(element('body').html()).toContain("Welcome to ADNAT");
            expect(element('#testanid').html()).toContain('OK');

        });
    });
    describe('faq', function() {
        beforeEach(function() {
            browser().navigateTo('#/faq');
        });

        it('should render faq when user navigates to /faq', function() {
            expect(browser().location().url()).toBe("/faq");
        });
        it('should allow search input', function() {
            expect(browser().location().url()).toBe("/faq");
            input('search').enter('1');
            expect(element('body').text()).toMatch(".*Angular seed app.*");
            expect(element('body').text()).toContain("FAQs");

            //expect(binding('search')).toBe('x');
        });
//        it('should filter the phone list as user types into the search box', function() {
//            expect(repeater('.faqs td').count()).toBe(2);
//
//            input('query').enter('1');
//            expect(repeater('.faqs td').count()).toBe(1);
//        });
    });

});

