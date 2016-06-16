(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('SessionRegisterController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Session,
    Users,
    LocalError,
    Sess
  ) {

    $scope.register = function(item) {
      item.role = "admin";
      Users.save(item, function() {
        var sessionCredentiales = {
          email: item.email,
          password: item.password
        };
        Session.login(sessionCredentiales, function(response) {
          Sess.login(response, function() {
            console.info('starts session');
            $state.go('store.shipping.list');
          });
        });
      }, LocalError.request);
    };
  }

})();
