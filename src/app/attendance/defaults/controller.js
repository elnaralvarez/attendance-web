(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('DefaultsController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Counter,
    Global,
    Store,
    Toast,
    LocalError,
    Message
  ) {
    Counter.get({
      _id: Global.user.counter
    }, function(response) {
      $scope.attendance = response;
      $scope.item = _.clone(response);

      // session
      Store.save('counter', response);
      Global.counter = response;
    });

    $scope.cancel = function() {
      console.info('cancel');
      $scope.item = $scope.attendance;
    };

    $scope.updatedefaults = function (attendance) {
      attendance.$update(function (response) {
        $scope.attendance = response;
        Toast.show('Se actualizo correctamente');
      });
    };
  }
})();
