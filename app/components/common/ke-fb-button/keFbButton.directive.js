angular.module('app.common').
    directive('keFbButton', [keFbButtonDirective]);

function keFbButtonDirective() {
    var allowedType = ['fb-like', 'fb-follow', 'fb-share'];
    return {
        scope: true,
        bindToController: {
            link: '@',
            type: '@' //fb-like, fb-share
        },
        templateUrl: 'components/common/ke-fb-button/ke-fb-button.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            if(angular.isUndefined(self.type) || allowedType.indexOf(self.type) === -1) {
                self.type = 'fb-like';
            }
            if(angular.isUndefined(self.link)) {
                self.link = document.location.href;
            }

            switch (self.type) {
                case 'fb-like':
                    self.url = 'https://www.facebook.com/plugins/like.php?u'+self.link;
                    break;
                case 'fb-share':
                    self.url = 'https://www.facebook.com/sharer/sharer.php?href'+self.link;
                    break;
            }
        }
    };
}