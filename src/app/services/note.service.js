(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Note', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/notes';

     return $resource(url + '/:_id', {
       _id: '@_id',
       room_id: '@room_id',
       event_id: '@event_id',
       area_id: '@area_id',
       page: '@page',
       limit: '@limit'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v3/areas/:area_id/rooms/:room_id/events/:event_id/notes'
       },
       find_note: {
         method: 'GET',
         isArray: true,
         url: Global.PATH + '/v3/areas/:area_id/rooms/:room_id/events/:event_id/notes'
       },
       find_room_notes: {
         method: 'GET',
         isArray: true,
         url: Global.PATH + '/v3/participants/:participant_id/rooms/:room_id/notes'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
