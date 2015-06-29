'use strict';

angular.module('app.admin').
    controller('AdminArticleController', ['PostService', 'alohaEditorFactory', 'post', 'categories', AdminArticleController]);

function AdminArticleController(PostService, alohaEditorFactory, post, categories) {
    var self = this;
    self.buttons = [
        {id: 'editorClear', type: 'unformat', label: 'Clear', icon: 'fa-times'},
        {id: 'editorBold', type: 'bold', label: 'Bold', icon: 'fa-bold'},
        {id: 'editorItalic', type: 'italic', label: 'Italic', icon: 'fa-italic'},
        {id: 'editorUl', type: 'ul', label: 'Unordered list', icon: 'fa-list-ul'},
        {id: 'editorOl', type: 'ol', label: 'Ordered list', icon: 'fa-list-ol'},
        {id: 'editorH2', type: 'h2', label: 'Headline 2', text: 'H2'},
        {id: 'editorH3', type: 'h3', label: 'Headline 3', text: 'H3'},
        {id: 'editorH4', type: 'h4', label: 'Headline 4', text: 'H4'},
        {id: 'editorP', type: 'p', label: 'Paragraph', icon: 'fa-paragraph'},
        {id: 'editorPre', type: 'pre', label: 'Preformatted', icon: 'fa-code'}
    ];
    alohaEditorFactory.initEditor('editor');
    _.forEach(self.buttons, function(button) {
        alohaEditorFactory.addButton(button);
    });
    self.post = post.data;
    self.categories = categories;

    self.savePost = function() {
        PostService.savePost(self.post).then(function(response) {
            console.log(response.message);
        });
    }
}