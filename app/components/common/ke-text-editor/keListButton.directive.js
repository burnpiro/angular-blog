(function() {
    angular.module('app.common').
        directive('keListButton', [directive]);

    function directive() {
        return {
            scope: true,
            require: '^keTextEditor',
            bindToController: {
                options: '=',
                icon: '@',
                label: '@',
                action: '@'
            },
            controllerAs: 'ctrl',
            templateUrl: 'components/common/ke-text-editor/ke-list-button.directive.html',
            controller: ctrl
        };

        function ctrl() {
            var self = this;
            self.isOpen = false;
        }
    }
})();