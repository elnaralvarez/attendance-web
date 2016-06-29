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
    HelperEvent,
    HelperDetailRoute
  ) {
    var area_id = $state.params.area_id;
    var room_id = null;

    HelperEvent.init($scope);
    $scope.room = null;
    $scope.event = null;

    // $scope.groups = HelperRoom.group;
    $scope.rooms = [];
    $scope.participants = [];
    $scope.events = [];
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

    // helper events
    $scope.loadEvents = HelperEvent.loadEvents;
    $scope.selectEvent = HelperEvent.selectEvent;

    // helper route
    $scope.goToEvent = HelperDetailRoute.goToEvent;

    $scope.loadMoreEvents = function() {
      HelperEvent.loadMoreEvents(room_id);
    };

    $scope.createEvent = function() {
      HelperEvent.createEvent(room_id);
    };

    $scope.goToAreaHome = function() {
      $state.go('attendance.detail.room', {
        area_id: $state.params.area_id,
        room_id: $state.params.area_id
      });
    }

    Area.get({
      _id: area_id
    }, function(response) {
      $scope.area = response;
    }, LocalError.request);
  }
})();
