'use strict';

function GroupCtrl($scope, $routeParams, Group) {
	$scope.groups = Group.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
}

function GroupCtrlEdit($scope, $location, $routeParams, Group) {
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

function GroupCtrlNew($scope, $location, Group) {
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


