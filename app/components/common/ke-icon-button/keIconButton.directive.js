angular.module('app.common').
    directive('keIconButton', [keIconButtonDirective]);

function keIconButtonDirective() {
    return {
        scope: true,
        bindToController: {
            icon: '@',
            close: '=',
            bordered: '@',
            noClose: '=',
            noAction: '='
        },
        templateUrl: 'components/common/ke-icon-button/ke-icon-button.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            self.close = false;

            self.toggle = function() {
                if(!self.noAction) {
                    self.close = !self.close;
                }
            };
        }
    };
}