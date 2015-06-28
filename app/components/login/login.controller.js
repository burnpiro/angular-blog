'use strict';

angular.module('app.login')
    .controller('LoginController', ['$window', '$state', 'UserService', LoginController]);

function LoginController($window, $state, UserService) {
    var self = this;
    self.login = '';
    self.password = '';
    self.loginAction = function() {
        UserService.login(self.login, self.password)
            .then(function(response) {
                $window.localStorage.token = response.token;
                if(UserService.isUserLoggedIn() && UserService.isAdmin()) {
                    $state.go('admin');
                }
            }, function(err) {
            });
    }
}