(function (angular) {
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
        self.iframeCtrl = {};
        self.editMode = false;

        self.availableButtons = {
            bold: {
                class: 'keTextEditor-Button--Bold',
                action: 'bold',
                label: 'Bold',
                icon: 'fa-bold',
                type: 'button'
            },
            italic: {
                class: 'keTextEditor-Button--Italic',
                action: 'italic',
                label: 'Italic',
                icon: 'fa-italic',
                type: 'button'
            },
            underline: {
                class: 'keTextEditor-Button--Underline',
                action: 'underline',
                label: 'Underline',
                icon: 'fa-underline',
                type: 'button'
            },
            strikethrough: {
                class: 'keTextEditor-Button--Strikethrough',
                action: 'strikethrough',
                label: 'Striket Through',
                icon: 'fa-strikethrough',
                type: 'button'
            },
            subscript: {
                class: 'keTextEditor-Button--Subscript',
                action: 'subscript',
                label: 'Subscript',
                icon: 'fa-subscript',
                type: 'button'
            },
            superscript: {
                class: 'keTextEditor-Button--Superscript',
                action: 'superscript',
                label: 'Superscript',
                icon: 'fa-superscript',
                type: 'button'
            },
            alignLeft: {
                class: 'keTextEditor-Button--AlignLeft',
                action: 'justifyLeft',
                label: 'Align Left',
                icon: 'fa-align-left',
                type: 'button'
            },
            alignCenter: {
                class: 'keTextEditor-Button--AlignCenter',
                action: 'justifyCenter',
                label: 'Align Center',
                icon: 'fa-align-center',
                type: 'button'
            },
            alignRight: {
                class: 'keTextEditor-Button--AlignRight',
                action: 'justifyRight',
                label: 'Align Right',
                icon: 'fa-align-right',
                type: 'button'
            },
            alignJustify: {
                class: 'keTextEditor-Button--Justify',
                action: 'justifyFull',
                label: 'Justify',
                icon: 'fa-align-justify',
                type: 'button'
            },
            listOrdered: {
                class: 'keTextEditor-Button--List',
                action: 'insertOrderedList',
                label: 'List Ordered',
                icon: 'fa-list-ol',
                type: 'button'
            },
            listUnordered: {
                class: 'keTextEditor-Button--List',
                action: 'insertUnorderedList',
                label: 'List Unordered',
                icon: 'fa-list-ul',
                type: 'button'
            },
            link: {
                class: 'keTextEditor-Button--Link',
                action: 'createLink',
                label: 'Link',
                icon: 'fa-link',
                type: 'modal',
                template: 'components/common/ke-text-editor/ke-link-modal.tpl.html'
            },
            youtube: {
                class: 'keTextEditor-Button--Youtube',
                action: 'insertHTML',
                label: 'Youtube Video',
                icon: 'fa-youtube',
                type: 'modal',
                template: 'components/common/ke-text-editor/ke-youtube-modal.tpl.html'
            },
            html: {
                class: 'keTextEditor-Button--HTML',
                action: 'insertHTML',
                label: 'Insert HTML',
                icon: 'fa-html5',
                type: 'modal',
                template: 'components/common/ke-text-editor/ke-html-modal.tpl.html'
            },
            font: {
                class: 'keTextEditor-Button--Font',
                action: 'font',
                label: 'Font',
                icon: 'fa-font',
                type: 'modal',
                template: 'components/common/ke-text-editor/ke-font-modal.tpl.html'
            },
            image: {
                class: 'keTextEditor-Button--Image',
                action: 'image',
                label: 'insertHTML',
                icon: 'fa-picture-o',
                type: 'modal',
                template: 'components/common/ke-text-editor/ke-image-modal.tpl.html'
            },
            heading: {
                class: 'keTextEditor-Button--Heading',
                action: 'formatBlock',
                label: 'Heading',
                icon: 'fa-header',
                options: [
                    {
                        action: '<h1>',
                        label: '<h1>Heading 1</h1>'
                    },
                    {
                        action: '<h2>',
                        label: '<h2>Heading 2</h2>'
                    },
                    {
                        action: '<h3>',
                        label: '<h3>Heading 3</h3>'
                    },
                    {
                        action: '<h4>',
                        label: '<h4>Heading 4</h4>'
                    },
                    {
                        action: '<h5>',
                        label: '<h5>Heading 5</h5>'
                    },
                    {
                        action: '<h6>',
                        label: '<h6>Heading 6</h6>'
                    }
                ],
                type: 'list'
            },
            reformat: {
                class: 'keTextEditor-Button--Reformat',
                action: 'removeFormat',
                label: 'Remove formatting',
                icon: 'fa-eraser',
                type: 'button'
            },
            unlink: {
                class: 'keTextEditor-Button--Unlink',
                action: 'unlink',
                label: 'Unlink',
                icon: 'fa-chain-broken',
                type: 'button'
            }
        };

        self.toolbars = [
            {
                name: 'basic',
                items: [
                    'bold', 'italic', 'underline', 'subscript', 'superscript', 'heading', 'link', 'unlink', 'reformat'
                ]
            },
            {
                name: 'advanced',
                items: [
                    'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'listOrdered', 'listUnordered', 'font', 'youtube', 'html', 'image'
                ]
            }
        ];

        self.buttonAction = function(cmd, args) {
            console.log(cmd, args);
            if(angular.isDefined(args) && angular.isDefined(args.begin)) {
                cmd = 'insertHTML';
            }
            self.executeCommand(cmd, args);
        };
    }
}
})(angular);