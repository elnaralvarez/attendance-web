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
    AttendanceAtts,
    LocalError
  ) {
    console.log('init people');
    var area_id = $state.params.area_id;

    $scope.participants = [];

    $scope.count = 500;
    $scope.query = {
      area: area_id,
      limit: 20,
      page: 1
    };

    function success(participants) {
      $scope.participants = participants;
    }

    $scope.getParticipants = function() {
      $scope.promise = Participant.pagination($scope.query, success).$promise;
    };

    $scope.getParticipants();
  };

})();
