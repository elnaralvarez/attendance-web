(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttArriveController', controller);

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
    LocalError,
    Reports
  ) {
    console.log('init grupos report');
    var room_id = $state.params.room_id;
    var event_id = $state.params.event_id;
    var area_id = $state.params.area_id;

    $scope.states = [];

    State.query({
      area: area_id
    }, function(response) {
      $scope.states = response;
        // Reports.att_groups_report({
        //   room_id: room_id,
        //   event_id: event_id
        // }, function(response) {
        //   $scope.draw(response);
        // });
        $scope.getParticipants();
    });


    // pagination
    $scope.count = 1000;
    $scope.query = {
      // room_id: room_id,
      event_id: event_id,
      limit: 15,
      page: 1
    };

    function success(response) {
      $scope.atts = response;
      var participants = [];
      response.forEach(function(item) {
        participants.push(item.participant);
      });
      $scope.updateParticipants(participants);
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Reports.arrive($scope.query, success).$promise;
    };
    // end pagination

    $scope.updateParticipants = function(participants) {
      for (var i = 0; i < participants.length; i++) {
        $scope.loadParticipantAttendance(participants[i]);
      };
    };

    $scope.loadParticipantAttendance = function(participant) {
      for (var i = 0; i < $scope.atts.length; i++) {
        if ($scope.atts[i].participant._id == participant._id) {
          participant.att = $scope.atts[i];
        };
      };
    };

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

    Event.get({
      _id: event_id
    }, function(response) {
      $scope.setEvent(response);
    }, LocalError.request);
  };
})();
