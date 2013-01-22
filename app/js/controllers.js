'use strict';

/* Controllers */
function Faq($scope, Faq) {
  $scope.faqs = Faq.query();
}
function FaqEdit($scope, Faq) {
	console.log('faq edit');
}
function FaqNew($scope, Faq) {
	console.log('faq new');
}
//Faq.$inject = ['$scope','Faq'];

//HelloCntl.$inject = [];
function HelloCntl() {
}
HelloCntl.$inject = [];

function MyCtrl1() {
}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function Hello() {
}
Hello.$inject = [];