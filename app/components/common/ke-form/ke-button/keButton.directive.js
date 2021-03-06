(function (angular) {
angular.module('app.common').
    directive('keButton', [keButtonDirective]);

function keButtonDirective() {
    var allowedTypes = ['warning', 'info', 'success', 'error'];
    return {
        scope: true,
        bindToController: {
            icon: '@',
            label: '@',
            fullWidth: '=',
            onClick: '=',
            type: '@',
            reverseLayout: '=',
            loading: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-button/ke-button.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;

        if(allowedTypes.indexOf(self.type) === -1) {
            self.type = 'info';
        }

        self.actionClick = function() {
            if(angular.isDefined(self.onClick)) {
                self.onClick();
            }
        }
    }
}
})(angular);