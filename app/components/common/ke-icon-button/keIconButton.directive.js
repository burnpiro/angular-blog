angular.module('app.common').
    directive('keIconButton', [keIconButtonDirective]);

function keIconButtonDirective() {
    return {
        scope: true,
        bindToController: {
            icon: '@',
            altIcon: '@',
            close: '=',
            bordered: '@',
            title: '@',
            noClose: '=',
            noAction: '=',
            color: '@'
        },
        templateUrl: 'components/common/ke-icon-button/ke-icon-button.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            self.close = false;
            self.altIcon = angular.isDefined(self.altIcon) ? self.altIcon : 'fa-times';

            self.toggle = function() {
                if(!self.noAction) {
                    self.close = !self.close;
                }
            };
        }
    };
}