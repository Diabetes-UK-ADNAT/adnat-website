'use strict';

/* Controllers */
function Faq($scope, Faq) {
  $scope.faqs = Faq.query();
}

function FaqEdit($scope, $location, $routeParams, Faq) {
  console.log('faq edit');
  console.log( $routeParams.faqId );
  var self = this;
/*
  Faq.get({id: $routeParams.faqId}, function(faq) {
    self.original = faq;
    $scope.faq = new Faq(self.faq);
});
*/

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.faq);
  };
 
  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/faq');
    });
  };
  $scope.save = function() {
	  console.log('save');
  };
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