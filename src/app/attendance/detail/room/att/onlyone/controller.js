(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttOnlyoneController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Global,
    Store,
    Event,
    Participant,
    State,
    Auth,
    AttendanceAtts,
    Toast,
    Group,
    LocalError
  ) {
    console.log('init onlyone');
    var room_id = $state.params.room_id;
    var event_id = $state.params.event_id;
    var area_id = $state.params.area_id;

    $scope.currentState = null;
    $scope.states = [];
    $scope.atts = [];
    $scope.participants = [];

    $scope.changeStatus = function(participant, index) {
      if (!event_id) {
        Toast.show('Seleccione un evento');
        return;
      };
      if (!participant._id) {
        throw new Error('participant in undefined');
      };
      if (!$scope.currentState) {
        throw new Error('state in undefined');
      };
      participant.isloading = true;
      AttendanceAtts.save({
        area_id: area_id,
        event_id: event_id,
        room_id: room_id
      }, {
        uid: participant.uid,
        state: $scope.currentState._id
      }, function(response) {
        participant.isloading = false;
        participant.att = response;
      });
    }

    $scope.getState = function(stateId) {
      var userState = null;
      $scope.states.forEach(function(state) {
        if (state._id == stateId) {
          userState = state;
        }
      });
      if (!userState) {
        throw new Error('theis no state to this participants');
      }
      return userState;
    }

    $scope.loadAttendanceEvents = function() {
      AttendanceAtts.query({
          event: event_id
        }, function(response) {
          $scope.atts = response;
          $scope.getParticipants();
      });
    };

    $scope.remove_attendance_events = function(participant) {
      participant.att.$remove(function(response) {
          participant.att = null;
      });
    };

    $scope.updateParticipants = function(participants) {
      for (var i = 0; i < participants.length; i++) {
        $scope.loadParticipantAttendance(participants[i]);
      };
    };

    $scope.loadParticipantAttendance = function(participant) {
      for (var i = 0; i < $scope.atts.length; i++) {
        if ($scope.atts[i].participant == participant._id) {
          participant.att = $scope.atts[i];
        };
      };
    };

    // pagination
    $scope.count = 1000;
    $scope.query = {
      area_id: area_id,
      rooms: room_id,
      limit: 20,
      page: 1
    };

    function success(participants) {
      $scope.updateParticipants(participants);
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Participant.search($scope.query, success).$promise;
    };
    // end pagination

    $scope.changeAttendanceState = function(state) {
      $scope.states.forEach(function(item) {
        item.status = false;
      });
      $scope.currentState = state;
      $scope.currentState.status = true;
    };

    State.query_order_by({
      area_id: area_id
    }, function(response) {
      $scope.states = response;
      $scope.changeAttendanceState(response[0]);
    });

    if (event_id) {
      $scope.loadAttendanceEvents();
      Event.get({
        _id: event_id
      }, function(response) {
        $scope.setEvent(response);
      }, LocalError.request);
    } else {
      $scope.getParticipants();
    }

    // Toolbar search helper
    $scope.search = {
      alive: false
    };

    $scope.cancel_search = function() {
      delete $scope.query.last_name;
      delete $scope.query.first_name;
      $scope.search.alive = false;
      $scope.getParticipants();
    }

    $scope.search_participant = function(last_name, first_name) {
      $scope.query.last_name = last_name  == '' ? null : last_name;
      $scope.query.first_name = first_name  == '' ? null : first_name;
      $scope.getParticipants();
    };

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
      $scope.select.group = null;
      delete $scope.query.groups;
      $scope.getParticipants();
    }

    $scope.selectGroup = function() {
      var group_id = $scope.select.group;
      $scope.query.groups = group_id;
      $scope.getParticipants();
    };
  };
})();
