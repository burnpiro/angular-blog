'use strict';

angular.module('app.admin').
    controller('AdminArticleController', ['PostService', 'ckeditorEditorFactory', 'post', 'categories', 'files', 'toastr', 'FileService', '$window',
        AdminArticleController]);

function AdminArticleController(PostService, ckeditorEditorFactory, post, categories, files, toastr, FileService, $window) {
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
            author: 'Kemal Erdem',
            display: true
        };
    }
    var editor = ckeditorEditorFactory;
    editor.addFileRequestHeader({ name: 'Authorization', value: 'Bearer '+$window.localStorage.token});
    editor.initEditor('editor');
    editor.setValue(self.post.content);
    editor.addPlugin('mathjax');
    editor.addConfig('mathJaxLib', '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML');
    editor.addPlugin('uploadimage');
    editor.addConfig('uploadUrl', config.host+config.filePath);
    self.categories = categories.data;
    self.files = files.data;
    self.getImageLink = FileService.getImageLink;

    self.savePost = function() {
        if($('#desktopEditor').is(':visible')) {
            self.post.content = editor.getData();
        }
        PostService.savePost(self.post).then(function(response) {
            toastr.success(response.message);
        });
    }
}