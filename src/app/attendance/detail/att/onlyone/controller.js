(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttTalkOnlyoneController', controller);

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
    LocalError
  ) {
    var room_id = $state.params.room_id == 'default' ? '' : $state.params.room_id;
    var event_id = $state.params.event_id;
    var area_id = $state.params.area_id;

    $scope.currentState = null;
    $scope.states = [];
    $scope.participants = [];
    State.query({
      area: $state.params.area_id
    }, function(response) {
      $scope.states = response;
      $scope.changeAttendanceState(response[0]);
    });

    Event.get({
      _id: event_id
    }, function(response) {
      $scope.current_event = response;
    });

    Participant.query({
      area: area_id
    }, function(response) {
      $scope.participants = response;
    }, LocalError.request);

    $scope.changeStatus = function(participant, index) {
      if (!participant._id) {
        throw new Error('participant in undefined');
      };
      if (!$scope.currentState) {
        throw new Error('state in undefined');
      };
      var itemParams = {
        // area_id: $state.params.area_id,
        event: event_id,
        participant: participant._id,
        state: $scope.currentState._id,

      };
      itemParams.room = room_id == '' ? null : room_id;
      participant.isloading = true;
      AttendanceAtts.save(itemParams, function(response) {
        participant.isloading = false;
        participant.done = true;
        //$scope.removeParticipantById(response);
      });
    }

    $scope.removeParticipantById = function(att) {
      for (var i = 0; i < $scope.participants.length; i++) {
        if ($scope.participants[i].id == att.participantId) {
          $scope.participants.splice(i, 1);
          return;
        }
      }
    }

    $scope.changeAttendanceState = function(state) {
      $scope.states.forEach(function(item) {
        item.status = false;
      });
      $scope.currentState = state;
      $scope.currentState.status = true;
    }

    // $scope.cleanParticipants = function() {
    //   var participants = [];
    //   for (var i = 0; i < $scope.participants.length; i++) {
    //     if (!$scope.participants[i].done) {
    //       participants.push($scope.participants[i]);
    //     }
    //   }
    //   $scope.participants = participants;
    // }
  };

})();
