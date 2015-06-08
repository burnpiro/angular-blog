angular.module('user.home', []).
    controller('HomeController', HomeController);

function HomeController() {
    this.heading = 'Works !!!';
}