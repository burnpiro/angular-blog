(function (angular) {
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
            onChange: '=',
            displayHtml: '='
        },
        controllerAs: 'ctrl',
        templateUrl: 'components/common/ke-form/ke-select/ke-select.directive.html',
        controller: ctrl
    };

    function ctrl() {
        var self = this;

        self.optionName = angular.isDefined(self.optionValue) && !angular.isDefined(self.optionName) ? 'name' : self.optionName;
        self.optionValue = angular.isDefined(self.optionName) && !angular.isDefined(self.optionValue) ?  'value' : self.optionValue;

        self.selectedValue = '';

        self.inputChange = function(value) {
            _.find(self.options, function(option) {
                if(angular.isDefined(self.optionValue)) {
                    if (option[self.optionValue] === value) {
                        self.selectedValue = option[self.optionName];
                        self.ngModel = value;
                    }
                } else {
                    if (option === value) {
                        self.selectedValue = option;
                        self.ngModel = value;
                    }
                }
            })
        };

        self.filterOptions = function(option) {
            if(angular.isDefined(self.optionName)) {
                return angular.isDefined(option[self.optionName]) ?
                    (option[self.optionName].search(new RegExp(self.selectedValue, "i")) > -1) : false;
            } else {
                return option.search(new RegExp(self.selectedValue, "i")) > -1;
            }
        };

        _.find(self.options, function(option) {
            if(angular.isDefined(self.optionValue)) {
                if (option[self.optionValue] === self.ngModel) {
                    self.selectedValue = option[self.optionName];
                }
            } else {
                if (option === self.ngModel) {
                    self.selectedValue = option;
                }
            }
        });
    }
}
})(angular);