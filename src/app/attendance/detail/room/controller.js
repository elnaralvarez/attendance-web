(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomController', controller);

  /** @ngInject */
  function controller($scope, $state, HelperDetailRoute, HelperRoom) {
    // HelperRoom.init($scope);
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.goToRoom = HelperDetailRoute.goToRoom;

    // helper room
    // $scope.createRoom = HelperRoom.createRoom;
    // $scope.loadRooms = HelperRoom.loadRooms;
    // $scope.loadRoom = HelperRoom.loadRoom;
    // $scope.validateRoomItem = HelperRoom.validateRoomItem;

    // $scope.selectRoom = function(room) {
    //   $state.go('attendance.detail.room.main', {
    //     area_id: area_id,
    //     room_id: room._id
    //   });
    // };
    //
    // $scope.init = function() {
    //   console.log('init');
    //   $scope.loadRooms(room_id);
    // }
    // $scope.init();
  }
})();
