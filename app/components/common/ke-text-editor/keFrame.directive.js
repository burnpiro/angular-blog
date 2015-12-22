angular.module('app.common').
    directive('keFrame', ['$timeout', keFrameDirective]);

function keFrameDirective($timeout) {
    return {
        scope: true,
        require: '^keTextEditor',
        bindToController: {
            id: '@',
            ngModel: '=',
            options: '='
        },
        controllerAs: 'ctrl',
        controller: ctrl,
        link: linkFn
    };

    function ctrl($scope) {
        var self = this;

        self.sync = function() {
            $scope.$evalAsync(function($scope) {
                self.ngModel.$setViewValue(body.html());
            });
        }
    }

    function linkFn(scope, $element, attrs, ctrl) {
        ctrl.iframeCtrl = scope.ctrl;

        // Get iframe and put new HTML document inside
        var editor = $element[0].contentDocument;
        editor.open();
        editor.write('<!DOCTYPE html><html><head><style>iframe{background: repeating-linear-gradient(45deg, #689F38, #689F38 10px, #c6c6c6 10px, #c6c6c6 20px)} img{ max-width: '+($element[0].clientWidth)+'px; }</style></head><body contenteditable="true"></body></html>');
        editor.close();
        editor.designMode = 'On';

        // get body and head into variables
        var body = angular.element($element[0].contentDocument.body);
        var head = angular.element($element[0].contentDocument.head);

        // Put ngModel into iframe body
        ctrl.render = function() {
            body[0].innerHTML = ctrl.ngModel;
        };

        scope.sync = function() {
            scope.$evalAsync(function(scope) {
                ctrl.ngModel = body.html();
            });
        };

        var timeout = null;
        body.bind('click keyup change paste', function() {
            if(timeout) {
                $timeout.cancel(timeout);
            }

            timeout = $timeout(function() {
                scope.sync();
            }, 300)
        });

        ctrl.executeCommand = function(cmd, args) {
            body.focus();

            var selection = editor.getSelection();
            if(selection) {
                if(angular.isObject(args)) {
                    if(angular.isDefined(args.end)) {
                        editor.execCommand(cmd, false, args.begin+selection+args.end);
                    } else {
                        editor.execCommand(cmd, false, args.begin);
                    }
                } else {
                    editor.execCommand(cmd, false, args);
                }
            } else {
                editor.execCommand(cmd, false, args);
            }

            editor.body.focus();
            scope.sync();
        };

        ctrl.getSelection = function() {
            return editor.getSelection();
        };

        ctrl.render();
    }
}