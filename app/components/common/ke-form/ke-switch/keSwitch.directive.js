(function (angular) {
angular.module('app.common').
    directive('keSwitch', [keSwitchDirective]);

function keSwitchDirective() {
    return {
        scope: true,
        bindToController: {
            label: '@',
            id: '@',
            ngModel: '=',
            fullWidth: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-switch/ke-switch.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;

        self.id = angular.isDefined(self.id) ? self.id : 'keCheckbox';
    }
}
})(angular);