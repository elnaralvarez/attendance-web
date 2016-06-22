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
    LocalError
  ) {
    $scope.item = {};

    var room_id = $state.params.room_id;
    if (room_id) {
      var itemParams = {
        _id: room_id
      };
      Room.get(itemParams, function(response) {
        $scope.item = response;
      });
    }

    $scope.remove = function(item) {
      var itemParams = {
        _id: room_id
      };
      item.$remove(itemParams, function(response) {
        $state.go('attendance.detail');
        $scope.loadRooms();
      }, LocalError.request);
    }

    $scope.update = function(item) {
      var itemParams = {
        _id: room_id
      };
      item.$update(itemParams, function(response) {
        $state.go('attendance.detail');
        $scope.loadRooms();
      }, LocalError.request);
    }
  }
})();
