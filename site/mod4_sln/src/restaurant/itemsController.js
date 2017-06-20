(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['categoryItems', 'short_name'];
function ItemsController(categoryItems, short_name) {
    var itemCtrl = this;
  itemCtrl.category = [];
  itemCtrl.category.short_name = short_name;
  itemCtrl.category.name = categoryItems.category.name;
  itemCtrl.categoryItems = categoryItems.menu_items;
  //console.log(itemCtrl.categoryItems);
  }

})();
