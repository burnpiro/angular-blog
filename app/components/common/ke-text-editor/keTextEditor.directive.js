angular.module('app.common').
    directive('keTextEditor', [keTextEditorDirective]);

function keTextEditorDirective() {
    return {
        scope: true,
        bindToController: {
            id: '@',
            ngModel: '=',
            options: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-text-editor/ke-text-editor.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;

        self.editMode = false;
    }
}