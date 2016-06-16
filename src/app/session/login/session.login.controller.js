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
      try {
        Session.login(item, function(user) {
          Sess.login(user, function() {
            console.info('starts session');
            console.log(user);
            Counter.get({
              _id: user.store
            }, function(response) {
              Store.save('counter', response);
              Global.counter = response;
              if (user.role === 'admin') {
                $state.go('store.tomato.list');
              }
              if (user.role === 'vendor') {
                $state.go('vendor.sales');
              }
            });
          });
        }, LocalError.request);
      } catch (e) {
        LocalError.throw(e.message);
      }
    };
  }

})();
