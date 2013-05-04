'use strict';
function PageCtrl($scope, $routeParams, Content) {
	$scope.pages = Content.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			});
}
function PageFindCtrl($scope, $routeParams, Content) {
	var ids = $routeParams.id.split(',');
	$scope.content = [];
	ids.forEach(function(item) {
		$scope.content.push(Content.get({id: item}));
	});
}

function PageCtrlEdit($scope, $location, $routeParams, Content) {
	var self = this;
	$scope.content = Content.get({id: $routeParams.id}, function(content) {
		self.original = content;
		$scope.content = new Content(self.original);
	},
			function() {
				toastr.error('Error loading data');
			});

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.content);
	};

	$scope.destroy = function() {
		Content.delete({id: $routeParams.id},
		function() {
			toastr.info('Deleted ' + $scope.content.title);
			$location.path('/page-list');
		},
				function() {
					toastr.error('Error deleting ' + $scope.content.title);
				}
		);
	};
	$scope.save = function() {
		Content.save($scope.content,
				function() {
					toastr.info('Saved ' + $scope.content.title);
					$location.path('/page-list');
				},
				function() {
					toastr.error('Error saving ' + $scope.content.title);
				});
	};
}

function PageCtrlNew($scope, $location, Content) {
	$scope.content = new Content();
	$scope.save = function() {
		Content.save($scope.content,
				function() {
					toastr.info('Saved ' + $scope.content.title);
					$location.path('/page-list');
				},
				function() {
					toastr.error('Error saving ' + $scope.content.title);
				});
	};
}

//ContentCtrl.$inject = ['$scope', '$location', '$routeParams', 'Content'];
