'use strict';

angular.module('app.admin').
    controller('AdminArticleController', ['PostService', 'alohaEditorFactory', 'post', 'categories', AdminArticleController]);

function AdminArticleController(PostService, alohaEditorFactory, post, categories) {
    var self = this;
    alohaEditorFactory.initEditor('editor');
    alohaEditorFactory.addButton({id: 'editorBold', type: 'bold'});
    alohaEditorFactory.addButton({id: 'editorItalic', type: 'italic'});
    alohaEditorFactory.addButton({id: 'editorUl', type: 'ul'});
    alohaEditorFactory.addButton({id: 'editorOl', type: 'ol'});
    alohaEditorFactory.addButton({id: 'editorH2', type: 'h2'});
    alohaEditorFactory.addButton({id: 'editorH3', type: 'h3'});
    alohaEditorFactory.addButton({id: 'editorH4', type: 'h4'});
    alohaEditorFactory.addButton({id: 'editorP', type: 'p'});
    alohaEditorFactory.addButton({id: 'editorPre', type: 'pre'});
    alohaEditorFactory.addButton({id: 'editorClear', type: 'unformat'});
    self.post = post.data;
    self.categories = categories;
}