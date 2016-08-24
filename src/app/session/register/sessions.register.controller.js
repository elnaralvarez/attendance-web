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
    Counter,
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
        });
      }, LocalError.request);
    };
  }

})();
