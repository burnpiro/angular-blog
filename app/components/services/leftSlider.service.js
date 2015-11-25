'use strict';

angular.module('app.services').
    service('LeftSliderService', ['$rootScope', '$templateCache', LeftSliderService]);

function LeftSliderService($rootScope, $templateCache) {
    var self = this;

    var currentCtrl = '',
        currentTemplate = '';

    self.toggle = function(forceValue) {
        console.log('aaaa');
        $rootScope.leftSlideOpen = angular.isDefined(forceValue) ? forceValue : !$rootScope.leftSlideOpen;
    };

    self.loadTemplate = function(template, controller, forceRecompile) {
        console.log('bbb');
        console.log($templateCache.get(template));

        self.toggle(true);
    }
}