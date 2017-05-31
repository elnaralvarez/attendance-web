(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomMainController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    HelperDetailRoute,
    HelperParticipant,
    Participant,
    Group,
    LocalError
  ) {
    HelperParticipant.init($scope);

    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.search = {
      alive: false
    };

    // helper routes
    $scope.goToParticipant = HelperDetailRoute.goToParticipant;

    // participants
    $scope.createParticipant = HelperParticipant.createParticipant;
    $scope.loadParticipants = HelperParticipant.loadParticipants;


    $scope.loadParticipantById = function(participant) {
      console.log(participant);
    }

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

    $scope.discartGroup = function() {
      $scope.select.group = null;
      delete $scope.query.groups;
      $scope.getParticipants();
    }

    $scope.selectGroup = function() {
      var group_id = $scope.select.group;
      $scope.query.groups = group_id;
      $scope.getParticipants();
    };

    // options
    $scope.goToOptions = function() {
      $state.go('attendance.detail.room.options', {
        area_id: area_id,
        room_id: room_id
      });
    };

    // pagination
    $scope.count = 1000;
    $scope.query = {
      area_id: area_id,
      rooms: room_id,
      limit: 21,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    };

    $scope.getParticipants = function() {
      $scope.promise = Participant.search($scope.query, success).$promise;
    };

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

    $scope.init = function() {
      console.log('init');
      $scope.getParticipants();
    }
    $scope.init();
  }
})();
