(function() {
  'use strict';

  angular
    .module('wargos')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, $httpProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red');

    // Session
   $httpProvider.interceptors.push('authInterceptor');

    // Enable log
    $logProvider.debugEnabled(true);

    // Loading token
    var token = localStorage.getItem('token');
    if (token) {
      try {
        var session = JSON.parse(token).session_id;
        $httpProvider.defaults.headers.common['x-access-token'] = session;
      } catch (e) {
        console.log('Session is no longer alive');
      }

    }
  }
})();
