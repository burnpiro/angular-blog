'use strict';

angular.module('app.services').
    service('LeftSliderService', ['$rootScope', '$templateRequest', '$compile', LeftSliderService]);

function LeftSliderService($rootScope, $templateRequest, $compile) {
    var self = this;

    var currentTemplate = '';

    self.toggle = function(forceValue) {
        $rootScope.leftSlideOpen = angular.isDefined(forceValue) ? forceValue : !$rootScope.leftSlideOpen;
    };

    self.loadTemplate = function(template, scope, forceRecompile) {
        var leftSlider = angular.element(document.getElementById('leftSlider'));
        $templateRequest(template).then(function(html) {
            if(currentTemplate === template && !forceRecompile) {
                self.toggle();
                return false;
            }

            currentTemplate = template;
            leftSlider.html('');
            var template = angular.element(html);
            leftSlider.append(template);
            $compile(template)(angular.isDefined(scope) ? scope : $rootScope);
            self.toggle(true);
        });
    }
}