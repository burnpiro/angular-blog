'use strict';

angular.module('app.admin').
    controller('AdminController', ['UserService', '$state', AdminController]);

function AdminController(UserService, $state) {
    var self = this;
    self.userData = UserService.getUserData();
    self.bottomMenuOpen = false;

    self.items = [
        { name: 'Add post', icon: 'fa-plus', link: 'admin.addArticle' },
        { name: 'Posts', icon: 'fa-list-alt', link: 'admin.articles' },
        { name: 'Categories', icon: 'fa-code-fork', link: 'admin.categories'},
        { name: 'Messages', icon: 'fa-envelope', link: 'admin.messages'},
        { name: 'Users', icon: 'fa-users' },
        { name: 'Files', icon: 'fa-files-o', link: 'admin.files'},
        { name: 'Logout', icon: 'fa-sign-out', click: 'self.logout()' }
    ];

    //self.showGridBottomSheet = function($event) {
    //    $mdBottomSheet.show({
    //        templateUrl: 'components/admin/bottom-grid.html',
    //        controller: 'BottomGridController',
    //        controllerAs: 'ctrl',
    //        targetEvent: $event
    //    }).then(function(clickedItem) {
    //        if(!_.isEmpty(clickedItem.click)) {
    //            self[clickedItem.click]();
    //        }
    //        if(!_.isEmpty(clickedItem.link)) {
    //            $state.go(clickedItem.link);
    //        }
    //    });
    //};

    self.logout = function() {
        UserService.logout();
        $state.go('login');
    };

    self.callFunction = function(fun) {
        eval(fun);
    };

    self.toggleBottomMenu = function() {
        self.bottomMenuOpen = !self.bottomMenuOpen;
    }
}

AdminController.prototype.canActivate = function(UserService) {
    return UserService.isUserLoggedIn();
};