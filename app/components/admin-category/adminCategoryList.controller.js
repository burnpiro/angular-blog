'use strict';

angular.module('app.admin').
    controller('AdminCategoryListController', ['CategoryService', 'categories', 'toastr',
        AdminCategoryListController]);

function AdminCategoryListController(CategoryService, categories, toastr) {
    var self = this;
    self.categories = categories.data;
    self.saveCategory = function(category) {
        CategoryService.saveCategory(category).then(function (response) {
            toastr.success(response.message);
            if(_.isEmpty(category._id)) {
                self.categories.push(response.data);
            }
            self.closeAddNew();
        });
    };

    self.addCategory = function() {
        self.newCategory = {};
    };

    self.closeAddNew = function() {
        self.newCategory = undefined;
    }
}