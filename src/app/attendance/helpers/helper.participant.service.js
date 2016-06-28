(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('HelperParticipant', service);

  function service($state, Room, LocalError, Global) {
    var scope = null;


    return {
      init: function(local_scope) {
        scope = local_scope;
      },
      // createRoom: function() {
      //   var data = {
      //     name: 'GRUPO',
      //     parent: scope.room._id,
      //     area_id: scope.area._id,
      //     counter_id: Global.counter._id
      //   }
      //   Room.save(data, function(response) {
      //     scope.rooms.unshift(response);
      //   }, LocalError.request);
      // },
      // loadRooms: function() {
      //   var data = {
      //     counter: Global.counter._id,
      //     area: $state.params.area_id
      //   };
      //   if (scope.room._id) {
      //     data.parent = scope.room._id;
      //   } else {
      //     data.parent = '';
      //   }
      //   Room.query(data, function(response) {
      //     scope.rooms = response;
      //   }, LocalError.request);
      // },
      // loadRoomById: function(room_id) {
      //
      //   Room.get({
      //     _id: room_id
      //   }, function(response) {
      //     scope.setRoom(response);
      //   }, LocalError.request);
      // },
      // loadRoomById: function(room) {
      //   scope.room = room;
      //   scope.loadRooms();
      //   scope.loadParticipants();
      //   scope.loadEvents();
      //
      //   scope.groups.push(room);
      // },
      // validateRoomItem: validateRoomItem
    };
  }
})();
