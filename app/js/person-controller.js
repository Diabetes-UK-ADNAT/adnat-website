'use strict';

var PersonCtrlHelper = { // FIXME promote all dupe controller code here
	'careTeamPersonsSelect2': function($http, $cookies) {
		return {
			allowClear: true,
			blurOnChange: true,
			openOnEnter: false,
			minimumInputLength: 2,
			ajax: {
				url: Config.urlPersons,
				dataType: 'json',
				transport: function(queryParams) {
					$http.defaults.headers.common['X-Auth-Token'] = encodeURI($cookies.aut);
					queryParams.data.params = {"qName": queryParams.data.q, "qRole": 'Practitioner'};
					var result = $http.get(queryParams.url, queryParams.data).success(queryParams.success);
					result.abort = function() {
						return null;
					};
					return result;
				},
				data: function(term, page) {
					return {"q": term};
				},
				results: function(data, page) {
					return {results: data};
				}
			},
			id: function(item) {
				return item.uuid;
			},
			formatResult: function(data) {
				return data.name;
			},
			formatSelection: function(data) {
				return data.name;
			}
		};
	},
	'addToCareTeam': function($scope) {
		$scope.careTeam.push($scope.careTeamSearchItem);
		$scope.careTeamSearchItem = null;
	},
	'canAddToCareTeam': function($scope) {
		console.log($scope.careTeamSearchItem);
		console.log($scope.careTeam);
		var hasMember = false;
		angular.forEach($scope.careTeam, function(value, key) {
			if ($scope.careTeamSearchItem !== null) {
				if ($scope.careTeamSearchItem.uuid.indexOf(value.uuid) > -1) {
					console.log($scope.careTeamSearchItem.uuid);
					console.log(value.uuid);
					hasMember = true;
				}
			}
		});
		return !$scope.careTeamSearchItem || hasMember && $scope.careTeamSearchItem;
	},
	'removeFromCareTeam': function($scope, i) {
		$scope.careTeam.splice(i, 1);
	}
};

