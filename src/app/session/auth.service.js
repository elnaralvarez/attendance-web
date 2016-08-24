(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Auth', service);

  function service($rootScope, Store) {

    var subcriptors = [];

    return {
      loadUser: function() {
        service.user = Store.load('user');
        subcriptors.forEach(function(item) {
          item(service.user);
        });
      },
      subcrive: function(func) {
        subcriptors.push(func);
        this.loadUser();
      }
    };
  }

})();
