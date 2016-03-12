(function (angular) {
angular.module('app.menu').
    directive('menuDirective', ['$timeout', 'PostService', 'CategoryService', menuDirective]);

function menuDirective() {
    return {
        scope: true,
        bindToController: {
            open: '=',
            elements: '='
        },
        templateUrl: 'components/menu/menu.directive.html',
        controllerAs: 'menuCtrl',
        controller: function($timeout, PostService, CategoryService) {
            var self = this;
        }
    };
}
})(angular);