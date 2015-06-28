'use strict';

angular.module('app.admin').
    controller('AdminController', ['UserService', '$state', '$mdBottomSheet', AdminController])
    .controller('BottomGridController', ['$mdBottomSheet', BottomGridController]);

function AdminController(UserService, $state, $mdBottomSheet) {
    var self = this;
    self.userData = UserService.getUserData();
    self.showGridBottomSheet = function($event) {
        $mdBottomSheet.show({
            templateUrl: 'components/admin/bottom-grid.html',
            controller: 'BottomGridController',
            controllerAs: 'ctrl',
            targetEvent: $event
        }).then(function(clickedItem) {
            if(!_.isEmpty(clickedItem.click)) {
                self[clickedItem.click]();
            }
            if(!_.isEmpty(clickedItem.link)) {
                $state.go(clickedItem.link);
            }
        });
    };

    self.logout = function() {
        UserService.logout();
        $state.go('login');
    };
}

AdminController.prototype.canActivate = function(UserService) {
    return UserService.isUserLoggedIn();
};

function BottomGridController($mdBottomSheet) {
    var self = this;
    self.listItemClick = function($index) {
        var clickedItem = self.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
    self.items = [
        { name: 'Hangout', icon: 'fa-bed' },
        { name: 'Mail', icon: 'fa-subway' },
        { name: 'Message', icon: 'fa-shirtsinbulk' },
        { name: 'Copy', icon: 'fa-pinterest-p' },
        { name: 'Facebook', icon: 'fa-medium' },
        { name: 'Logout', icon: 'fa-sign-out', click: 'logout' }
    ];
}