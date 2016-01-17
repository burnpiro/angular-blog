angular.module('app.common').
    directive('keGrid', ['FileService', '$state', keIconButtonDirective]);

function keIconButtonDirective(FileService, $state) {
    return {
        scope: true,
        bindToController: {
            elements: '=',
            type: '@',
            link: '@',
            dataName: '@',
            dataValue: '@'
        },
        templateUrl: 'components/common/ke-grid/ke-grid.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            self.getImageLink = FileService.getImageLink;
            self.link = angular.isDefined(self.link) ? self.link : 'post';
            self.dataName = angular.isDefined(self.dataName) ? self.dataName : 'postId';
            self.dataValue = angular.isDefined(self.dataValue) ? self.dataValue : '_id';

            self.goToLink = function(dataId) {
                var data = {};
                data[self.dataName] = dataId;
                $state.go(self.link, data);
            }
        }
    };
}