'use strict';

function PersonCtrl($scope, $routeParams, Person, $http, $cookies, $location) {
	// FIXME make auth service to guard no public functions ($cookies, $http)
	if (typeof $cookies.aut === 'undefined' || $cookies.aut.indexOf('pa.u.id') === -1 && $cookies.aut.indexOf('pa.u.exp') === -1 && $cookies.aut.indexOf('pa.p.id') === -1) {
		window.location = 'https://auth.myadnat.co.uk:4443/login'; //FIXME URL class
		return;
	}
	// must encodeURI for FireFox or get an error alert
	$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
	// 
	// +Role checks
	$scope.persons = Person.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
	$scope.roles = RoleOptions();
	$scope.role = $routeParams.role;

}

function PersonCtrlEdit($scope, $location, $routeParams, Person, Group) {//, $http, limitToFilter) {
	var self = this;

//  $scope.cities = function(cityName) {
//    return $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter=US&q="+cityName).then(function(response){
//      return limitToFilter(response.data, 15);
//    });
//  };
	$scope.selected = undefined;
	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


	$scope.passwordConfirmation = null;
	$scope.password = null;
	$scope.roles = RoleOptions();
	$scope.disableRoleEdit = false;
	$scope.person = Person.get({id: $routeParams.id}, function(person) {
		person.dob = new Date(person.dob);
		person.agreedToTermsAndConditions = new Date(person.agreedToTermsAndConditions);
		person.agreedToPrivacyPolicy = new Date(person.agreedToPrivacyPolicy);
		self.original = person;
		$scope.roleChoices = [];
		angular.forEach($scope.roles, function(value, key) {
			if (person.roles.indexOf(value) > -1) {
				$scope.roleChoices[key] = true;
			} else {
				$scope.roleChoices[key] = false;
			}
		});
		$scope.groups = Group.query(
				function() {
					//init select? $scope.myForm.group = $scope.person.group.name;
				},
				function() {
					toastr.error('Error loading data');
				}
		);
		$scope.roleChoicesOriginal = [];
		angular.copy($scope.roleChoices, $scope.roleChoicesOriginal);
		$scope.person = new Person(self.original);
	},
			function() {
				toastr.error('Error loading data');
			});
	$scope.itemList = ["one", "two", "three"]; //poc
	$scope.addItem = function() {
		$scope.itemList.push("another item " + new Date());
	};
	$scope.removeItem = function() {
//$scope.itemList.push("another item " + new Date());
	};
	$scope.isClean = function() {
		return angular.equals(self.original, $scope.person)
				&&
				angular.equals($scope.roleChoices, $scope.roleChoicesOriginal)
				&&
				angular.equals($scope.passwordConfirmation, $scope.password)
				&&
				$scope.passwordConfirmation === null
				&&
				$scope.password === null
				;
	};
	$scope.destroy = function() {
		Person.delete(
				{id: $routeParams.id},
		function() {
			toastr.info('Deleted ' + $scope.person.name.firstNames + ' ' + $scope.person.name.lastName);
			$location.path('/person');
		},
				function() {
					toastr.error('Error deleting ' + $scope.person.name.firstNames + ' ' + $scope.person.name.lastName);
				}
		);
	};
	$scope.save = function() {
		angular.forEach($scope.itemList, function(value, key) { //poc
			if (value) {
				console.log(key);
				console.log(value);
			}
		});
		$scope.person.roles.length = 0;
		angular.forEach($scope.roleChoices, function(value, key) {
			if (value) {
				$scope.person.roles.push($scope.roles[key]);
			}
		});
		Person.save(
				$scope.person,
				function() {
					toastr.info('Saved ' + $scope.person.name.firstNames + ' ' + $scope.person.name.lastName);
					$location.path('/person');
				},
				function() {
					toastr.error('Error saving ' + $scope.person.name.firstNames + ' ' + $scope.person.name.lastName);
				}
		);
	};
	$scope.passwordInvalid = function() {
		return $scope.passwordConfirmation !== $scope.password;
	};
}

function PersonCtrlNew($scope, $location, $routeParams, Person, Group) {
	$scope.groups = Group.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
	// take passed in roles or default to all available
	//fixme validate passedin existin in RoleOptions();
	$scope.roleChoices = [];
	if ($routeParams.roles) {
		$scope.disableRoleEdit = true;
		$scope.roles = $routeParams.roles.split(',');
		angular.forEach($scope.roles, function(value, key) {
			$scope.roleChoices[key] = true;
		});
	} else {
		$scope.disableRoleEdit = false;
		$scope.roles = RoleOptions();
	}

	$scope.save = function() {
		$scope.person.roles = [];
		angular.forEach($scope.roleChoices, function(value, key) {
			if (value) {
				$scope.person.roles.push($scope.roles[key]);
			}
		});
		Person.save(
				$scope.person,
				function() {
					toastr.info('Saved ' + $scope.person.name.firstNames + ' ' + $scope.person.name.lastName);
					$location.path('/person');
				},
				function() {
					toastr.error('Error saving ' + $scope.person.name.firstNames + ' ' + $scope.person.name.lastName);
				}
		);
	};
	//$scope.passwordRequired = true;
	$scope.passwordInvalid = function() {
		return $scope.passwordConfirmation !== $scope.password;
	};
}

function RoleOptions() {
	return ["Patient", "Clinician", "Site Admin", "Admin"];
}

//PersonCtrl.$inject = ['$scope', '$location', '$routeParams', 'Person'];
