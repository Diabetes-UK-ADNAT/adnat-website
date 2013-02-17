'use strict';

function MyPageCtrl($scope, $routeParams) {
    $scope.contentx = $routeParams.id;//=  Content.get({id: $routeParams.id});
}
//HomeCtrl.$inject = ['$scope', '$routeParams'];
