(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('SessionLoginController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Session,
    Sess,
    LocalError,
    Global
  ) {

    // $scope.item = {
    //   email: 'wolf@wolf.com',
    //   password: 'wolf'
    // };

    $scope.login = function(item) {
      Session.login(item, function(user) {
        Sess.login(user, function() {
          console.info('starts session');
          if (user.role === 'admin') {
            $state.go('attendance');
          } else {
            throw new Error('not role asigned');
          }
        });
      }, LocalError.request);
    };
  }

})();
