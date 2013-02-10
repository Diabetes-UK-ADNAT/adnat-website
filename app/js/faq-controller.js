'use strict';

function FaqCtrl($scope, Faq) {
    $scope.faqs = Faq.query();
    $scope.categoryOptions = CategoryOptions();
}

function FaqCtrlEdit($scope, $location, $routeParams, Faq) {
    console.log('faq edit');
    console.log($routeParams.faqId);
    var self = this;

    $scope.categoryOptions = CategoryOptions();
    $scope.faq = Faq.get({id: $routeParams.faqId}, function(faq) {
        self.original = faq;
        $scope.categoryChoices = [];
        angular.forEach($scope.categoryOptions, function(value, key) {
            console.log('key'+key+ ' value ' + value + ' ' + faq.categories.indexOf(value))
            if (faq.categories.indexOf(value) > -1 ) {
                $scope.categoryChoices[key] = true;
            } else {
                $scope.categoryChoices[key] = false;
            }
        });
        $scope.faq = new Faq(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.faq)
                && angular.equals(self.categoryChoices, $scope.categoryChoices)
                ;
    };

    $scope.destroy = function() {
        console.log('destroy');
        Faq.delete({id: $routeParams.faqId}, function() {
            $location.path('/faq');
        });
    };
    $scope.save = function() {
        console.log('save');
        console.log($scope.faq);
        console.log($scope.categoryChoices);

        //save category choices
        console.log($scope.faq.categories);
        $scope.faq.categories.length = 0;
        console.log($scope.faq.categories);
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
    console.log('faq new');
    $scope.categoryOptions = CategoryOptions();
    $scope.categoryChoices = [];
    $scope.save = function() {
        console.log('save');
        Faq.save($scope.faq, function() {
            $location.path('/faq');
        });
    };
}

function CategoryOptions() {
    return ["opt1", "opt2"];
}

//FaqCtrl.$inject = ['$scope', '$routeParams', 'Faq'];
