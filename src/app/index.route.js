(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'app/home/index.html',
      controller: 'HomeController',
      resolve: {
         simpleObj: function(Global) {
            Global.start();
         }
      }
    });
    $urlRouterProvider.otherwise('/');
  }
})();
