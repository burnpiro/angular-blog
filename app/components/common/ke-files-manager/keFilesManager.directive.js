angular.module('app.common').
    directive('keFilesManager', ['FileService', keFbCommentsDirective]);

function keFbCommentsDirective(FileService) {
    return {
        scope: true,
        bindToController: {
            files: '=',
            clickAction: '=',
            deleteAction: '='
        },
        templateUrl: 'components/common/ke-files-manager/ke-files-manager.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;

            self.getImageLink = FileService.getImageLink;
        }
    };
}