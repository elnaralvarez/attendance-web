(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailParticipantController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Participant,
    LocalError,
    UploadImages
  ) {
    UploadImages.init($scope);
    $scope.upload = UploadImages.upload;
    $scope.item = {};

    var participant_id = $state.params.participant_id;
    if (participant_id) {
      var itemParams = {
        _id: participant_id
      };
      Participant.get(itemParams, function(response) {
        $scope.item = response;
      });
    }

    $scope.remove = function(item) {
      var itemParams = {
        _id: participant_id
      };
      item.$remove(itemParams, function(response) {
        $state.go('attendance.detail');
        $scope.loadParticipants();
      }, LocalError.request);
    }

    $scope.update = function(item) {
      var itemParams = {
        _id: participant_id
      };
      item.$update(itemParams, function(response) {
        $state.go('attendance.detail');
        $scope.loadParticipants();
      }, LocalError.request);
    }
  }
})();
