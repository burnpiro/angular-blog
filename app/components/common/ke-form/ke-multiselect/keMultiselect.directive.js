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
                onRemove: '=',
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
                var isNewValue = true;
                _.forEach(self.options, function(option) {
                    if(angular.isDefined(self.optionValue)) {
                        if (option[self.optionValue] === value && !_.includes(self.ngModel, option[self.optionValue])) {
                            self.selectedValues.push(option[self.optionName]);
                            self.ngModel.push(option[self.optionValue]);
                            isNewValue = false;
                        }
                    } else {
                        if (option === value && !_.includes(self.ngModel, option)) {
                            self.selectedValue.push(option);
                            self.ngModel.push(option);
                            isNewValue = false;
                        }
                    }
                });
                if(isNewValue) {
                    if(!_.includes(self.ngModel, value)) {
                        self.selectedValues.push(value);
                        self.selectedValue = '';
                        self.ngModel.push(value);
                        self.onAddNew(value);
                    }
                }
            };


            self.removeValue = function(value) {
                if(angular.isDefined(self.optionValue)) {
                    _.forEach(self.options, function(option) {
                        if (option[self.optionName] === value) {
                            delete self.selectedValues[value];
                            delete self.ngModel[option[self.optionValue]];
                        }
                    });
                } else {
                    delete self.selectedValue[value];
                    delete self.ngModel[value];
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

            _.forEach(self.ngModel, function(element) {
                _.forEach(self.options, function(option) {
                    if(angular.isDefined(self.optionValue)) {
                        if (option[self.optionValue] === element) {
                            self.selectedValues.push(option[self.optionName]);
                        }
                    } else {
                        if (option === element) {
                            self.selectedValues.push(option);
                        }
                    }
                });
            });
        }
    }
})();