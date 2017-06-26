(function(){
  'use strict'

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['InfoService']
function SignupController(InfoService){
  //console.log('signupCtrl')
  var signupCtrl = this;
  signupCtrl.userInfo = InfoService.getUserInfo();

  signupCtrl.submit = function(){
    //console.log(signupCtrl)
    InfoService.validateShortName(signupCtrl.userInfo.favmenuitem);
    if (signupCtrl.StatusValid()){
        InfoService.pushUserInfo(signupCtrl.userInfo);
    }
  };

  signupCtrl.StatusValid = function(){
    //console.log(InfoService.getInfoStatus());
    return InfoService.getInfoStatus() == "Valid";
  };

  signupCtrl.StatusInvalid = function(){
    //console.log(InfoService.getInfoStatus());
    return InfoService.getInfoStatus() == "Invalid";
  };

  signupCtrl.hasData = function(){
    //console.log(InfoService.getInfoStatus());
    return InfoService.hasItemData();
  };

  signupCtrl.favoriteItemImage = function(){
    var imgPath = `${InfoService.basePath()}/images/${signupCtrl.userInfo.ItemData.short_name}.jpg`
    return imgPath;
  }

}


})();
