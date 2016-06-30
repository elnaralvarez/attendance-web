(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAttController', controller);

  /** @ngInject */
  function controller($scope,
    $state,
    Global,
    Store,
    Auth) {

    if (!$scope.room) {
      throw new Error('it is not selected a room');
    }
    var current_id = $scope.room._id;
    console.log(current_id);

    $scope.goToAttUnique = function() {
      $state.go('attendance.detail.room.att.unique');
    }

    $scope.goToAttOnlyone = function() {
      $state.go('attendance.detail.room.att.onlyone');
    }

    $scope.goToAttSelectors = function() {
      $state.go('attendance.detail.room.att.selectors');
    }
  };

})();
