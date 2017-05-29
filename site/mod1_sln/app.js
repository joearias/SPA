(function() {
'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', DIController);

  DIController.$inject = ['$scope'];

  function DIController($scope)
  {
    $scope.list='';
    $scope.bonAppetitMessage='';

    $scope.countList = function()
    {
      var list = $scope.list.split(',');
    // empty item , ,  still considered an item
    if ($scope.list==''){
      $scope.bonAppetitMessage='Please enter data first'
    }
    else if (list.length == 0 ){
      $scope.bonAppetitMessage=''}
    else if (list.length <=3){
      $scope.bonAppetitMessage='Enjoy!'}
     else if (list.length > 3 ) {
      $scope.bonAppetitMessage='Too much!'
    }
    else {
      $scope.bonAppetitMessage=''
    }

  } //oef countlist
  };

})();
