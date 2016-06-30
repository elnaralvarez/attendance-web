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
    LocalError
  ) {
    console.log('init onlyone');
    var room_id = $state.params.room_id;
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
    //
    // Event.get({
    //   _id: event_id
    // }, function(response) {
    //   $scope.current_event = response;
    // });



    // $scope.changeStatus = function(participant, index) {
    //   if (!participant._id) {
    //     throw new Error('participant in undefined');
    //   };
    //   if (!$scope.currentState) {
    //     throw new Error('state in undefined');
    //   };
    //   var itemParams = {
    //     // area_id: $state.params.area_id,
    //     event: event_id,
    //     participant: participant._id,
    //     state: $scope.currentState._id,
    //
    //   };
    //   itemParams.room = room_id == '' ? null : room_id;
    //   participant.isloading = true;
    //   AttendanceAtts.save(itemParams, function(response) {
    //     participant.isloading = false;
    //     participant.done = true;
    //     //$scope.removeParticipantById(response);
    //   });
    // }

    // $scope.removeParticipantById = function(att) {
    //   for (var i = 0; i < $scope.participants.length; i++) {
    //     if ($scope.participants[i].id == att.participantId) {
    //       $scope.participants.splice(i, 1);
    //       return;
    //     }
    //   }
    // }
    //

    // $scope.cleanParticipants = function() {
    //   var participants = [];
    //   for (var i = 0; i < $scope.participants.length; i++) {
    //     if (!$scope.participants[i].done) {
    //       participants.push($scope.participants[i]);
    //     }
    //   }
    //   $scope.participants = participants;
    // }

    Event.get({
      _id: event_id
    }, function(response) {
      $scope.setEvent(response);
    }, LocalError.request);

    // pagination
    $scope.count = 500;
    $scope.query = {
      rooms: [room_id],
      limit: 15,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Participant.pagination($scope.query, success).$promise;
    };

    $scope.getParticipants();
    // end pagination

    $scope.changeAttendanceState = function(state) {
      $scope.states.forEach(function(item) {
        item.status = false;
      });
      $scope.currentState = state;
      $scope.currentState.status = true;
    }
  };

})();
