'use strict';

function FaqCtrl($scope, Faq) {
    $scope.faqs = Faq.query();
    $scope.categoryOptions = CategoryOptions();
}

function FaqCtrlEdit($scope, $location, $routeParams, Faq) {
    var self = this;

    $scope.categoryOptions = CategoryOptions();
    $scope.faq = Faq.get({id: $routeParams.faqId}, function(faq) {
        self.original = faq;
        $scope.categoryChoices = [];
        angular.forEach($scope.categoryOptions, function(value, key) {
            if (faq.categories.indexOf(value) > -1) {
                $scope.categoryChoices[key] = true;
            } else {
                $scope.categoryChoices[key] = false;
            }
        });

        $scope.categoryChoicesOriginal = [];
        angular.copy($scope.categoryChoices, $scope.categoryChoicesOriginal);
        $scope.faq = new Faq(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.faq)
                &&
                angular.equals($scope.categoryChoices, $scope.categoryChoicesOriginal)
                ;
    };

    $scope.destroy = function() {
        Faq.delete({id: $routeParams.faqId}, function() {
            $location.path('/faq');
        });
    };
    $scope.save = function() {
        $scope.faq.categories.length = 0;
        angular.forEach($scope.categoryChoices, function(value, key) {
            if (value) {
                $scope.faq.categories.push($scope.categoryOptions[key]);
            }
        });

        Faq.save($scope.faq, function() {
            $location.path('/faq');
        });
    };
}

function FaqCtrlNew($scope, $location, Faq) {
    $scope.categoryOptions = CategoryOptions();
    $scope.categoryChoices = [];
    $scope.save = function() {
        $scope.faq.categories = [];
        angular.forEach($scope.categoryChoices, function(value, key) {
            if (value) {
                $scope.faq.categories.push($scope.categoryOptions[key]);
            }
        });

        Faq.save($scope.faq, function() {
            $location.path('/faq');
        });
    };
}

function CategoryOptions() {
    return ["Young People", "Health Professionals"];
}

//FaqCtrl.$inject = ['$scope', '$location', '$routeParams', 'Faq'];
