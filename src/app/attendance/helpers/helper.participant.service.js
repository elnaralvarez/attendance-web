(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperParticipant', service);

  function service($state, Room, LocalError, Global, UUID, Participant) {
    var scope = null;

    return {
      init: function(local_scope) {
        scope = local_scope;
      },
      createParticipant: function() {
        var uuid = UUID.randomString(20);
        var data = {
          area_id: scope.area._id,
          uid: uuid,
          first_name: 'FIRST NAME',
          last_name: 'LAST NAME',
          image: null,
          cel: '70100000',
          ci: '10000001',
          address: 'ADDRESS',
          email: 'example@wargos.ninja',
          rooms: [scope.room._id]
        };
        Participant.save(data, function(response) {
          scope.participants.unshift(response);
        }, LocalError.request);
      },
      loadParticipants: function(room_id) {
        Participant.query({
          rooms: room_id
        }, function(response) {
          scope.participants = response;
        }, LocalError.request);
      }
    };
  }
})();
