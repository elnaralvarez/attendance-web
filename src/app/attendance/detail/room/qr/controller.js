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
    var room_id = $state.params.room_id;
    $scope.participants = [];

    $scope.limit = parseInt(Store.load('print_limit', true)) || 20;
    $scope.size = parseInt(Store.load('print_size', true)) || 120;
    console.log($scope.limit);
    console.log($scope.size);

    $scope.qr_query = {
      rooms: [room_id],
      page: 1
    };

    function success(participants) {
      participants.forEach(function(participant) {
        participant.qr = $scope.buildQrText(participant);
      });
      $scope.participants = participants;
    }
    console.log('restor');
    $scope.loadParticipants = function() {
      console.log('geenrat');
      $scope.qr_query.limit = $scope.limit;
      Participant.pagination($scope.qr_query, success);
    };

    $scope.loadParticipants();
    // end pagination

    $scope.next = function() {
      $scope.qr_query.page += 1;
      $scope.loadParticipants();
    };

    $scope.reset = function() {
      $scope.qr_query.page = 1;
      $scope.loadParticipants();
    };

    $scope.previous = function() {
      $scope.qr_query.page -= 1;
      $scope.loadParticipants();
    };

    $scope.updateDefaultData = function() {
      console.log('updating...');
      Store.save('print_limit', $scope.limit, true);
      Store.save('print_size', $scope.size, true);
    }

    $scope.print = function() {
      // $state.go('print');
      var url = "/#/print/room/{room_id}/page/{page}"
        .replace('{room_id}', room_id).replace('{page}', $scope.qr_query.page);
      $scope.print_url = url;
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
