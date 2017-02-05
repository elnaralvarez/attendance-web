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
    $scope.loading = false;

    $scope.register = function(item) {
      $scope.loading = true;
      item.role = "admin";
      Users.save(item, function() {
        var sessionCredentiales = {
          email: item.email,
          password: item.password
        };
        Session.login(sessionCredentiales, function(user) {
          Sess.login(user, function() {
            console.info('starts session');
            $scope.loading = false;
            if (user.role === 'admin') {
              $state.go('attendance.home');
            } else {
              throw new Error('not role asigned');
            }
          });
        });
      }, function(err) {
        $scope.loading = false;
        LocalError.request(err);
      } );
    };
  }

})();
