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
		return !$scope.filterOnScoringQuestions   //filter is not active so return all
				|| response.type === 'SC-SL' // stoplight question types are all scored (psychosocial)
				// include all scored regardless of type
				|| AssessmentControllerHelper.arrayHasVal(AssessmentControllerHelper.scoredQuestionIds(), response.q)
				;
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
	},
			function() {
				toastr.error('Error loading data');
			});
}

var AssessmentControllerHelper = {
	'scoredQuestionIds': function() {
		// include all scored questions regardless of type.  source is touch app scoreconfigs.json q=int
		return [10, 11, 16, 18, 19, 20, 21, 22, 28, 29, 34, 35, 38, 41, 45, 48, 49, 50, 51, 53, 55, 56, 57, 66, 76, 77, 78, 80, 90, 91, 92, 94, 111, 112, 113, 117];
	},
	'arrayHasVal': function(arr, val) {
		for (var i = 0; arr !== null && i < arr.length; i++) {
			if (arr[i] === val) {
				return true;
			}
		}
		;
		return false;
	},
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
