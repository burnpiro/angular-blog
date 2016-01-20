(function (angular) {
angular.module('app.common').
    directive('keTab', ['$templateRequest', '$compile', keTabDirective]);

function keTabDirective($templateRequest, $compile) {
    return {
        scope: true,
        require: '^keTabs',
        bindToController: {
            title: '@',
            icon: '@',
            template: '@'
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

            if(angular.isDefined(scope.ctrl.template)) {
                var container = element.find('div div');
                $templateRequest(scope.ctrl.template).then(function(html) {
                    container.html('');
                    var template = angular.element(html);
                    container.append(template);
                    $compile(template)(scope);
                });
            }
        }
    };
}
})(angular);