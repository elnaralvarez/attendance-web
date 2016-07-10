(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailQrController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Participant,
    Store
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    $scope.participants = [];

    // pagination
    $scope.query = Store.load('print_config');
    if (!$scope.query) {
      $scope.query = {
        rooms: [room_id],
        limit: 20,
        page: 1
      };
    }
    $scope.query.rooms = [room_id];
    $scope.qr = Store.load('qr_config');
    if (!$scope.qr) {
      $scope.qr = {
        size: 120
      };
    }

    function success(participants) {
      participants.forEach(function(participant) {
        participant.qr = $scope.buildQrText(participant);
      });
      $scope.participants = participants;
    }

    $scope.loadParticipants = function() {
      Participant.pagination($scope.query, success);
    };

    $scope.loadParticipants();
    // end pagination

    $scope.next = function() {
      $scope.query.page += 1;
      $scope.getParticipants();
    };

    $scope.reset = function() {
      $scope.query = {
        rooms: [room_id],
        limit: 20,
        page: 1
      };
      $scope.qr = {
        size: 120
      };
      $scope.getParticipants();
    };

    $scope.previous = function() {
      $scope.query.page -= 1;
      $scope.getParticipants();
    };

    $scope.save = function() {
      Store.save('print_config', $scope.query);
      Store.save('qr_config', $scope.qr);
    }

    $scope.print = function() {
      // $state.go('print');
      $scope.print_url = "/#/print";
    }

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
