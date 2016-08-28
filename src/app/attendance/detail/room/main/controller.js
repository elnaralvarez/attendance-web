(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomMainController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    HelperRoom,
    HelperDetailRoute,
    HelperParticipant,
    Participant,
    Group,
    LocalError
  ) {
    HelperRoom.init($scope);
    HelperParticipant.init($scope);

    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.loadRoomByURLParam(room_id);

    // helper routes
    $scope.goToParticipant = HelperDetailRoute.goToParticipant;
    $scope.goToRoom = HelperDetailRoute.goToRoom;

    // helper room
    $scope.createRoom = HelperRoom.createRoom;
    $scope.loadRooms = HelperRoom.loadRooms;
    $scope.loadRoom = HelperRoom.loadRoom;
    $scope.validateRoomItem = HelperRoom.validateRoomItem;

    // participants
    $scope.createParticipant = HelperParticipant.createParticipant;
    $scope.loadParticipants = HelperParticipant.loadParticipants;

    $scope.selectRoom = function(room) {
      $state.go('attendance.detail.room', {
        area_id: area_id,
        room_id: room._id
      });
      // HelperRoom.setGroupItem(room);
    };

    $scope.loadParticipantById = function(participant) {
      console.log(participant);
    }

    // groups
    $scope.select = {
      group: null
    };

    Group.query({
      area: area_id,
      room: room_id,
    }, function(response) {
      $scope.groups = response;
    }, LocalError.request);

    $scope.discartGroup = function() {
      delete $scope.query.groups;
      $scope.getParticipants();
    }

    $scope.selectGroup = function() {
      var group_id = $scope.select.group;
      $scope.query.groups = group_id;
      $scope.getParticipants();

    };
    $scope.goToGroups = function() {
      $state.go('attendance.detail.room.groups', {
        area_id: area_id,
        room_id: room_id
      });
    };

    // options
    $scope.goToOptions = function() {
      $state.go('attendance.detail.room.options', {
        area_id: area_id,
        room_id: room_id
      });
    };


    // pagination
    $scope.count = 1000;
    $scope.query = {
      rooms: room_id,
      limit: 15,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    };

    $scope.getParticipants = function() {
      $scope.promise = Participant.pagination($scope.query, success).$promise;
    };

    $scope.init = function() {
      console.log('init');
      $scope.loadRooms(room_id);
      $scope.getParticipants();
    }
    $scope.init();
  }
})();
