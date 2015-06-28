angular.module('app.menu', []).
    directive('menuDirective', [menuDirective]);

function menuDirective() {
    return {
        templateUrl: 'components/menu/menu.directive.html',
        controllerAs: 'menuCtrl',
        controller: function() {
            this.open = false;
            var options= [];
            this.options = options;

            this.toogleMenu = function() {
                this.open = !this.open;
                this.options = options;
            };

        }
    };
}