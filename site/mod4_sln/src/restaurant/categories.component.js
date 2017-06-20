(function(){
'use strict';

angular.module('MenuApp')
.component('categories',{
  templateUrl: 'src/restaurant/templates/categorieslist.template.html',
  bindings:{
    categoriesList: '<'
  }
}
);

})();
