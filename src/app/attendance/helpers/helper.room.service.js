(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperRoom', service);

  function service($state, Room, LocalError, Global) {
    var scope = null;
    // var groups = [];

    return {
      init: function(local_scope) {
        scope = local_scope;
      },
      createRoom: function() {
        var data = {
          name: 'SALA',
          parent: scope.room._id,
          area_id: scope.area._id
        }
        Room.save(data, function(response) {
          scope.rooms.unshift(response);
        }, LocalError.request);
      },
      loadRooms: function(room_id) {
        Room.query({
          parent: room_id
        }, function(response) {
          scope.rooms = response;
        }, LocalError.request);
      },
      loadRoomById: function(room_id) {
        Room.get({
          _id: room_id
        }, function(response) {
          scope.setRoom(response);
        }, LocalError.request);
      },
      // validateRoomItem: function(room) {
      //   if (!room) {
      //     groups = [];
      //     return;
      //   }
      //   var position = null;
      //   var list = groups;
      //   if (room.parent === scope.area._id) {
      //     groups = [];
      //     groups.push(room);
      //     return;
      //   }
      //   for (var i = 0; i < list.length; i++) {
      //     var current_room = list[i];
      //     if (room._id == current_room._id) {
      //       position = i;
      //     }
      //   }
      //   list = list.slice(0, position);
      //   list.push(room);
      //   groups = list;
      // },
      // setGroupItem: function(room) {
      //   groups.push(room);
      // },
      // groups: groups
    };
  }
})();
