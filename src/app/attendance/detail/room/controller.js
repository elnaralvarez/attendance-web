(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Room,
    LocalError,
    HelperDetailRoute,
    $mdDialog
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.room = null;
    $scope.goToRoom = HelperDetailRoute.goToRoom;

    Room.get({
      _id: room_id
    }, function(response) {
      $scope.room = response;
    }, LocalError.request);

    $scope.show_confirm_room = function(ev) {
      var confirm = $mdDialog.confirm()
      .title('¿Esta seguro que desea eliminar esta sala?')
      .textContent('Todos los elementos asociados se eliminaran (Personas, Eventos, Etc)')
      .ariaLabel('confirmation-modal')
      .targetEvent(ev)
      .ok('Aceptar')
      .cancel('Cancelar');
      $mdDialog.show(confirm)
      .then(function() {
          $scope.delete_room($scope.room);
      }, function() {
          console.log('cancel');
      });
    };

    $scope.set_room = function(room) {
        $scope.room = room;
    }

    $scope.delete_room = function(item) {
      item.$delete(function(response) {
        $scope.select_main_area();
      }, LocalError.request);
    };
  }
})();
