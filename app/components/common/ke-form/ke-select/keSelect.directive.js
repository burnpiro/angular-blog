angular.module('app.common').
    directive('keSelect', [keSelectDirective]);

function keSelectDirective() {
    return {
        scope: true,
        bindToController: {
            icon: '@',
            type: '@',
            placeholder: '@',
            label: '@',
            required: '=',
            fullWidth: '@',
            ngModel: '=',
            options: '=',
            optionName: '@',
            optionValue: '@',
            onChange: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-select/ke-select.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;

        self.optionName = angular.isDefined(self.optionName) ? self.optionName : 'name';
        self.optionValue = angular.isDefined(self.optionValue) ? self.optionValue : 'value';

        self.selectedValue = '';

        self.inputChange = function(value) {
            _.find(self.options, function(option) {
                if(option[self.optionValue] === value) {
                    self.selectedValue = option[self.optionName];
                    self.ngModel = value;
                }
            })
        };

        self.filterOptions = function(option) {
            return angular.isDefined(option[self.optionName]) ?
                (option[self.optionName].search(new RegExp(self.selectedValue, "i")) > -1) : false;
        };

        _.find(self.options, function(option) {
            if(option[self.optionValue] === self.ngModel) {
                self.selectedValue = option[self.optionName];
            }
        });
    }
}