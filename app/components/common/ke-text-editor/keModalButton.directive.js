(function (angular) {
    angular.module('app.common').
        directive('keModalButton', ['$templateRequest', '$compile', directive]);

    function directive($templateRequest, $compile) {
        return {
            scope: true,
            require: '^keTextEditor',
            bindToController: {
                options: '=',
                icon: '@',
                label: '@',
                action: '@',
                template: '@'
            },
            controllerAs: 'ctrl',
            templateUrl: 'components/common/ke-text-editor/ke-modal-button.directive.html',
            controller: ctrl,
            link: linkFn
        };

        function ctrl() {
            var self = this;
            self.isOpen = false;
            self.test = 'testVal';
        }

        function linkFn(scope, element, attr, editorCtrl) {
            scope.setValue = function(value, action) {
                editorCtrl.buttonAction(angular.isDefined(action) ? action : scope.ctrl.action, eval(value));
                scope.ctrl.isOpen = false;
            };

            scope.setHTML = function(left, right) {
                var newValue = left;
                if(!_.isEmpty(right)) {
                    newValue += scope.ctrl.selectedValue + right;
                }
                editorCtrl.buttonAction('insertHTML', {begin: eval(newValue)});
                scope.ctrl.isOpen = false;
            };

            if(angular.isDefined(scope.ctrl.template)) {
                var container = angular.element(element[0].getElementsByClassName('KeTestEditor-Button--Modal-Content'));
                $templateRequest(scope.ctrl.template).then(function(html) {
                    container.html('');
                    var template = angular.element(html);
                    container.append(template);
                    $compile(template)(scope);
                });
            }

            scope.ctrl.openModal = function() {
                scope.ctrl.selectedValue = editorCtrl.getSelection().toString();
                scope.ctrl.isOpen = true;
            };

        }
    }
})(angular);