angular.module('app.menu', []).
    directive('menuDirective', ['CategoryService', menuDirective]);

function menuDirective() {
    return {
        templateUrl: 'components/menu/menu.html',
        controllerAs: 'menuCtrl',
        controller: function(CategoryService) {
            this.open = false;
            var options= [];
            this.options = options;

            this.toogleMenu = function() {
                this.open = !this.open;
                this.options = options;
            };

            CategoryService.getTopCategories().then(function(response) {
                options = response.data;
            });
        }
    };
}