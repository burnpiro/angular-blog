angular.module('app.common').
    directive('keGrid', ['FileService', keIconButtonDirective]);

function keIconButtonDirective(FileService) {
    return {
        scope: true,
        bindToController: {
            elements: '=',
            type: '@'
        },
        templateUrl: 'components/common/ke-grid/ke-grid.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            self.getImageLink = FileService.getImageLink;
        }
    };
}