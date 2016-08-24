(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('authInterceptor', service);

  function service($rootScope, $q, $location) {
    return {
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }
})();
