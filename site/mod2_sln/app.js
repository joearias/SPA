(function() {
'use strict'

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var ToBuy = this;

    ToBuy.items= ShoppingListCheckOffService.getItemsNotBought;
    ToBuy.buyItem = ShoppingListCheckOffService.buyItem;

    // console.log('tobuy items: ' + ToBuy.items());
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var AlreadyBought = this;
    AlreadyBought.items = ShoppingListCheckOffService.getItemsBought;
  }


  ShoppingListCheckOffService.$inject = ['$filter'];
  function ShoppingListCheckOffService($filter) {
    var service = this;

    // List of shopping items
    service.items = [ {itemName:'Cookies', status:'NotBought'},
                  {itemName:'Chocolate Chip Cookies', status:'NotBought'},
                  {itemName:'Sugar Cookies', status:'NotBought'},
                  {itemName:'Oatmeal Cookies', status:'NotBought'},
                  {itemName:'Peanut Butter Cookies', status:'NotBought'},
                  {itemName:'Ginger Cookies', status:'NotBought'},
                  {itemName:'Lemon Cookies', status:'NotBought'}
                  ];

    // console.log(service.items);

    service.buyItem = function (itemName) {
      var itm = service.items.find(i=>i.itemName === itemName);
      itm.status = 'Bought'
      };

    service.removeBoughtItem = function (itemName) {
      var itm = service.items.find(i=>i.itemName === itemName);
      itm.status = 'NotBought'
    };

    service.getItems = function(){
      return service.items;
    };

    service.getItemsBought = function () {
      // console.log('getItemsBought');
      // console.log($filter('filter')(service.getItems(), {status:'Bought'}));
      return $filter('filter')(service.getItems(), {status:'Bought'}, true);
    };

    service.getItemsNotBought = function () {
      // console.log('getItemsNotBought');
      // console.log($filter('filter')(service.getItems(), {status:'NotBought'}));
      return $filter('filter')(service.getItems(), {status:'NotBought'}, true);
    };
  }
}
)();
