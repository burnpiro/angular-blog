angular.module('app.common').
    directive('keTab', [keTabDirective]);

function keTabDirective() {
    return {
        scope: true,
        require: '^tabs',
        bindToController: {
            title: '@'
        },
        transclude: true,
        templateUrl: 'components/common/ke-tabs/ke-tab.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;

        }
    };
}