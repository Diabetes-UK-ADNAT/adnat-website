'use strict';
function DashboardCtrl($scope, $routeParams, Person, $http, $cookies, $location) {
	// FIXME make auth service to guard no public functions ($cookies, $http)
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = 'https://auth.myadnat.co.uk/login'; //FIXME URL class
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";
	// 
//	// +Role checks
//	$scope.persons = Person.query(
//			function() {
//			},
//			function() {
//				toastr.error('Error loading data');
//			}
//	);

	$http.get('https://api.myadnat.co.uk/v1/persons', {
		params: {qRole: 'Patient'}
	}).then(function(response) {
		$scope.patients = response.data;
		angular.forEach($scope.patients, function(value, key) {
			$scope.patients[key].activity.lastAssessmentPosted = $scope.patients[key].activity.lastAssessmentPosted === null ? null : new Date($scope.patients[key].activity.lastAssessmentPosted);
		});
	}, function(error) {
		//do things with error
//		return "IT MESSED UP, YO";
	});
	$http.get('https://api.myadnat.co.uk/v1/persons', {
		params: {qRole: 'Practitioner'}
	}).then(function(response) {
		$scope.practitioners = response.data;
	}, function(error) {
		//do things with error
//		return "IT MESSED UP, YO";
	});
	$scope.roles = RoleOptions();
	$scope.role = $routeParams.role;

}


function RoleOptions() {
	return ["Patient", "Practitioner", "Site Admin", "Admin"];
}

//PersonCtrl.$inject = ['$scope', '$location', '$routeParams', 'Person'];
