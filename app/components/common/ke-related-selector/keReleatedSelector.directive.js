angular.module('app.common').
    directive('keRelatedSelector', ['FileService', keRelatedSelectorDirective]);

function keRelatedSelectorDirective(FileService) {
    return {
        scope: true,
        bindToController: {
            title: '@',
            options: '=',
            optionImage: '@',
            optionLink: '@',
            onPage: '@'
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-related-selector/ke-related-selector.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;
        self.selected = 0;

        self.getImageLink = FileService.getImageLink;
        self.optionImage = !angular.isDefined(self.optionImage)? 'image' : self.optionImage;
        self.optionLink = !angular.isDefined(self.optionLink) ? 'link' : self.optionLink;


    }
}