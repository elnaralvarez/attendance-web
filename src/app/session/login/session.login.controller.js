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
    Auth,
    LocalError,
    Counter,
    Store,
    Global,
    ModelParser
  ) {

    // $scope.item = {
    //   email: 'wolf@wolf.com',
    //   password: 'wolf'
    // };

    $scope.login = function(item) {
      Session.login(item, function(user) {
        Sess.login(user, function() {
          console.info('starts session');
          console.log(user);
          Counter.get({
            _id: user.counter
          }, function(response) {
            Store.save('counter', response);
            Global.counter = response;
            if (user.role === 'admin') {
              $state.go('attendance');
            }
          }, LocalError.request);
        });
      }, LocalError.request);
    };
  }

})();
