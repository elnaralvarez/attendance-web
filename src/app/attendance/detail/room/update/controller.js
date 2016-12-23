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

    $scope.remove = function(item) {
      var itemParams = {
        _id: room_id
      };
      item.$remove(itemParams, function(response) {
        $scope.goToBack();
      }, LocalError.request);
    }

    $scope.update = function(item) {
      item.$update(function(response) {
        $scope.goToBack();
      }, LocalError.request);
    };

    $scope.validate_if_user_is_added = function(participant) {
      var is_new = false;
      participant.rooms.forEach(function(item) {
        if (room_id == item) {
          is_new = true;
        }
      });
      return is_new;
    }

    $scope.remove_participant_to_room = function(participant) {
      var rooms = [];
      participant.rooms.forEach(function(item) {
        if (room_id != item) {
          rooms.push(item);
        }
      });
      participant.rooms = rooms;
      participant.$update(function(response) {
        Toast.show('El participante fue actualizado');
      });
    };

    $scope.validate_if_user_is_not_added = function(participant) {
        var is_new = true;
        participant.rooms.forEach(function(item) {
          if (room_id == item) {
            is_new = false;
          }
        });
        return is_new;
    }

    $scope.add_participant_to_room = function(participant, $index) {
      var is_new = true;
      participant.rooms.forEach(function(item) {
        if (room_id == item) {
          is_new = false;
        }
      });
      if (is_new) {
        participant.rooms.push(room_id);
        participant.$update(function(response) {
          Toast.show('El participante fue actualizado');
        });
      } else {
        $scope.remove_participant_to_room(participant, $index);
      }
    };

    // pagination
    $scope.count = 1000;
    $scope.search = {
      alive: false
    };
    $scope.query = {
      area_id: area_id,
      limit: 25,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    };

    $scope.getParticipants = function() {
      Participant.search($scope.query, success);
    };

    $scope.getParticipants();

    $scope.search_participant = function(last_name, first_name) {
      $scope.query.last_name = last_name  == '' ? null : last_name;
      $scope.query.first_name = first_name  == '' ? null : first_name;
      $scope.getParticipants();
    };
  }
})();
