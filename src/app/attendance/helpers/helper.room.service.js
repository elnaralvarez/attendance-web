(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperRoom', service);

  function service($state, Room, LocalError, Global) {
    var scope = null;

    var validateRoomItem = function(room) {
      if (!room._id) {
        scope.groups = [];
        return;
      }
      var position = null;
      var list = scope.groups;
      if (room.parent == undefined) {
        scope.groups = [];
        scope.groups.push(room);
        return;
      }
      for (var i = 0; i < list.length; i++) {
        var current_room = list[i];
        if (room._id == current_room._id) {
          position = i;
        }
      }
      list = list.slice(0, position);
      list.push(room);
      scope.groups = list;
    }
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
        scope.loadRooms();
        scope.loadParticipants();

        scope.groups.push(room);
      },
      validateRoomItem: validateRoomItem
    };
  }
})();
