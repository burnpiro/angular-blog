(function (angular) {
angular.module('app.common').
    directive('keInputText', [keInputTextDirective]);

function keInputTextDirective() {
    return {
        scope: true,
        bindToController: {
            icon: '@',
            type: '@',
            placeholder: '@',
            label: '@',
            required: '=',
            fullWidth: '@',
            ngModel: '=',
            onChange: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-input-text/ke-input-text.directive.html',
        controller: ctrl
    };

    function ctrl() {

    }
}
})(angular);