'use strict';

function GroupCtrl($scope, $routeParams, Group, $http, $cookies, $location) {
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = Config.urlLogin;
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";

	$scope.groups = Group.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
}

function GroupCtrlEdit($scope, $routeParams, Group, $http, $cookies, $location) {
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = Config.urlLogin;
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";


	var self = this;

	$scope.group = Group.get({id: $routeParams.groupId}, function(group) {
		self.original = group;
		$scope.group = new Group(self.original);
	},
			function() {
				toastr.error('Error loading data');
			});

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.group);
	};

	$scope.destroy = function() {
		Group.delete({id: $routeParams.groupId}, function() {
			toastr.info('Deleted ' + $scope.group.name);
			$location.path('/group');
		},
				function() {
					toastr.error('Error deleting ' + $scope.group.name);
				}
		);
	};
	$scope.save = function() {
		Group.save($scope.group, function() {
			toastr.info('Saved ' + $scope.group.name);
			$location.path('/group');
		},
				function() {
					toastr.error('Error saving ' + $scope.group.name);
				});
	};
}

function GroupCtrlNew($scope, Group, $http, $cookies, $location) {
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = Config.urlLogin;
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	$http.defaults.headers.common['X-App-Key'] = "13B6EFE5-63EE-4F1C-A486-76B24AAE1704";

	$scope.save = function() {
		Group.save($scope.group, function() {
			toastr.info('Saved ' + $scope.group.name);
			$location.path('/group');
		},
				function() {
					toastr.error('Error saving ' + $scope.group.name);
				});
	};
}


