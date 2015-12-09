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

        // Get iframe and put new HTML document inside
        console.log($element[0].clientWidth);
        var editor = $element[0].contentDocument;
        editor.open();
        editor.write('<!DOCTYPE html><html><head><style>img{ max-width: '+($element[0].clientWidth)+'px; }</style></head><body contenteditable="true"></body></html>');
        editor.close();
        editor.designMode = 'On';

        // get body and head into variables
        var body = angular.element($element[0].contentDocument.body);
        var head = angular.element($element[0].contentDocument.head);

        // Put ngModel into iframe body
        ctrl.render = function() {
            body[0].innerHTML = ctrl.ngModel;
        };

        ctrl.render();
    }
}