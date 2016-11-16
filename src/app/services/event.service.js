(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Event', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/events';

     return $resource(url + '/:_id', {
       _id: '@_id',
       area_id: '@area_id',
       room_id: '@room_id',
       page: '@page',
       limit: '@limit'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v2/areas/:area_id/rooms/:room_id/events'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
