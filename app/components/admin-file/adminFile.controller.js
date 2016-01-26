(function (angular) {
'use strict';

angular.module('app.admin').
    controller('AdminFileController', ['FileService', 'files', 'toastr', 'FileUploader', '$window',
        AdminFileController])
    .directive('ngThumb', ['$window', ngThumbDirective]);

function AdminFileController(FileService, files, toastr, FileUploader, $window) {
    var self = this;
    self.busy = false;
    self.uploader = new FileUploader({
        url: config.host + '/files',
        headers: {'Authorization': 'Bearer '+$window.localStorage.token}
    });
    self.files = files.data;
    self.isOpen = false;
    self.demo = {
        isOpen: false,
        count: 0,
        selectedAlignment: 'md-left'
    };
    self.limit = 12;
    self.offset = 12;
    self.noMoreImages = false;

    self.uploadFile = function(file) {
        if(self.busy) {
            return false;
        }
        self.busy = true;
        FileService.saveFile(file).then(function (response) {
            self.busy = false;
            toastr.success(response.message);
            if(_.isEmpty(response.name)) {
                self.files.push(response.name);
            }
        });
    };

    // CALLBACKS
    self.uploader.onErrorItem = function(fileItem, response, status, headers) {
        toastr.error('Cannot upload file');
    };
    self.uploader.onCompleteItem = function(fileItem, response) {
        toastr.success(response.message);
        self.files.push(response.fileName);
        self.uploader.clearQueue();
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
    }
}

/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
function ngThumbDirective($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({width: width, height: height});
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}
})(angular);