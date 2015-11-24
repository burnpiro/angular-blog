angular.module('app.common').
    directive('keTweetButton', [keTweetButtonDirective]);

function keTweetButtonDirective() {
    var allowedType = ['tweet', 'follow'];

    return {
        scope: true,
        bindToController: {
            link: '@',
            name: '@',
            type: '@' //tweet, follow
        },
        templateUrl: 'components/common/ke-tweet-button/ke-tweet-button.directive.html',
        controllerAs: 'ctrl',
        controller: function() {
            var self = this;
            if(angular.isUndefined(self.type) || allowedType.indexOf(self.type) === -1) {
                self.type = 'tweet';
            }
            if(angular.isUndefined(self.link)) {
                self.link = document.location.href;
            }
            switch (self.type) {
                case 'tweet':
                    self.url = 'https://twitter.com/intent/'+self.type+'?'+(angular.isDefined(self.name) ? 'text='+self.name : '')+'&url='+self.link;
                    break;
                case 'follow':
                    self.url = 'https://twitter.com/intent/'+self.type+'?user=kemalerdempl';
                    break;
            }
        }
    };
}