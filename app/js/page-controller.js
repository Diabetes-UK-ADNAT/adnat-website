'use strict';
function PageCtrl($scope, $routeParams, Content) {
    $scope.pages = Content.query();
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
    });

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.content);
    };

    $scope.destroy = function() {
        Content.delete({id: $routeParams.id}, function() {
            $location.path('/page-list');
        });
    };
    $scope.save = function() {
        Content.save($scope.content, function() {
            $location.path('/page-list');
        });
    };
}

function PageCtrlNew($scope, $location, Content) {
    $scope.content = new Content();
    $scope.save = function() {
        Content.save($scope.content, function() {
            // location in header
            $location.path('/page-list');
        });
    };
}

//ContentCtrl.$inject = ['$scope', '$location', '$routeParams', 'Content'];
