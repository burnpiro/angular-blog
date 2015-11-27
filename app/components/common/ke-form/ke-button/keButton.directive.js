angular.module('app.common').
    directive('keButton', [keButtonDirective]);

function keButtonDirective() {
    return {
        scope: true,
        bindToController: {
            icon: '@',
            label: '@',
            fullWidth: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-button/ke-button.directive.html',
        controller: ctrl
    };

    function ctrl() {

    }
}