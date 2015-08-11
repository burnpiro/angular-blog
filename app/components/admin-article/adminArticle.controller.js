'use strict';

angular.module('app.admin').
    controller('AdminArticleController', ['PostService', 'alohaEditorFactory', 'post', 'categories', 'files', 'toastr', 'FileService',
        AdminArticleController]);

function AdminArticleController(PostService, alohaEditorFactory, post, categories, files, toastr, FileService) {
    var self = this;

    if(!_.isEmpty(post)) {
        self.post = post.data;
    } else {
        self.post = {
            _category: {},
            name: '',
            content: 'Write your text here',
            icon: 'fa-bicycle',
            shortText: '',
            image: '',
            author: 'Kemal Erdem'
        };
    }
    self.buttons = [
        {id: 'editorClear', type: 'unformat'},
        {id: 'editorBold', type: 'bold'},
        {id: 'editorItalic', type: 'italic'},
        {id: 'editorUl', type: 'ul'},
        {id: 'editorOl', type: 'ol'},
        {id: 'editorH2', type: 'h2'},
        {id: 'editorH3', type: 'h3'},
        {id: 'editorH4', type: 'h4'},
        {id: 'editorP', type: 'p'},
        {id: 'editorPre', type: 'pre'}
    ];
    alohaEditorFactory.initEditor('editor');
    aloha.editor.editables[1].elem.innerHTML = self.post.content;
    _.forEach(self.buttons, function(button) {
        alohaEditorFactory.addButton(button);
    });
    self.categories = categories.data;
    self.files = files.data;
    self.getImageLink = FileService.getImageLink;

    self.savePost = function() {
        if($('#alohaEditor').is(':visible')) {
            self.post.content = $('#editor.aloha-editable').html();
        }
        PostService.savePost(self.post).then(function(response) {
            toastr.success(response.message);
        });
    }
}