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
    //   $state.go('event.att.talk.onlyone', {talkId: talk.id});
    // }
    //
    $scope.goToAttUnique = function() {
      // $scope.setTalk(talk);
      $state.go('attendance.detail.att.unique', {talkId: current_id});
    }

    $scope.goToAttOnlyone = function() {
      // $scope.setTalk(talk);
      $state.go('attendance.detail.att.onlyone', {talkId: current_id});
    }
    $scope.goToAttSelectors = function() {
      // $scope.setTalk(talk);
      $state.go('attendance.detail.att.selectors', {talkId: current_id});
    }
    //
    // $scope.setTalk = function(talk) {
    //   if (!talk) {
    //     throw new Error('talk is not defined');
    //   }
    //   $scope.talk = talk;
    // }
    //
    // if ($state.params.talkId) {
    //   Talks.get({
    //     id: $state.params.talkId
    //   }, function(response) {
    //     $scope.setTalk(response);
    //   });
    // }
  };

})();
