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
    Store,
    Group,
    LocalError
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    $scope.participants = [];
    $scope.search = {
      alive: false
    };

    $scope.limit = parseInt(Store.load('print_limit', true)) || 20;
    $scope.size = parseInt(Store.load('print_size', true)) || 100;
    Store.save('print_limit', $scope.limit, true);
    Store.save('print_size', $scope.size, true);

    $scope.query = {
      area_id: area_id,
      rooms: room_id,
      page: 1
    };

    function success(participants) {
      participants.forEach(function(participant) {
        participant.qr = $scope.buildQrText(participant);
      });
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.query.limit = $scope.limit;
      Participant.search($scope.query, success);
    };

    $scope.getParticipants();
    // end pagination

    $scope.next = function() {
      $scope.query.page += 1;
      $scope.getParticipants();
    };

    $scope.reset = function() {
      $scope.query.page = 1;
      $scope.getParticipants();
    };

    $scope.previous = function() {
      $scope.query.page -= 1;
      $scope.getParticipants();
    };

    $scope.updateDefaultData = function() {
      Store.save('print_limit', $scope.limit, true);
      Store.save('print_size', $scope.size, true);
    }

    $scope.print = function() {
      var url = null;
      if ($scope.query.group) {
        url = "/#/print/areas/{area_id}/rooms/{room_id}/groups/{group_id}/page/{page}"
        .replace('{area_id}', area_id)
        .replace('{room_id}', room_id)
        .replace('{group_id}', $scope.query.group)
        .replace('{page}', $scope.query.page);
      } else {
        url = "/#/print/areas/{area_id}/rooms/{room_id}/page/{page}"
        .replace('{area_id}', area_id)
        .replace('{room_id}', room_id)
        .replace('{page}', $scope.query.page);
      }
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

    // filter
    $scope.cancel_search = function() {
      delete $scope.query.last_name;
      delete $scope.query.first_name;
      $scope.search.alive = false;
      $scope.getParticipants();
    }

    $scope.search_participant = function(last_name, first_name) {
      $scope.query.last_name = last_name  == '' ? null : last_name;
      $scope.query.first_name = first_name  == '' ? null : first_name;
      $scope.getParticipants();
    };

    $scope.discartGroup = function() {
      $scope.select.group = null;
      delete $scope.query.group;
      $scope.getParticipants();
    }

    $scope.selectGroup = function() {
      var group_id = $scope.select.group;
      $scope.query.group = group_id;
      $scope.getParticipants();
    };

    // groups
    $scope.select = {
      group: null
    };

    Group.query({
      area: area_id,
      room: room_id,
    }, function(response) {
      $scope.groups = response;
    }, LocalError.request);
  }
})();
