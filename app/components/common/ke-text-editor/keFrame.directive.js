angular.module('app.common').
    directive('keFrame', [keFrameDirective]);

function keFrameDirective() {
    return {
        scope: true,
        bindToController: {
            id: '@',
            ngModel: '=',
            options: '='
        },
        controllerAs: 'ctrl',
        controller: ctrl,
        link: linkFn
    };

    function ctrl() {
        var self = this;
    }

    function linkFn(scope, $element, attrs, ctrl) {
        var editor = $element[0].contentDocument;
        editor.open();
        editor.write('<!DOCTYPE html><html><head></head><body contenteditable="true"></body></html>');
        editor.close();
        editor.designMode = 'On';
        var body = angular.element($element[0].contentDocument.body);
        var head = angular.element($element[0].contentDocument.head);

        ctrl.render = function() {
            console.log(ctrl);
            body[0].innerHTML = ctrl.ngModel;
        };

        ctrl.render();
    }
}