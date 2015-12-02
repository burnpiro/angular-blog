angular.module('app.common').
    directive('keTab', [keTabDirective]);

function keTabDirective() {
    return {
        scope: true,
        require: '^keTabs',
        bindToController: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        templateUrl: 'components/common/ke-tabs/ke-tab.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            self.active = false;
        },
        link: function(scope, element, attr, tabsCtrl) {
            tabsCtrl.addTab(scope);
        }
    };
}