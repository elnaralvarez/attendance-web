(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperRoom', service);

  function service($state, Room, LocalError, Global) {
    var scope = null;
    return {
      init: function(local_scope) {
        scope = local_scope;
      },
      createRoom: function() {
        var data = {
          counter_id: Global.counter._id,
          area_id: scope.area._id,
          name: 'GRUPO!!!'
        }
        if (scope.room._id) {
          data.parent = scope.room._id
        }
        Room.save(data, function(response) {
          scope.rooms.unshift(response);
        }, LocalError.request);
      },
      loadRooms: function() {
        var data = {
          counter: Global.counter._id,
          area: $state.params.area_id,
        };
        if (scope.room._id) {
          data.parent = scope.room._id;
        } else {
          data.parent = '';
        }
        Room.query(data, function(response) {
          scope.rooms = response;
        }, LocalError.request);
      },
      loadRoomById: function(room) {
        scope.room = room;
        scope.groups.push(room);
        scope.loadRooms();
        scope.loadParticipants();
        // if (!room._id) {
        //   throw new Error('rooms id is not defined');
        // }
        // var itemParams = {
        //   _id: room._id
        // };
        // Room.get(itemParams, function(response) {
        //   scope.room = response;
        //   scope.groups.push(response);
        // });
      }
    };
  }
})();
