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
    $scope.query = Store.load('print_config');
    $scope.qr = Store.load('qr_config');

    function success(participants) {
      participants.forEach(function(participant) {
        participant.qr = $scope.buildQrText(participant);
      });
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      Participant.pagination($scope.query, success);
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
