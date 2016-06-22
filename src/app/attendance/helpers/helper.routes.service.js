(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperDetailRoute', service);

  function service($state) {
    return {
      goToUpdate: function() {
        $state.go('attendance.detail.update');
      },
      goToParticipant: function(participant) {
        $state.go('attendance.detail.participant', {
          participant_id: participant._id
        });
      },
      goToRoom: function(room) {
        $state.go('attendance.detail.room', {
          room_id: room._id
        });
      },
      goToImport: function() {
        $state.go('attendance.detail.import');
      }
    };
  }
})();
