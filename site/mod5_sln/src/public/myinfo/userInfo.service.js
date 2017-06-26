(function(){
  'use strict'

  angular.module('public')
  .service('InfoService', InfoService);

InfoService.$inject = ['$http', 'ApiPath', '$filter']
function InfoService($http, ApiPath){
  var info = this;
  var userInfo = [];
  info.status = "";
  userInfo.firstname = "";
  userInfo.lastname = "";
  userInfo.email = "";
  userInfo.phonenumber = "";
  userInfo.favmenuitem = "";
  userInfo.ItemData = "";

  info.userInfo = userInfo;

  info.validateShortName = function(shortName){
    info.status = "Validating"
    var urlString = `${ApiPath}/menu_items/${shortName.toUpperCase()}.json`
    console.log(urlString)

    var response = $http({
      method: "GET",
      url: (urlString)
      })

    return response.then(function(result){

      if(result.status == 200){
      info.status = "Valid"
      info.userInfo.ItemData = result.data;
      //console.log(info.userInfo.ItemData);
        return true;
      }
      else {
        info.status = "Invalid"
        return false;
      }
    }, function(errorResult){
      //console.log(errorResult);
      info.status = "Invalid"
    }
  )
  }

  info.hasItemData = function(){
    return info.userInfo.ItemData != "";
  };

  info.getInfoStatus = function(){
    return info.status;
  }

info.pushUserInfo =function(userInfo){
  info.userInfo = userInfo;
};

info.getUserInfo =function(userInfo){
  return info.userInfo;
};

info.basePath =function(){
  return ApiPath;
};
} //InfoService

})();
