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
    // Talks,
    Auth) {
    // $scope.talk = null;


    if (!$scope.room) {
      throw new Error('it is not selected a room');
    }
    var current_id = $scope.room._id || 'default';

    console.log($scope.room);
    console.log(current_id);

    // $scope.goToTalk = function(talk) {
    //   $scope.setTalk(talk);
    //   $state.go('event.att.talk.onlyone', {room_id: talk.id});
    // }
    //
    $scope.goToAttUnique = function() {
      // $scope.setTalk(talk);
      $state.go('attendance.detail.att.unique', {room_id: current_id});
    }

    $scope.goToAttOnlyone = function() {
      // $scope.setTalk(talk);
      $state.go('attendance.detail.att.onlyone', {room_id: current_id});
    }
    $scope.goToAttSelectors = function() {
      // $scope.setTalk(talk);
      $state.go('attendance.detail.att.selectors', {room_id: current_id});
    }
    //
    // $scope.setTalk = function(talk) {
    //   if (!talk) {
    //     throw new Error('talk is not defined');
    //   }
    //   $scope.talk = talk;
    // }
    //
    // if ($state.params.room_id) {
    //   Talks.get({
    //     id: $state.params.room_id
    //   }, function(response) {
    //     $scope.setTalk(response);
    //   });
    // }
  };

})();
