'use strict';

angular.module('app.admin').
    controller('AdminCategoryListController', ['UserService', 'CategoryService', 'categories', '$mdDialog', AdminCategoryListController]);

function AdminCategoryListController(UserService, CategoryService, categories, $mdDialog) {
    var self = this;
    self.userData = UserService.getUserData();
    self.categories = categories.data;
    var saturation = 600;
    var classes = [
        'bg-color-red-'+saturation, 'bg-color-pink-'+saturation, 'bg-color-purple-'+saturation, 'bg-color-deep-purple-'+saturation, 'bg-color-indigo-'+saturation,
        'bg-color-blue-'+saturation, 'bg-color-light-blue-'+saturation, 'bg-color-cyan-'+saturation, 'bg-color-teal-'+saturation, 'bg-color-green-'+saturation,
        'bg-color-light-green-'+saturation, 'bg-color-lime-'+saturation, 'bg-color-yellow-'+saturation, 'bg-color-amber-'+saturation, 'bg-color-orange-'+saturation,
        'bg-color-deep-orange-'+saturation, 'bg-color-brown-'+saturation
    ];

    self.doSecondaryAction = function(event) {
        console.log('aaaa');
        $mdDialog.show(
            $mdDialog.alert()
                .title('Secondary Action')
                .content('Secondary actions can be used for one click actions')
                .ariaLabel('Secondary click demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };
}