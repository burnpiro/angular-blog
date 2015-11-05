angular.module('app.common').
    directive('keInputText', [keInputTextDirective]);

function keInputTextDirective() {
    return {
        scope: {
            icon: '@',
            type: '@',
            placeholder: '@',
            label: '@',
            required: '=',
            fullWidth: '@',
            ngModel: '=',
            onChange: '='
        },
        templateUrl: 'components/common/ke-input-text/ke-input-text.directive.html'
    };
}