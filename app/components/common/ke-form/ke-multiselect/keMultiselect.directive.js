(function() {
    angular.module('app.common').
        directive('keMultiselect', [Directive]);

    function Directive() {
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
                onAddNew: '=',
                displayHtml: '='
            },
            controllerAs: 'ctrl',
            templateUrl: 'components/common/ke-form/ke-multiselect/ke-multiselect.directive.html',
            controller: ctrl
        };

        function ctrl() {
            var self = this;

            self.optionName = angular.isDefined(self.optionValue) && !angular.isDefined(self.optionName) ? 'name' : self.optionName;
            self.optionValue = angular.isDefined(self.optionName) && !angular.isDefined(self.optionValue) ?  'value' : self.optionValue;

            self.selectedValues = [];

            self.addValue = function(value) {
                var selected = _.find(self.options, function(option) {
                    if(angular.isDefined(self.optionValue)) {
                        if (option[self.optionValue] === value) {
                            self.selectedValues.push(option[self.optionName]);
                            self.ngModel.push(value);
                        }
                    } else {
                        if (option === value) {
                            self.selectedValue.push(option);
                            self.ngModel.push(value);
                        }
                    }
                });
                if(angular.isUndefined(selected)) {
                    self.ngModel.push(value);
                    self.onAddNew(value);
                }
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
                        self.selectedValues.push(option[self.optionName]);
                    }
                } else {
                    if (option === self.ngModel) {
                        self.selectedValues.push(option);
                    }
                }
            });
        }
    }
})();