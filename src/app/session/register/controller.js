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
    Sess,
    Store,
    Global
  ) {

    $scope.register = function(item) {
      item.role = "admin";
      Users.save(item, function() {
        var sessionCredentiales = {
          email: item.email,
          password: item.password
        };
        Session.login(sessionCredentiales, function(user) {
          Sess.login(user, function() {
            console.info('starts session');
            if (user.role === 'admin') {
              $state.go('attendance.home');
            } else {
              throw new Error('not role asigned');
            }
          });
        });
      }, LocalError.request);
    };
  }

})();
