(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('DetailStudioCreateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Toast,
    Studio,
    Global
  ) {
    $scope.item = {};

    $scope.template = {
      item: 'app/attendance/detail/studio/item.html'
    };

    $scope.create = function(item) {
      item.attendance = Global.counter._id;
      Toast.show('Cargando...');
      Studio.save(item, function(response) {
        Toast.show('Se creo un nuevo provedor');
        $state.go('attendance.detail.studio.list');
      });
    };
  }
})();
