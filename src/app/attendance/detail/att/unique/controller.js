(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttUniqueController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Global,
    $state,
    States,
    Participants,
    s,
    AttendanceAtts,
    Auth,
    LocalError
  ) {
    // $scope.item = {
    //   state: "1"
    // };
    // $scope.currentparticipant = null;
    // $scope.baseUrl = Global.IMAGE_PATH;
    // $scope.states = null;
    // $scope.participants = [];
    // // all report
    // $scope.checkParticipants = [];
    // $scope.failCodes = [];
    //
    // $scope.changeUserAttendanceAttState = function(generator) {
    //   if (!generator.code) {
    //     LocalError.display("codigo en blanco");
    //     return;
    //   }
    //   var participant = $scope.searchParticipant(generator);
    //   if (participant) {
    //       $scope.changeStatus(
    //        participant,
    //        {id: generator.state},
    //        function(attState, isNew) {
    //          participant.att = attState;
    //          if (isNew) {
    //            $scope.checkParticipants.unshift(participant);
    //          } else {
    //            $scope.updateCheckParticipantList(participant);
    //          }
    //          $scope.currentparticipant = participant;
    //          $scope.removeLastItem();
    //      });
    //   } else {
    //      generator.index = $scope.count;
    //      $scope.failCodes.unshift(generator.code);
    //   }
    //   $scope.clean();
    // }
    //
    // $scope.clean = function() {
    //   $scope.item.code = "";
    // }
    //
    // // general state repeat code on selectors controller
    // States.query(function(response) {
    //   $scope.states = response;
    // });
    //
    // Participants.query({
    //   eventId: Global.event.id
    // }, function(response) {
    //   $scope.participants = response;
    //   $scope.loadAttendanceAttendance();
    // });
    //
    // $scope.loadAttendanceAttendance = function() {
    //   AttendanceAtts.query({room_id: $state.params.room_id}, function(response) {
    //     for (var i = 0; i < response.length; i++) {
    //       $scope.loadParticipantAttendanceAttendance(response[i]);
    //     };
    //   });
    // };
    //
    // $scope.loadParticipantAttendanceAttendance = function(att) {
    //   for (var i = 0; i < $scope.participants.length; i++) {
    //     if ($scope.participants[i].id == att.participantId) {
    //       $scope.participants[i].att = att;
    //     };
    //   };
    // };
    //
    // $scope.changeStatus = function(participant, state, callback) {
    //   if (!participant.id) {
    //     throw new Error('participant in undefined');
    //   };
    //   if (!state.id) {
    //     throw new Error('state in undefined');
    //   };
    //   if (participant.att) {
    //     participant.att.stateId = state.id;
    //     participant.att.$update({id: participant.att.id}, function(response) {
    //       callback(response, false);
    //     });
    //     return;
    //   }
    //   var itemParams = {
    //     eventId: Global.event.id,
    //     participantId: participant.id,
    //     stateId: state.id,
    //     room_id: $state.params.room_id
    //   };
    //   AttendanceAtts.save(itemParams, function(response) {
    //     $scope.loadParticipantAttendanceAttendance(response);
    //     callback(response, true);
    //   });
    // }
    //
    // // local functions
    // $scope.searchParticipant = function(generator) {
    //   var result = null;
    //   $scope.participants.forEach(function(item) {
    //     var code = String(generator.code);
    //     if (item.uid == generator.code) {
    //       //TODO: break the loop
    //       result = item;
    //     }
    //   });
    //   return result;
    // }
    //
    // $scope.removeLastItem = function() {
    //   if ($scope.checkParticipants.length > 15) {
    //     $scope.checkParticipants.pop();
    //   }
    // }
    //
    // $scope.updateCheckParticipantList = function(participant) {
    //   if (!participant) {
    //     throw new Error('participant is not defined');
    //   }
    //   for (var index in $scope.checkParticipants) {
    //     if ($scope.checkParticipants[index].id == participant.id) {
    //         $scope.checkParticipants.splice(index, 1);
    //         break;
    //     }
    //   }
    //   $scope.checkParticipants.unshift(participant);
    // }
  };

})();
