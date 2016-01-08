(function() {
    angular.module('app.common').
        controller('keImageModalController', ['$scope', 'FileService', Controller]);

    function Controller($scope, FileService) {
        var self = this;
        self.images = FileService.getAllImages();

        self.addImage = function(image) {
            $scope.$parent.setHTML('\'<img srt="'+image.name+'">\'');
        }
    }
})();