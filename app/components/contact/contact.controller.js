'use strict';

angular.module('app.contact').
    controller('ContactController', ['MessageService', 'toastr', ContactController]);

function ContactController(MessageService, toastr) {
    var self = this;
    self.contactForm = {};

    self.sendMessage = function() {
        MessageService.sendMessage(self.contactForm)
            .then(function(response) {
            toastr.success(response.message);
        });;
    }
}