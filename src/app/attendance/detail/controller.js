(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceDetailController', controller);

  /** @ngInject */
  function controller($scope,
    $state,
    UploadImages,
    Area,
    LocalError,
    Room,
    HelperRoom,
    $window
  ) {
    // HelperRoom.init($scope);
    var area_id = $state.params.area_id;
    var room_id = null;

    $scope.room = null;
    $scope.rooms = [];
    $scope.participants = [];
    $scope.area = {};

    $scope.setRoom = function(room) {
      $scope.room = room;
    };

    $scope.loadRoomByURLParam = function(current_room_id) {
      room_id = current_room_id;
      if (area_id === room_id) {
        $scope.groups = [];
        $scope.setRoom({
          _id: room_id,
          name: 'Default'
        });
      } else {
        HelperRoom.loadRoomById(room_id);
      }
    };

    // images
    $scope.loadImage = UploadImages.loadImage;

    $scope.goToBack = function() {
      $window.history.back();
    }

    // helper room
    // $scope.createRoom = HelperRoom.createRoom;
    // $scope.loadRooms = HelperRoom.loadRooms;
    // $scope.loadRoom = HelperRoom.loadRoom;
    // $scope.validateRoomItem = HelperRoom.validateRoomItem;

    $scope.loadRooms = function(room_id) {
      Room.query({
        parent: room_id
      }, function(response) {
        $scope.rooms = response;
      }, LocalError.request);
    },

    $scope.selectRoom = function(room) {
      $state.go('attendance.detail.room.main', {
        area_id: area_id,
        room_id: room._id
      });
      $scope.loadRooms(room._id);
    };

    $scope.select_area = function() {
      Area.get({
        _id: area_id
      }, function(response) {
        $scope.area = response;
        $scope.loadRooms(response.room);
      }, LocalError.request);
    };

    $scope.select_area();
  }
})();
