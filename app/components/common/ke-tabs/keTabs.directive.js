angular.module('app.common').
    directive('keTabs', [keTabsDirective]);

function keTabsDirective() {
    return {
        scope: true,
        bindToController: {
            icon: '@',
            altIcon: '@'
        },
        transclude: true,
        templateUrl: 'components/common/ke-tabs/ke-tabs.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;

        }
    };
}