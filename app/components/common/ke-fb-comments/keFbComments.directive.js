(function (angular) {
angular.module('app.common').
    directive('keFbComments', [keFbCommentsDirective]);

function keFbCommentsDirective() {
    return {
        scope: true,
        bindToController: {
            numPosts: '@',
            colorScheme: '@',
            orderBy: '@', // 'social', 'reverse_time', 'time'
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
            if(angular.isUndefined(self.orderBy)) {
                self.orderBy = 'time';
            }
        },
        link: function(scope, elem) {
            scope.$watch('link', function () {
                if(angular.isDefined(FB)) {
                    FB.XFBML.parse(elem[0]);
                }
            });
        }
    };
}
})(angular);