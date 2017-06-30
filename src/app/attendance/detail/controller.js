(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceDetailController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    UploadImages,
    Area,
    LocalError,
    Room,
    Toast,
    $mdDialog,
    $window
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.rooms = [];
    $scope.participants = [];
    $scope.area = {};

    // images
    $scope.loadImage = UploadImages.loadImage;

    $scope.goToBack = function() {
      $window.history.back();
    }

    $scope.set_area = function(area) {
      $scope.area = area;
    }

    // helper room
    $scope.createRoom = function() {
      var data = {
        name: 'SALA',
        parent: room_id,
        area_id: area_id
      }
      Room.save(data, function(response) {
        $scope.rooms.unshift(response);
      }, LocalError.request);
    }

    $scope.loadRooms = function(room_id) {
      Room.query({
        parent: room_id
      }, function(response) {
        $scope.rooms = response;
      }, LocalError.request);
    }

    $scope.selectRoom = function(room) {
      room_id = room._id;
      $state.go('attendance.detail.room.main', {
        area_id: area_id,
        room_id: room._id
      });
      $scope.loadRooms(room._id);
    };

    $scope.select_main_area = function() {
      area_id = $scope.area._id;
      room_id = $scope.area.room;
      $state.go('attendance.detail.room.main', {
        area_id: $scope.area._id,
        room_id: $scope.area.room
      });
      $scope.loadRooms($scope.area.room);
    };

    $scope.show_confirm = function(ev) {
      var confirm = $mdDialog.confirm()
      .title('¿Esta seguro que desea eliminar esta area?')
      .textContent('Todos los elementos asociados se eliminaran (Salas, Personas, Eventos, Etc)')
      .ariaLabel('confirmation-modal')
      .targetEvent(ev)
      .ok('Aceptar')
      .cancel('Cancelar');

      $mdDialog.show(confirm)
      .then(function() {
          $scope.delete_area($scope.area);
      }, function() {
          console.log('cancel');
      });
    };

    $scope.delete_area = function(item) {
      item.$delete(function(response) {
        Toast.show('Se elimino correctamente');
        $state.go('attendance.area.list');
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };

    Area.get({
      _id: area_id
    }, function(response) {
      $scope.area = response;
    }, LocalError.request);

    if (!room_id) {
      console.log('Principal room is undefined');
      return;
    }
    $scope.loadRooms(room_id);
  }
})();
