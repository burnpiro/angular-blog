(function (angular) {
angular.module('app.common').
    directive('keFbButton', [keFbButtonDirective]);

function keFbButtonDirective() {
    var allowedLayouts = ['standard', 'bow_count', 'button_count', 'button'],
        allowedType = ['fb-like', 'fb-follow'];
    return {
        scope: true,
        bindToController: {
            colorScheme: '@',
            action: '@',
            link: '@',
            layout: '@', //standard, box_count, button_count, button
            share: '@', //bool
            showFaces: '@', //bool
            width: '@',
            type: '@' //fb-like, fb-follow
        },
        templateUrl: 'components/common/ke-fb-button/ke-fb-button.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            if(angular.isUndefined(self.layout) || allowedLayouts.indexOf(self.layout) === -1) {
                self.layout = 'button';
            }
            if(angular.isUndefined(self.colorScheme)) {
                self.colorScheme = 'light';
            }
            if(angular.isUndefined(self.width)) {
                self.width = '100%';
            }
            if(angular.isUndefined(self.type) || allowedType.indexOf(self.type) === -1) {
                self.type = 'fb-like';
            }
            if(self.type === 'fb-follow') {
                self.link = config.fbFollowLink;
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
})(angular);