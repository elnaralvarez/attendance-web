(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceDetailPeopleController', controller);

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
    Group,
    AttendanceAtts,
    LocalError
  ) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    $scope.participants = [];

    $scope.count = 1000;
    $scope.search = {
      alive: false
    };
    $scope.query = {
      area_id: area_id,
      rooms: room_id,
      limit: 30,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Participant.search($scope.query, success).$promise;
    };

    $scope.getParticipants();

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

    $scope.search_participant = function(last_name, first_name) {
      $scope.query.last_name = last_name  == '' ? null : last_name;
      $scope.query.first_name = first_name  == '' ? null : first_name;
      $scope.getParticipants();
    };

    $scope.cancel_search = function() {
      delete $scope.query.last_name;
      delete $scope.query.first_name;
      $scope.search.alive = false;
      $scope.getParticipants();
    }
  };

})();
