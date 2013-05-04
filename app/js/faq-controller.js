'use strict';


function FaqCtrl($scope, $routeParams, Faq, $cookies) {
	$scope.faqs = Faq.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
	$scope.categoryOptions = FaqControllerHelper.categoryOptions();
	$scope.category = $routeParams.category;
	console.log($cookies.aut);
}

//FaqCtrlEdit.$inject = ['$scope', '$location', '$routeParams', 'Faq'];
function FaqCtrlEdit($scope, $location, $routeParams, Faq) {
	var self = this;

	$scope.categoryOptions = FaqControllerHelper.categoryOptions();
	$scope.faq = Faq.get({id: $routeParams.faqId}, function(faq) {
		self.original = faq;
		$scope.categoryChoices = [];
		angular.forEach($scope.categoryOptions, function(value, key) {
			if (faq.categories.indexOf(value) > -1) {
				$scope.categoryChoices[key] = true;
			} else {
				$scope.categoryChoices[key] = false;
			}
		});

		$scope.categoryChoicesOriginal = [];
		angular.copy($scope.categoryChoices, $scope.categoryChoicesOriginal);
		$scope.faq = new Faq(self.original);
	},
			function() {
				toastr.error('Error loading data');
			});

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.faq)
				&&
				angular.equals($scope.categoryChoices, $scope.categoryChoicesOriginal)
				;
	};

	$scope.destroy = function() {
		Faq.delete({id: $routeParams.faqId}, function() {
			toastr.info('Deleted ' + $scope.faq.question);
			$location.path('/faq');
		},
				function() {
					toastr.error('Error deleting ' + $scope.faq.question);
				}
		);
	};
	$scope.save = function() {
		$scope.faq.categories.length = 0;
		angular.forEach($scope.categoryChoices, function(value, key) {
			if (value) {
				$scope.faq.categories.push($scope.categoryOptions[key]);
			}
		});

		Faq.save($scope.faq, function() {
					toastr.info('Saved ' + $scope.faq.question);
					$location.path('/faq');
				},
				function() {
					toastr.error('Error saving ' + $scope.faq.question);
				});
	};
}

function FaqCtrlNew($scope, $location, Faq) {
	$scope.categoryOptions = FaqControllerHelper.categoryOptions();
	$scope.categoryChoices = [];
	$scope.save = function() {
		$scope.faq.categories = [];
		angular.forEach($scope.categoryChoices, function(value, key) {
			if (value) {
				$scope.faq.categories.push($scope.categoryOptions[key]);
			}
		});

		Faq.save($scope.faq, function() {
					toastr.info('Saved ' + $scope.faq.question);
					$location.path('/faq');
				},
				function() {
					toastr.error('Error saving ' + $scope.faq.question);
				});
	};
}

var FaqControllerHelper = {
	'categoryOptions': function() {
		return ["Young People", "Health Professionals"];
	}
};

