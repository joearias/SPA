(function(){
'use strict'

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/restaurant/templates/home.template.html'
  })

  // categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/restaurant/templates/categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // category-items page
  .state('items', {
    url: '/categories/{shortName}',
    templateUrl: 'src/restaurant/templates/categoryItems.template.html',
    controller: 'ItemsController as itemCtrl',
    resolve: {
      categoryItems: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.shortName);}],
      short_name: ['$stateParams', function($stateParams){return $stateParams.shortName;} ]
    }
  })

}

}
)();
