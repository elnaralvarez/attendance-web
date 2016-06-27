(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('AttendanceAtts', service);

  function service($resource, Global) {
    var url = Global.PATH + '/v1/events';

     return $resource(url + '/:_id', {
       _id: '@_id',
       counter_id: '@counter_id',
       area_id: '@area_id',
       page: '@page',
       limit: '@limit'
     }, {
       update: {
         method: 'PUT'
       },
       save: {
         method: 'POST',
         url: Global.PATH + '/v1/att/:counter_id/areas/:area_id/events'
       },
       pagination: {
         method: 'GET',
         isArray: true,
         url: url + '/page/:page/limit/:limit'
       }
     });
  }
})();
