'use strict';

angular.module('app.menu', [])
    .controller('MenuController', ['PostService', 'CategoryService', '$rootScope', '$state', MenuController]);

function MenuController(PostService, CategoryService, $rootScope, $state) {
    var self = this;

    self.categoriesOpen = false;
    self.searchOpen = false;
    self.categoriesElements = [];
    self.searchText = '';
    self.busy = false;
    self.posts = [];
    self.prevState = $rootScope.prevState;

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
    }
}