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
    $scope.loading = false;
    // $scope.item = {
    //   email: 'wolf@wolf.com',
    //   password: 'wolf'
    // };

    $scope.login = function(item) {
      $scope.loading = true;
      Session.login(item, function(user) {
        Sess.login(user, function() {
          console.info('starts session');
          $scope.loading = false;
          $state.go('attendance.home');
        });
      }, function(err) {
        $scope.loading = false;
        LocalError.request(err);
      });
    };
  }

})();
