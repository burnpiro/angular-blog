angular.module('ng-ckeditor', []).
    factory('ckeditorEditorFactory', [ckeditorEditorFactory]);

function ckeditorEditorFactory() {
    var _editor = '';
    var _defaultConfig = {
        toolbar: [
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
            { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
            { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
            { name: 'others', items: [ '-' ] },
            { name: 'about', items: [ 'About' ] }
        ],
        toolbarGroups: [
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'others', groups: [ 'others' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'about', groups: [ 'about' ] }
        ],
        removeButtons: 'Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Templates,Print,NewPage,Save,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,PageBreak,Iframe,Maximize,ShowBlocks,Underline,Cut,Copy,Paste,PasteText,PasteFromWord,About,Styles,Format,Outdent,Indent,Strike,Anchor,Redo,Undo'
    };

    var service = {};

    service.initEditor = function(editorId) {
        CKEDITOR.replace( editorId, _defaultConfig );
        _editor = CKEDITOR.instances[editorId];
    };

    service.setValue = function(value) {
        _editor.setData(value);
    };

    service.getData = function() {
        return _editor.getData();
    };

    service.addPlugin = function(pluginName, pathToMainFolder, indexFile) {
        if (_.isUndefined(indexFile)) {
            indexFile = 'plugin.js';
        }
        if(!_.isUndefined(pathToMainFolder)) {
            CKEDITOR.plugins.addExternal( pluginName, pathToMainFolder, indexFile );
        }
        _editor.config.extraPlugins = _editor.config.extraPlugins +
        (_editor.config.extraPlugins === '' ? '' : ',') + pluginName;
    };

    service.addButton = function(button, command, label, icon) {
        _editor.ui.addButton(button,
            {
                label: label,
                command: command,
                icon: CKEDITOR.plugins.getPath(button) + icon
            });
    };

    service.addConfig = function(name, value) {
        _.set(_editor.config, name, value)
    };

    return service;
}