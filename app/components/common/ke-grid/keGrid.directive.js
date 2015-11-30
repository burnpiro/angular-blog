angular.module('app.common').
    directive('keGrid', ['FileService', '$state', keIconButtonDirective]);

function keIconButtonDirective(FileService, $state) {
    return {
        scope: true,
        bindToController: {
            elements: '=',
            type: '@',
            link: '@'
        },
        templateUrl: 'components/common/ke-grid/ke-grid.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            self.getImageLink = FileService.getImageLink;
            self.link = angular.isDefined(self.link) ? self.link : 'post';

            self.goToLink = function(postId) {
                $state.go(self.link, {postId: postId});
            }
        }
    };
}