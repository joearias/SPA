(function(){
  'use strict'

angular.module('public')
.controller('SignupController', SignupController);

function SignupController(){
  var signupCtrl = this;
  signupCtrl.firstname = "";
  signupCtrl.lastname = "";
  signupCtrl.email = "";
  signupCtrl.phonenumber = "";
  signupCtrl.favmenuitem = "";
}


})();
