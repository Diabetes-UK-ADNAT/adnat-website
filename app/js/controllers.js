'use strict';

/* Controllers */
function Faq($scope, Faq) {
  $scope.faqs = Faq.query();
}
Faq.$inject = ['$scope','Faq'];

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