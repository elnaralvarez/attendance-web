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
    $scope.currentState = null;
    $scope.states = [];
    $scope.participants = [];
    State.query({
      area: $state.params.area._id
    }, function(response) {
      $scope.states = response;
      $scope.changeAttendanceAttendanceState(response[0]);
    });

    Event.get({
      id: $state.params.talkId
    }, function(response) {
      $scope.talk = response;
    });

    Participant.v4_get({
      talkId: $state.params.talkId,
      eventId: Global.event.id
    }, function(response) {
      $scope.participants = response;
    }, LocalError.request);

    $scope.changeStatus = function(participant, index) {
      if (!participant.id) {
        throw new Error('participant in undefined');
      };
      if (!$scope.currentState) {
        throw new Error('state in undefined');
      };
      var itemParams = {
        eventId: Global.event.id,
        participantId: participant.id,
        stateId: $scope.currentState.id,
        talkId: $state.params.talkId
      };
      participant.isloading = true;
      AttendanceAtts.v3_save_or_update(itemParams, function(response) {
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

    $scope.changeAttendanceAttendanceState = function(state) {
      $scope.states.forEach(function(item) {
        item.status = false;
      });
      $scope.currentState = state;
      $scope.currentState.status = true;
    }

    $scope.cleanParticipants = function() {
      var participants = [];
      for (var i = 0; i < $scope.participants.length; i++) {
        if (!$scope.participants[i].done) {
          participants.push($scope.participants[i]);
        }
      }
      $scope.participants = participants;
    }
  };

})();
