'use strict';

function AssessmentCtrl($scope, $routeParams, Assessment) {
    $scope.assessments = Assessment.query();
    $scope.categoryOptions = AssessmentControllerHelper.categoryOptions();
    $scope.category = $routeParams.category;
}

function AssessmentCtrlDetail($scope, $location, $routeParams, Assessment) {
    $scope.categoryOptions = AssessmentControllerHelper.categoryOptions();
    $scope.categoryFilter = function(response) {
        return !$scope.cat || response.category.indexOf($scope.cat) === 0;
    };

    $scope.assessment = Assessment.get({id: $routeParams.id}, function() {
        $scope.updated = new Date($scope.assessment.updated).toString();
        if ($scope.assessment.score.psychColor) {
            $scope.psychImage = '/img/tl-' + $scope.assessment.score.psychColor.toLowerCase() + '.png';
        } else {
            $scope.psychImage = '/img/tl-none.png';
        }
        if ($scope.assessment.score.generalColor) {
            $scope.generalImage = '/img/tl-' + $scope.assessment.score.generalColor.toLowerCase() + '.png';
            ;
        } else {
            $scope.generalImage = '/img/tl-none.png';
        }
    });
}

var AssessmentControllerHelper = {
    'categoryOptions': function() {
        return [
            "About You",
            "Carbohydrates",
            "Drinking Alcohol",
            "Eating",
            "Eye Care",
            "Foot Care",
            "Going Out For The Day",
            "Going to Parties",
            "Illness",
            "Insulin Injections",
            "Insulin",
            "Living With Diabetes",
            "Making Food Choices",
            "Managing Your Blood Glucose When Being Active",
            "Managing Your Blood Glucose – HbA1c",
            "Managing Your Blood Glucose – Highs",
            "Managing Your Blood Glucose – Lows",
            "Managing Your Blood Glucose",
            "Medication Taking",
            "Physical Activity",
            "Smoking",
            "Staying Over at a Friends House",
            "Testing Your Blood Glucose",
            "Treating Hypos",
            "Using Your Insulin Pump",
            "Your Weight"
        ];
    }
};

//AssessmentCtrl.$inject = ['$scope', '$location', '$routeParams', 'Assessment'];
