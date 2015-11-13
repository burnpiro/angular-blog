angular.module('app.common').
    directive('keFbComments', [keFbCommentsDirective]);

function keFbCommentsDirective() {
    return {
        scope: true,
        bindToController: {
            numPosts: '@',
            colorScheme: '@',
            width: '@',
            link: '@'
        },
        templateUrl: 'components/common/ke-fb-comments/ke-fb-comments.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            if(angular.isUndefined(self.numPosts)) {
                self.numPosts = 10;
            }
            if(angular.isUndefined(self.colorScheme)) {
                self.colorScheme = 'light';
            }
            if(angular.isUndefined(self.width)) {
                self.width = '100%';
            }
            if(angular.isUndefined(self.link)) {
                self.link = document.location.href;
            }
        },
        link: function(scope, elem, attrs) {

        }
    };
}