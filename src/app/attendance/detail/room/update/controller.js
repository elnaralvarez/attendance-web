(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomUpdateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Room,
    Toast,
    LocalError,
    Participant
  ) {
    $scope.item = {};
    var room_id = $state.params.room_id;
    var area_id = $state.params.area_id;
    $scope.new_participants = [];

    if (room_id) {
      var itemParams = {
        _id: room_id
      };
      Room.get(itemParams, function(response) {
        $scope.item = response;
      });
    }

    $scope.update = function(item) {
      item.$update(function(response) {
        $scope.set_room(response);
        $scope.selectRoom(response);
      }, LocalError.request);
    };
  }
})();
