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
          first_name: 'lorem ipsum',
          last_name: 'lorem ipsum',
          image: null,
          cel: 'lorem ipsum',
          ci: 'lorem ipsum',
          address: 'lorem ipsum',
          email: 'example@wargos.com',
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
