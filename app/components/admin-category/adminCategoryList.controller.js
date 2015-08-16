'use strict';

angular.module('app.admin').
    controller('AdminCategoryListController', ['CategoryService', 'categories', '$mdDialog', 'toastr',
        AdminCategoryListController]);

function AdminCategoryListController(CategoryService, categories, $mdDialog, toastr) {
    var self = this;
    self.categories = categories.data;

    self.openModal = function(event, category) {
        if(_.isNull(category)) {
            category = {};
        }
        $mdDialog.show({
            controller: EditModalController,
            controllerAs: 'modalCtrl',
            templateUrl: 'components/admin-category/admin-category-edit.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: event,
            locals: {
                category: category,
                categories: self.categories
            }
        })
        .then(function() {
            CategoryService.saveCategory(category).then(function (response) {
                toastr.success(response.message);
                if(_.isEmpty(category._id)) {
                    self.categories.push(response.data);
                }
            });
        }, function() {
            console.log('no');
        });
    };
}

function EditModalController($mdDialog, category, categories) {
    var self = this;
    self.category = category;
    self.categories = categories;

    self.hide = function() {
        $mdDialog.hide();
    };

    self.cancel = function() {
        $mdDialog.cancel();
    };

    self.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}