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
            publishedAt: new Date('now'),
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
    self.limit = 12;
    self.offset = 12;
    self.noMoreImages = false;

    self.savePost = function() {
        if($('#desktopEditor').is(':visible')) {
            self.post.content = editor.getData();
        }
        self.post.tags = _.uniq(self.post.tags);
        filterAllowedTags();
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
            self.post.tags.push(response.data._id);
        })
    };

    self.loadMoreImages = function() {
        if(self.busy || self.noMoreImages === true) {
            return false;
        }
        self.busy = true;
        FileService.getImages(self.limit, self.offset)
            .then(function(response) {
                if( response.data.length < self.limit ) {
                    self.noMoreImages = true;
                }
                self.offset += self.limit;
                _.forEach(response.data, function(image) {
                    self.files.push(image);
                });
                self.busy = false;
            }, function() {
                self.busy = false;
            })
    };

    function filterAllowedTags() {
        self.post.tags = _.filter(self.post.tags, function(tag) {
            return angular.isDefined(_.find(self.tags, { _id: tag}));
        });
    }
}
})(angular);