angular.module('aloha-editor', []).
    factory('alohaEditorFactory', [alohaEditorFactory]);

function alohaEditorFactory(editorId) {
    var _editor = null;
    var _buttons = [];

    var service = {};

    service.initEditor = function(editorId) {
        _editor = document.querySelector('#'+editorId);
        if(!_.isNull(_editor)) {
            aloha(_editor);
        }
    };

    // buttonData { id: DomElementId, type: alohaButtonType }
    // alohaButtonType is for example 'bold'
    service.addButton = function(buttonData) {
        var button = $('#'+buttonData.id);
        button.on('click', aloha.ui.command(aloha.ui.commands[buttonData.type]));
        _buttons[buttonData.id] = {
            button: button,
            id: buttonData.id,
            type: buttonData.type
        }
    };

    return service;
}