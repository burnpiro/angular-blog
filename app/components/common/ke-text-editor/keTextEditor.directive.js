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
        controllerAs: 'keTextEditor',
        templateUrl: 'components/common/ke-text-editor/ke-text-editor.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;
        self.iframeCtrl = undefined;
        self.editMode = false;

        self.availableButtons = {
            bold: {
                class: 'keTextEditor-Button--Bold',
                //acition: self.iframeCtrl.executeCommand('bold'),
                label: 'Bold',
                icon: 'fa-bold'
            },
            italic: {
                class: 'keTextEditor-Button--Italic',
                //acition: self.iframeCtrl.executeCommand('italic'),
                label: 'Italic',
                icon: 'fa-italic'
            },
            underline: {
                class: 'keTextEditor-Button--Underline',
                //acition: self.iframeCtrl.executeCommand('Underline'),
                label: 'Underline',
                icon: 'fa-underline'
            },
            subscript: {
                class: 'keTextEditor-Button--Subscript',
                //acition: self.iframeCtrl.executeCommand('Subscript'),
                label: 'Subscript',
                icon: 'fa-subscript'
            },
            superscript: {
                class: 'keTextEditor-Button--Superscript',
                //acition: self.iframeCtrl.executeCommand('Superscript'),
                label: 'Superscript',
                icon: 'fa-superscript'
            }
        };

        self.toolbars = [
            {
                name: 'basic',
                items: [
                    'bold', 'italic', 'underline', 'subscript', 'superscript'
                ]
            }
        ]
    }
}