(function (angular) {
angular.module('app.common').
    directive('keReverseButton', [keIconButtonDirective]);

function keIconButtonDirective() {
    return {
        scope: {
            icon: '@',
            link: '@'
        },
        templateUrl: 'components/common/ke-reverse-button/ke-reverse-button.directive.html'
    };
}
})(angular);