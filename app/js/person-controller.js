'use strict';

function PersonCtrl($scope, $routeParams, Person) {
    $scope.persons = Person.query();
    $scope.roles = RoleOptions();
    $scope.role = $routeParams.role;
}

function PersonCtrlEdit($scope, $location, $routeParams, Person) {
    var self = this;

    $scope.roles = RoleOptions();
    $scope.person = Person.get({id: $routeParams.id}, function(person) {
        self.original = person;
        $scope.roleChoices = [];
        angular.forEach($scope.roles, function(value, key) {
            if (person.roles.indexOf(value) > -1) {
                $scope.roleChoices[key] = true;
            } else {
                $scope.roleChoices[key] = false;
            }
        });

        $scope.roleChoicesOriginal = [];
        angular.copy($scope.roleChoices, $scope.roleChoicesOriginal);
        $scope.person = new Person(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.person)
                &&
                angular.equals($scope.roleChoices, $scope.roleChoicesOriginal)
                ;
    };

    $scope.destroy = function() {
        Person.delete({id: $routeParams.id}, function() {
            $location.path('/person');
        });
    };
    $scope.save = function() {
        $scope.person.roles.length = 0;
        angular.forEach($scope.roleChoices, function(value, key) {
            if (value) {
                $scope.person.roles.push($scope.roles[key]);
            }
        });

        Person.save($scope.person, function() {
            $location.path('/person');
        });
    };
}

function PersonCtrlNew($scope, $location, Person) {
    $scope.roles = RoleOptions();
    $scope.roleChoices = [];
    $scope.save = function() {
        $scope.person.roles = [];
        angular.forEach($scope.roleChoices, function(value, key) {
            if (value) {
                $scope.person.roles.push($scope.roles[key]);
            }
        });

        Person.save($scope.person, function() {
            $location.path('/person');
        });
    };
}

function RoleOptions() {
    return ["Patient", "Clinician", "Admin"];
}

//PersonCtrl.$inject = ['$scope', '$location', '$routeParams', 'Person'];
