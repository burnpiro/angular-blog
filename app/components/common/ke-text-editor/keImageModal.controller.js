(function() {
    angular.module('app.common').
        controller('keImageModalController', ['FileService', Controller]);

    function Controller(FileService) {
        var self = this;
        self.images = FileService.getAllImages();
    }
})();