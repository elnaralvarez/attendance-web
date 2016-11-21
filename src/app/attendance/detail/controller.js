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
    HelperRoom,
    $window
  ) {
    var area_id = $state.params.area_id;
    var room_id = null;

    // $scope.groups = HelperRoom.group;
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
    $scope.loadImageGroup = UploadImages.loadImageGroup;

    $scope.goToBack = function() {
      $window.history.back();
    }

    Area.get({
      _id: area_id
    }, function(response) {
      $scope.area = response;
    }, LocalError.request);
  }
})();
