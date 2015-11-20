angular.module('app.common').
    directive('keFbButton', [keFbCommentsDirective]);

function keFbCommentsDirective() {
    return {
        scope: true,
        bindToController: {
            colorScheme: '@',
            action: '@',
            link: '@',
            layout: '@', //standard, box_count, button_count, button
            share: '@', //bool
            showFaces: '@', //bool
            width: '@'
        },
        templateUrl: 'components/common/ke-fb-button/ke-fb-button.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            if(angular.isUndefined(self.layout)) {
                self.layout = 'button';
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
            if(angular.isUndefined(self.action)) {
                self.action = 'like';
            }
            if(angular.isUndefined(self.share)) {
                self.share = false;
            }
            if(angular.isUndefined(self.showFaces)) {
                self.showFaces = false;
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