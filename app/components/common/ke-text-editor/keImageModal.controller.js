(function (angular) {
    angular.module('app.common').
        controller('keImageModalController', ['$scope', 'FileService', Controller]);

    function Controller($scope, FileService) {
        var self = this;
        self.limit = 12;
        self.offset = 12;
        self.noMoreImages = false;
        self.selectedImage = null;
        self.images = [];
        FileService.getAllImages()
            .then(function(request) {
                self.images = request.data;
            });

        self.addImage = function(image) {
            $scope.$parent.setHTML('\'<img src="'+FileService.getImageLink(image.name, '1024')+'">\'');
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
                        self.images.push(image);
                    });
                    self.busy = false;
                }, function() {
                    self.busy = false;
                })
        }
    }
})(angular);