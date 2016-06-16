(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    var base_url = 'app/session';

    $stateProvider.state('home.register', {
      url: 'register',
      templateUrl: base_url + '/register/index.html',
      controller: 'SessionRegisterController'
    });

    $stateProvider.state('home.login', {
      url: 'login',
      templateUrl: base_url + '/login/index.html',
      controller: 'SessionLoginController'
    });

    $stateProvider.state('home.forgot', {
      url: 'forgot',
      templateUrl: base_url + 'forgot.html',
      controller: 'SessionsController'
    });
  }

})();
