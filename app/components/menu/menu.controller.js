(function (angular) {
'use strict';

angular.module('app.menu', [])
    .controller('MenuController', ['PostService', 'CategoryService', 'LeftSliderService', '$rootScope', '$state', MenuController]);

function MenuController(PostService, CategoryService, LeftSliderService, $rootScope, $state) {
    var self = this;

    self.menus = {
        categoriesOpen: false,
        searchOpen: false
        };
    self.categoriesElements = [];
    self.searchText = '';
    self.busy = false;
    self.posts = [];
    self.prevState = $rootScope.prevState;
    self.leftSlideOpen = $rootScope.leftSlideOpen;

    CategoryService.getTopCategories().then(function(response) {
        self.categoriesElements = response.data;
    });

    self.search = function(text) {
        if(text.length > 0) {
            PostService.getAllByName(text)
                .then(function(response) {
                    self.posts = response.data;
                });
        } else {
            self.posts = [];
        }
    };

    self.goToPrevState = function() {
        $state.go($rootScope.prevState.stateName, $rootScope.prevState.stateParams);
    };

    //if action is not defined will be just toggled
    self.toggleMenu = function(menuName, action) {
        if(angular.isDefined(action)) {
            self.menus[menuName] = action;
        } else {
            self.menus[menuName] = !self.menus[menuName];
        }
        LeftSliderService.toggle(false);
    };

    self.isOpen = function(menuName) {
        return self.menus[menuName];
    };

    self.openLeftSlider = LeftSliderService.toggle;
    self.loadTemplate = function(template, scope, forceRecomplile) {
        LeftSliderService.loadTemplate(template, scope, forceRecomplile);
        _.forEach(self.menus, function(menu, element) {
            self.menus[element] =  false;
        });
    };
}
})(angular);