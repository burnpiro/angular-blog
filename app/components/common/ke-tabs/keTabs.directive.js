angular.module('app.common').
    directive('keTabs', [keTabsDirective]);

function keTabsDirective() {
    return {
        scope: true,
        bindToController: {
        },
        transclude: true,
        templateUrl: 'components/common/ke-tabs/ke-tabs.directive.html',
        controllerAs: 'tabs',
        controller: function() {
            var self = this;

            self.tabs = [];

            self.addTab = function(tab) {
                self.tabs.push(tab);

                if(self.tabs.length === 1) {
                    tab.ctrl.active = true;
                }
            };

            self.showTab = function(tab) {
                _.forEach(self.tabs, function(tab) {
                    tab.ctrl.active = false;
                });
                tab.ctrl.active = true
            }
        }
    };
}