function PersonCtrlEdit($scope, $location, $routeParams, Person, Group, $http, limitToFilter, $cookies) {
	$scope.roleChoices = [];
	$scope.passwordConfirmation = null;
	$scope.password = null;
	$scope.roles = RoleOptions();
	$scope.disableRoleEdit = false;
	$scope.careTeamSearchItem = null;
	$scope.careTeam = [];

	$scope.person = Person.get({id: $routeParams.id}, function(person) {
		person.agreedToInformationSheet = person.agreedToInformationSheet === null ? null : new Date(person.agreedToInformationSheet);
		person.agreedToConsent = person.agreedToConsent === null ? null : new Date(person.agreedToConsent);
		person.agreedToAssent = person.agreedToAssent === null ? null : new Date(person.agreedToAssent);
		self.original = person;
		angular.forEach($scope.roles, function(value, key) {
			if (person.roles.indexOf(value) > -1) {
				$scope.roleChoices[key] = true;
			} else {
				$scope.roleChoices[key] = false;
			}
		});
		$scope.sites = Group.query(
				function() {
				},
				function() {
					toastr.error('Error loading data');
				}
		);

//		$scope.contacts = [
//			{
//				"title": "David",
//				"data": "whatever"
//			},
//			{
//				"title": "Alexander",
//				"data": "something"
//			}
//		];
//
//		$scope.modelObj = $scope.contacts[1];


		$scope.roleChoicesOriginal = [];
		angular.copy($scope.roleChoices, $scope.roleChoicesOriginal);
		$scope.careTeam = $scope.person.careTeam;
		$scope.person = new Person(self.original);
	},
			function() {
				toastr.error('Error loading data');
			});
// care team list builder
	$scope.hasRoleSelected = function(role) {
		// must use flag because returning from foreach just does continue on loop. 
		var found = false;
		angular.forEach($scope.person.roles, function(value, key) {
			if (value === role) {
				found = true;
			}
		});
		return found;
	};

	// wrap helpers in function to expose to view via scope, with all proper behavior (binding works correctly w/ function wrapper)
	$scope.careTeamPersons = PersonCtrlHelper.careTeamPersonsSelect2($http, $cookies);
	$scope.addToCareTeam = function() { PersonCtrlHelper.addToCareTeam($scope); };
	$scope.canAddToCareTeam = function() { return PersonCtrlHelper.canAddToCareTeam($scope); };
	$scope.removeFromCareTeam = function(i) { PersonCtrlHelper.removeFromCareTeam($scope, i); };

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
			toastr.info('Deleted ' + $scope.person.email);
			$location.path('/dashboard');
		},
				function() {
					toastr.error('Error deleting ' + $scope.person.email);
				}
		);
	};
	$scope.isValid = function() {
		if ($scope.hasRoleSelected('Patient')) {
			if ($scope.careTeam.length > 0
					&& $scope.person.agreedToInformationSheet !== null
					&& $scope.person.agreedToConsent !== null
					&& $scope.person.agreedToAssent !== null
					) {
				// valid
			} else {
				return false;
			}
		}
		if ($scope.person.site === null) {
			return false;
		}
		return true;
	};
	$scope.save = function() {
		angular.forEach($scope.careTeam, function(value, key) { //poc
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
		$scope.person.careTeam.length = 0;
		angular.forEach($scope.careTeam, function(value, key) {
			if (value) {
				$scope.person.careTeam.push($scope.careTeam[key]);
			}
		});
		$scope.person.password = $scope.password;
		Person.save(
				$scope.person,
				function() {
					toastr.info('Saved ' + $scope.person.email);
					$location.path('/dashboard');
				},
				function() {
					toastr.error('Error saving ' + $scope.person.email);
				}
		);
	};
	$scope.passwordInvalid = function() {
		return $scope.passwordConfirmation !== $scope.password;
	};
}

function PersonCtrlNew($scope, $location, $routeParams, Person, Group, $http, $cookies) {
	$scope.modeNew = true;
	$scope.person = {};
	$scope.person.agreedToInformationSheet = null;
	$scope.person.agreedToConsent = null;
	$scope.person.agreedToAssent = null;
	$scope.person.site = null;
	$scope.careTeamSearchItem = null;

	$scope.roleChoices = [];
	$scope.careTeam = [];
	$scope.passwordConfirmation = null;
	$scope.password = null;
	$scope.sites = Group.query(
			function() {
			},
			function() {
				toastr.error('Error loading data');
			}
	);
	// take passed in roles or default to all available
	//fixme validate passedin existin in RoleOptions();
	$scope.roleChoices = [];
	//$scope.person.roles = [];
	if ($routeParams.roles) {
		$scope.disableRoleEdit = true;
		$scope.roles = $routeParams.roles.split(',');
		angular.forEach($scope.roles, function(value, key) {
			$scope.roleChoices[key] = true;
			//$scope.person.roles.push(value);
		});
	} else {
		$scope.disableRoleEdit = false;
		$scope.roles = RoleOptions();
	}
	$scope.hasRoleSelected = function(role) {
		// must use flag because returning from foreach just does continue on loop. 
		var found = false;
		angular.forEach($scope.roles, function(value, key) {
			if (value === role) {
				found = true;
			}
		});
		return found;
	};



	$scope.careTeamPersons = PersonCtrlHelper.careTeamPersonsSelect2($http, $cookies);
	$scope.addToCareTeam = function() { PersonCtrlHelper.addToCareTeam($scope); };
	$scope.canAddToCareTeam = function() { return PersonCtrlHelper.canAddToCareTeam($scope); };
	$scope.removeFromCareTeam = function(i) { PersonCtrlHelper.removeFromCareTeam($scope, i); };




	$scope.isClean = function() {
		return angular.equals($scope.passwordConfirmation, $scope.password)
				&&
				$scope.passwordConfirmation === null
				&&
				$scope.password === null
				;
	};
	$scope.isValid = function() {
		if ($scope.hasRoleSelected('Patient')) {
			if ($scope.careTeam.length > 0
					&& $scope.person.agreedToInformationSheet !== null
					&& $scope.person.agreedToConsent !== null
					&& $scope.person.agreedToAssent !== null
					) {
				// valid
			} else {
				return false;
			}
		}
		if ($scope.person.site === null) {
			return false;
		}
		return true;
	};
	$scope.save = function() {
		$scope.person.roles = [];
		angular.forEach($scope.roleChoices, function(value, key) {
			if (value) {
				$scope.person.roles.push($scope.roles[key]);
			}
		});
		$scope.person.password = $scope.password;

		Person.save(
				$scope.person,
				function() {
					toastr.info('Saved ' + $scope.person.email);
					$location.path('/dashboard');
				},
				function() {
					toastr.error('Error saving ' + $scope.person.email);
				}
		);
	};
	$scope.passwordInvalid = function() {
		return $scope.passwordConfirmation !== $scope.password
				||
				($scope.passwordConfirmation === null
						&&
						$scope.password === null
						);
	};
}

function RoleOptions() {
	return ["Patient", "Practitioner", "Site Admin", "Admin"];
}

//PersonCtrl.$inject = ['$scope', '$location', '$routeParams', 'Person'];
