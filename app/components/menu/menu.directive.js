(function (angular) {
angular.module('app.menu').
    directive('menuDirective', ['$timeout', 'PostService', 'CategoryService', menuDirective]);

function menuDirective() {
    return {
        scope: true,
        bindToController: {
            open: '=',
            elements: '='
        },
        templateUrl: 'components/menu/menu.directive.html',
        controllerAs: 'menuCtrl',
        controller: function($timeout, PostService, CategoryService) {
            var self = this;
            //var options= [];
            //var searchInProgress = false;
            //self.options = options;
            //
            //self.search = {
            //    isOpen: false,
            //    categories: [],
            //    posts: []
            //};
            //
            //
            //self.toggleSearch = function() {
            //    self.search.isOpen = !self.search.isOpen;
            //};
            //
            //self.search = function() {
            //    if(!searchInProgress && !_.isEmpty(self.search.text)) {
            //        searchInProgress = true;
            //        $timeout(function() {
            //            PostService.getAllByName(self.search.text)
            //                .then(function(response) {
            //                    self.search.posts = response.data;
            //                });
            //            CategoryService.getAllByName(self.search.text)
            //                .then(function(response) {
            //                    self.search.categories = response.data;
            //                });
            //            searchInProgress = false;
            //        }, 600)
            //    }
            //}
        }
    };
}
})(angular);