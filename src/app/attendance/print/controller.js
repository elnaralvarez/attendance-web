(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('PrintController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Participant,
    Store
  ) {
    // pagination
    var room_id = $state.params.room_id;
    var page = $state.params.page;
    $scope.limit = parseInt(Store.load('print_limit', true)) || 20;
    $scope.size = parseInt(Store.load('print_size', true)) || 120;

    function success(participants) {
      participants.forEach(function(participant) {
        participant.qr = $scope.buildQrText(participant);
      });
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      Participant.pagination({
        page: page,
        limit: $scope.limit,
        rooms: [room_id]
      }, success);
    };

    $scope.getParticipants();
    // end pagination

    $scope.buildQrText = function(participant) {
      if (!participant) {
        throw new Error('participant is not defined');
      }
      if (!participant.uid) {
        throw new Error('participant UID is not defined');
      }
      return participant.uid;
    }

  }
})();
