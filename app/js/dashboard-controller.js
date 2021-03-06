'use strict';
function DashboardCtrl($scope, $routeParams, Person, $http, $cookies, $location) {
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = Config.urlLogin;
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";

	// auth subject
	$http.get(Config.urlSubject).then(function(response) {
		$scope.subject = response.data;
	}, function(error) {
	});
	$scope.hasRole = function(role) {
		// must use flag because returning from foreach just does continue on loop. 
		var found = false;
		if ($scope.subject) {
			angular.forEach($scope.subject.roles, function(value, key) {
				if (value === role) {
					found = true;
				}
			});
		}
		return found;
	};
	$http.get(Config.urlPersons, {
		params: {qRole: 'Patient'}
	}).then(function(response) {
		$scope.patients = response.data;
		angular.forEach($scope.patients, function(value, key) {
			$scope.patients[key].activity.lastAssessmentPosted = $scope.patients[key].activity.lastAssessmentPosted === null ? null : new Date($scope.patients[key].activity.lastAssessmentPosted);
		});
	}, function(error) {
		//do things with error
	});
	$http.get(Config.urlPersons, {
		params: {qRole: 'Practitioner'}
	}).then(function(response) {
		$scope.practitioners = response.data;
	}, function(error) {
		//do things with error
	});
	$scope.roles = RoleOptions();
	$scope.role = $routeParams.role;
}


function RoleOptions() {
	return ["Patient", "Practitioner", "Site Admin", "Admin"];
}

