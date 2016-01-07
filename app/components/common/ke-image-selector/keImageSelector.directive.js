(function() {
    angular.module('app.common').
        directive('keImageSelector', ['FileService', Directive]);


    function Directive(FileService) {
        return {
            scope: true,
            bindToController: {
                images: '=',
                action: '=',
                ngModel: '=',
                title: '@',
                valueName: '@'
            },
            templateUrl: 'components/common/ke-image-selector/ke-image-selector.directive.html',
            controllerAs: 'ctrl',
            controller: function () {
                var self = this;
                self.getImageLink = FileService.getImageLink;

                self.select = function(file) {
                    if(angular.isDefined(self.valueName)) {
                        self.ngModel = file[self.valueName];
                    } else {
                        self.ngModel = file;
                    }
                    if(angular.isDefined(self.action)) {
                        self.action(file);
                    }
                }

            }
        };
    }
})();