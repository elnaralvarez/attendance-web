(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttTalkSelectorsController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Global,
    Talks,
    Participants,
    States,
    AttendanceAtts
  ) {

    $scope.states = null;
    $scope.participants = [];

    States.query(function(response) {
      $scope.states = response;
    });

    Participants.query({
      eventId: Global.event.id
    }, function(response) {
      $scope.participants = response;
      $scope.loadAttendanceAttendance();
    });

    $scope.loadAttendanceAttendance = function() {
      AttendanceAtts.query({room_id: $state.params.room_id}, function(response) {
        for (var i = 0; i < response.length; i++) {
          $scope.loadParticipantAttendanceAttendance(response[i]);
        };
      });
    };

    $scope.changeStatus = function(participant, state) {
      if (!participant.id) {
        throw new Error('participant in undefined');
      };
      if (!state.id) {
        throw new Error('state in undefined');
      };
      if (participant.att) {
        participant.att.stateId = state.id;
        participant.att.$update({id: participant.att.id}, function(response) {
          console.log(response);
        });
        return;
      }
      var itemParams = {
        eventId: Global.event.id,
        participantId: participant.id,
        stateId: state.id,
        room_id: $state.params.room_id
      };
      AttendanceAtts.save(itemParams, function(response) {
        $scope.loadParticipantAttendanceAttendance(response);
      });
    }

    $scope.loadParticipantAttendanceAttendance = function(att) {
      for (var i = 0; i < $scope.participants.length; i++) {
        if ($scope.participants[i].id == att.participantId) {
          $scope.participants[i].att = att;
        };
      };
    };

    $scope.getState = function(stateId) {
      var userState = null;
      $scope.states.forEach(function(state) {
        if (state.id == stateId) {
          userState = state.title;
        }
      });
      return userState;
    }

    $scope.contacts = [$scope.participants[0]];
    $scope.filterSelected = true;

    $scope.querySearch = function(query) {
      var results = query ?
          $scope.participants.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
    * Create filter function for a query string
    */
   function createFilterFor(query) {
     var lowercaseQuery = angular.lowercase(query);
     return function filterFn(item) {
       return (item.last_name.indexOf(lowercaseQuery) != -1);;
     };
   }
  };

})();
