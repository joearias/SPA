(function ()
{
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var NarrowDown = this;
  NarrowDown.searchItem = "";
  NarrowDown.foundItems = [];
  //console.log('NarrowItDownController')

  NarrowDown.getMatchedMenuItems = function (searchTerm)
  {
    NarrowDown.foundItems = MenuSearchService.getMatchedMenuItems(searchTerm);
    console.log(  NarrowDown.foundItems );
  }

  // NarrowDown.testService = function(){
  //   console.log('testService')
  //     MenuSearchService.getMatchedMenuItems();
  // }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

    service.getMatchedMenuItems = function(searchTerm){
    console.log(searchTerm);
    var promise = service.getMenuItems();
    var foundItems = [];
    promise.then(function (response){
      //console.log(response.data.menu_items);
      for (var key in response.data.menu_items){
            if(response.data.menu_items[key].description.indexOf(searchTerm) > 0)
            {
              // console.log("name: " + response.data.menu_items[key].name);
              // console.log("short_name: " + response.data.menu_items[key].short_name);
              // console.log("description: " + response.data.menu_items[key].description);
              foundItems.push({name: response.data.menu_items[key].name })
                console.log({name: response.data.menu_items[key].name });
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
