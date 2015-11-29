'use strict';

angular.module('app.admin').
    controller('AdminCategoryListController', ['CategoryService', 'categories', 'toastr',
        AdminCategoryListController]);

function AdminCategoryListController(CategoryService, categories, toastr) {
    var self = this;
    self.categories = categories.data;

    self.openModal = function(event, category) {
        if(_.isNull(category)) {
            category = {};
        }
        //$mdDialog.show({
        //    controller: EditModalController,
        //    controllerAs: 'modalCtrl',
        //    templateUrl: 'components/admin-category/admin-category-edit.tmpl.html',
        //    parent: angular.element(document.body),
        //    targetEvent: event,
        //    locals: {
        //        category: category,
        //        categories: self.categories
        //    }
        //})
        //.then(function() {
        //    CategoryService.saveCategory(category).then(function (response) {
        //        toastr.success(response.message);
        //        if(_.isEmpty(category._id)) {
        //            self.categories.push(response.data);
        //        }
        //    });
        //}, function() {
        //    console.log('no');
        //});
    };
}