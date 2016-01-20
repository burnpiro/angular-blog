(function (angular) {
'use strict';

angular.module('app.admin').
    controller('AdminContactController', ['MessageService', 'messages', '$mdDialog', 'toastr',
        AdminContactController]);

function AdminContactController(MessageService, messages, $mdDialog, toastr) {
    var self = this;
    self.messages = messages.data;

    self.openMessage = function(event, message) {
        $mdDialog.show(
            $mdDialog.alert()
                .title(message.title)
                .content(message.content)
                .ariaLabel('Message content')
                .ok('OK')
                .targetEvent(event)
        );
    };

    self.deleteMessage = function(event, message) {
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this message?')
            .ok('Yes!')
            .cancel('Not this time')
            .targetEvent(event);
        $mdDialog.show(confirm).then(function() {
            MessageService.deleteMessage(message._id).then(function(response) {
                toastr.success(response.message);
                _.remove(self.messages, function(element) {
                    return element._id === message._id;
                });
            });
        });
    };
}
})(angular);