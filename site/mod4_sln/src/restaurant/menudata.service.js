(function(){
  'use strict'

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject =['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath){
    var service = this;

    service.getAllCategories = function(){
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
      return response.then(function(result)
      {
        //console.log(result.data)
        return result.data;
      } );
    };

    service.getItemsForCategory = function(categoryShortName){
    };
  }
})();
