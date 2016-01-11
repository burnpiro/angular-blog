(function() {
    angular.module('app.common').
        controller('keImageModalController', ['$scope', 'FileService', Controller]);

    function Controller($scope, FileService) {
        var self = this;
        self.images = [];
        FileService.getAllImages()
            .then(function(request) {
                self.images = request.data;
            });

        self.addImage = function(image) {
            $scope.$parent.setHTML('\'<img src="'+FileService.getImageLink(image.name, '1024')+'">\'');
        }
    }
})();