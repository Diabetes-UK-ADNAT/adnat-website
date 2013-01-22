'use strict';

/* Controllers */
function Faq($scope) {
  //Faq.query();
  $scope.faqs = [
	  {"question":"question one", "answer":"answer one", "category":"cat1"},
	  {"question":"question two", "answer":"answer two", "category":"cat1"},
	  {"question":"question three", "answer":"answer three", "category":"cat2"}
  ];
}
//Faq.$inject = ['$scope'];

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