(function ()
{
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'fountItemsTable.html',
    scope: {
      found: '<',
      onRemove: '&',
      status: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.nothingFound = function(){
    if (list.status == "searched" && list.found.length == 0)
    {return true;}
    else{ return false;}
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var NarrowDown = this;
  NarrowDown.searchItem = "";
  NarrowDown.found = [];
  NarrowDown.status = "";

  NarrowDown.getMatchedMenuItems = function (searchTerm)
  {
    NarrowDown.found = MenuSearchService.getMatchedMenuItems(searchTerm);
    NarrowDown.status = "searched";
  };

  NarrowDown.dontWant = function(index){
    NarrowDown.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

    service.getMatchedMenuItems = function(searchTerm){
    //console.log(searchTerm);
    var promise = service.getMenuItems();
    var foundItems = [];
    promise.then(function (response){
      //console.log(response.data.menu_items);
      for (var key in response.data.menu_items){
            if(response.data.menu_items[key].description.indexOf(searchTerm) > 0)
            {
              foundItems.push({
                              name: response.data.menu_items[key].name,
                              short_name: response.data.menu_items[key].short_name,
                              description: response.data.menu_items[key].description
                                })
                //console.log({name: response.data.menu_items[key].name });
            }
      }
    })
    return foundItems;
  };

  service.getMenuItems = function(){
    //console.log('getMenuItems')
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };
}
})();
