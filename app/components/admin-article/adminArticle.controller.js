(function (angular) {
'use strict';

angular.module('app.admin').
    controller('AdminArticleController', ['PostService', 'post', 'categories', 'files', 'tags', 'toastr', 'FileService', 'TagService', '$window',
        AdminArticleController]);

function AdminArticleController(PostService, post, categories, files, tags, toastr, FileService, TagService, $window) {
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
            display: true,
            tags: []
        };
    }
    //var editor = ckeditorEditorFactory;
    //editor.addFileRequestHeader({ name: 'Authorization', value: 'Bearer '+$window.localStorage.token});
    //editor.initEditor('editor');
    //editor.setValue(self.post.content);
    //editor.addPlugin('mathjax');
    //editor.addPlugin('codesnippet');
    //editor.addPlugin('iframedialog');
    //editor.addConfig('mathJaxLib', '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML');
    //editor.addPlugin('uploadimage');
    //editor.addConfig('uploadUrl', config.host+config.filePath);
    self.categories = categories.data;
    self.files = files.data;
    self.tags = tags.data;
    self.getImageLink = FileService.getImageLink;

    self.savePost = function() {
        if($('#desktopEditor').is(':visible')) {
            self.post.content = editor.getData();
        }
        self.post.tags = _.uniq(self.post.tags);
        PostService.savePost(self.post).then(function(response) {
            toastr.success(response.message);
            if(_.isEmpty(self.post._id)) {
                self.post._id = response.data._id;
            }
        });
    };

    self.deletePost = function() {
        PostService.deletePost(self.post._id).then(function(response) {
            toastr.success(response.message);
            self.post = {}
        });
    };

    self.addNewTag = function(tag) {
        TagService.createTag(tag).then(function(response) {
            self.tags.push(response.data);
        })
    };
}
})(angular);