'use strict';

function PageCtrl($scope, $routeParams) {
    $scope.content = $routeParams.id;//=  Content.get({id: $routeParams.id});
}
//HomeCtrl.$inject = ['scope'];
