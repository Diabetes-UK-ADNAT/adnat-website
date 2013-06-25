'use strict';

function AssessmentCtrl($scope, $routeParams, Assessment, $http, $cookies, $location) {
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = Config.urlLogin;
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";

	$scope.assessments = Assessment.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
	$scope.categoryOptions = AssessmentControllerHelper.categoryOptions();
	$scope.category = $routeParams.category;
}

function AssessmentCtrlDetail($scope, $routeParams, Assessment, $http, $cookies, $location) {
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = Config.urlLogin;
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";

	$scope.filterOnScoringQuestions = false;

	$scope.categoryOptions = AssessmentControllerHelper.categoryOptions();
	$scope.categoryFilter = function(response) {
		return !$scope.cat || response.category.indexOf($scope.cat) === 0;
	};

	$scope.isScoringQuestionFilter = function(response) {
		return !$scope.filterOnScoringQuestions || response.type === 'SC-SL';
	}

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
	},
			function() {
				toastr.error('Error loading data');
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
