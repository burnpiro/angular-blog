(function (angular) {
angular.module('app.common').
    directive('keTextarea', [keTextareaDirective]);

function keTextareaDirective() {
    return {
        scope: true,
        bindToController: {
            type: '@',
            placeholder: '@',
            label: '@',
            required: '=',
            fullWidth: '@',
            ngModel: '=',
            rows: '@',
            onChange: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-textarea/ke-textarea.directive.html',
        controller: ctrl
    };

    function ctrl() {
        self.rows = angular.isDefined(self.rows) ? self.rows : 3;
    }
}
})(angular);