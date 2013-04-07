'use strict';

function AssessmentCtrl($scope, $routeParams, Assessment) {
    $scope.assessments = Assessment.query();
    $scope.categoryOptions = CategoryOptions();
    $scope.category = $routeParams.category;
}

function AssessmentCtrlDetail($scope, $location, $routeParams, Assessment) {
    $scope.categoryOptions = CategoryOptions();
    $scope.assessment = Assessment.get({id: $routeParams.id});
    $scope.categoryFilter = function( response ) {
        console.log(response);
        return !$scope.cat || response.category.indexOf($scope.cat) === 0;
    };
}

function CategoryOptions() {
    return ["Physical Activity", "About You"];
}

//AssessmentCtrl.$inject = ['$scope', '$location', '$routeParams', 'Assessment'];
