(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperDetailRoute', service);

  function service($state) {
    return {
      goToParticipant: function(participant) {
        $state.go('attendance.detail.participant', {
          participant_id: participant._id
        });
      },
      goToRoom: function(room) {
        $state.go('attendance.detail.room.update', {
          room_id: room._id
        });
      },
      goToEvent: function(event) {
        $state.go('attendance.detail.eventupdate', {
          event_id: event._id
        });
      }

      //TODO verify
      // goToUpdate: function() {
      //   $state.go('attendance.detail.update');
      // },
    };
  }
})();
