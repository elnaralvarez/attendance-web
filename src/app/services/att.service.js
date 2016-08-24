(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('AttendanceAtts', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/atts';

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
         url: Global.PATH + '/v1/areas/:area_id/rooms/:room_id/events/:event_id/atts'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
