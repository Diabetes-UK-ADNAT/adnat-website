'use strict';

function PageCtrl($scope, $routeParams) {
    $scope.content = $routeParams.id;
}

function PageCtrlEdit($scope, $location, $routeParams, Content) {
    var self = this;
    $scope.content = Content.get({id: $routeParams.id}, function(content) {
        self.original = content;
        $scope.content = new Content(self.original);
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.content);
    };

    $scope.destroy = function() {
        Content.delete({id: $routeParams.id}, function() {
            $location.path('/page/' + $routeParams.id);
        });
    };
    $scope.save = function() {
        Content.save($scope.content, function() {
            $location.path('/page/' + $routeParams.id);
        });
    };
}

function PageCtrlNew($scope, $location, Content) {
    $scope.save = function() {
        Content.save($scope.content, function() {
            $location.path('/');
        });
    };
}

//ContentCtrl.$inject = ['$scope', '$location', '$routeParams', 'Content'];
